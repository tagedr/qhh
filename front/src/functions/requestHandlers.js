import { logRotate } from "./utils";
import { TR } from "./tr";
import dotenv from 'dotenv';
dotenv.config();

const urlPrefix = process.env.REACT_APP_SERVER_URL_PREFIX;

let lastFindInput = {};
let selectedTags = [];

const defaultHeaders = {
  credentials: 'include'
}

export function loginUser(login, pass) {
  return fetch(urlPrefix + "/login", Object.assign({}, defaultHeaders,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(login && pass ? { login: login, pass: pass } : {})
    }))
    .then(resp => {
      if (resp.ok !== true) return [];
      return resp.json();
    })
    .then(json => {
      this.setState({
        credentials: json[0] && json[0].login && json[0].pass ? json[0] : [],
        lastMessageId:
          json[0] && json[0].lastMessageId ? json[0].lastMessageId : 0
      });
      this.setState({
        logMessages: logRotate(this.state.logMessages,
          json[0] && json[0].login && json[0].pass ? TR.SYS_LOGIN_OK : TR.SYS_LOGIN_FAILED)
      });
      this.parseUrlRequest();
      this.getInterviews();
      this.getUsers();
      this.getTags();
      return json;
    }).catch(err => {
      this.setState({
        logMessages: logRotate(this.state.logMessages, TR.SYS_LOGIN_FAILED)
      });
    });
};

export function logoutUser() {
  return fetch(urlPrefix + "/logout", Object.assign({}, defaultHeaders,
    {
      method: "GET",
    }))
    .then(response => {

      if (response.ok !== true) {
        return false;
      }
      this.setState({
        credentials: []
      });
      this.setState({
        logMessages: logRotate(this.state.logMessages, TR.SYS_LOGOUT_OK)
      });
      return true;
    })
}

export function getCandidates(input = lastFindInput) {
  lastFindInput = input;
  let query = "";
  if (input.tags && input.tags.length > 0) {
    selectedTags = input.tags;
    query = urlPrefix + "/tags/" + JSON.stringify(selectedTags) + "/candidates";
  } else if (input.candidates && input.candidates.length > 0) {
    query = urlPrefix + "/candidates/" + JSON.stringify(input.candidates[0].id);
  } else return;

  return fetch(query, Object.assign({}, defaultHeaders,
    {
      method: "GET"
    }))
    .then(response => {
      if (response.ok !== true) {
        // if (response.status === 401)
        //     alert("Login. Enter login and password, then press \"Login\" button.");
        return [];
      }
      return response.json();
    })
    .then(json => {
      if (json) {
        this.setState({
          foundedCandidates: json
        });
      }
      if(json.length === 0) {
        this.setState({
          logMessages: logRotate(this.state.logMessages, TR.SYS_GET_RESPONSE_IS_EMPTY)
        });
      } else {
        this.setState({
          logMessages: logRotate(this.state.logMessages, TR.SYS_GET_RESPONSE_IS_SHOWN)
        });
      }
      //else alert("Request for selected tags empty or with errors. Check your connection.")
    })
  // .catch(alert);
}

export function heartbeatAndFetchMsg() {
  if (!this.state.credentials.login) {
    return false;
  }
  return fetch(urlPrefix + "/messages/" + this.state.lastMessageId + "/system/fromId",
    Object.assign({}, defaultHeaders,
      {
        method: "GET"
      }
    ))
    .then(response => {
      if (response.ok !== true) {
        this.setState({
          credentials: []
        });
        return [];
      }
      return response.json();
    })
    .then(json => {
      if (!json) return false;

      this.setState({
        unreadMessages: json
      });
    })
    .catch(err => {
      this.setState({
        logMessages: logRotate(this.state.logMessages, TR.SYS_HEARTBEAT_FAILED)
      });
    });
}

export function getCandidateDetails(id) {
  return fetch(urlPrefix + "/candidates/" + id, Object.assign({}, defaultHeaders,
    {
      method: "GET",
    }))
    .then(resp1 => {
      if (resp1.ok !== true) {
        // if (resp1.status === 401)
        //     alert("Login. Enter login and password, then press \"Login\" button.");
        return [];
      }
      return resp1.json();
    })
    .then(json => {
      if (!json || json.length === 0) return false;

      this.setState({
        selectedCandidateInfo: json[0]
      });

      if (json[0].attaches[0] && json[0].attaches[0].fileName) {
        this.getCandidates();
        fetch(
          (process.env.UPLOAD_URL_PREFIX
            ? process.env.UPLOAD_URL_PREFIX
            : urlPrefix) +
          "/uploads/" +
          json[0].attaches[0].fileName, Object.assign({}, defaultHeaders,
            {
              method: "GET",
            })
        )
          .then(resp2 => {
            if (resp2.ok !== true) {
              console.error("Error in getting attachment!");
              return false;
            }
            this.getMessages(id);
            let logMsg = {
              BODY: TR.SYS_GET_CANDIDATE_DETAILS_OK.BODY.replace(/__1__/gi, id),
              LEVEL: TR.SYS_GET_CANDIDATE_DETAILS_OK.LEVEL
            };
            this.setState({
              logMessages: logRotate(this.state.logMessages, logMsg)
            });
            this.getTags();
            this.getDuplicates(id);
            return true;
          })
          .catch(err => {
            let logMsg = {
              BODY: TR.SYS_GET_CANDIDATE_DETAILS_FAILED.BODY.replace(/__1__/gi, id),
              LEVEL: TR.SYS_GET_CANDIDATE_DETAILS_FAILED.LEVEL
            };
            this.setState({
              logMessages: logRotate(this.state.logMessages, logMsg)
            });
          });
      }
    });
}

export function postAttaches(refreshCallback) {
  if (this.state.attaches.length === 0 || selectedTags.length === 0) {
    alert("Selected tags must not be empty!");
    return;
  }
console.log(selectedTags);
  let fd = new FormData();
  this.state.attaches.forEach(att => {
    fd.append("upl", att);
  });

  this.setState({
    attaches: []
  });

  return fetch(urlPrefix + "/candidateFromAttache", Object.assign({}, defaultHeaders,
    {
      method: "POST",
      body: fd
    }))
    .then(response => {
      if (response.ok !== true) return [];
      return response.json();
    })
    .then(json => {
      if (!json) return [];

      let t = [];
      let newAdded = false;
      selectedTags.forEach(tag => {
        t = t.concat([{ name: tag, candidates: json }]);
        newAdded = tag === "new" ? true : newAdded;
      });
      if (!newAdded) t = t.concat([{ name: "new", candidates: json }]);
      //json[0].id .. name
      json.forEach(c => {
        updateTags(t, c);
      });
      if (refreshCallback) {
        sleep(2000).then(() => {
          refreshCallback("ctrl+enter");
        });
      }
      this.setState({
        logMessages: logRotate(this.state.logMessages, TR.SYS_POST_ATTACHES_OK)
      });
    })
    .catch(err => {
      this.setState({
        logMessages: logRotate(
          this.state.logMessages,
          TR.SYS_POST_ATTACHES_FAILED
        )
      });
    });
}

export function getMessages(candidateId) {
  if (!candidateId || candidateId.length === 0) return;
  return fetch(urlPrefix + "/messages/" + candidateId, Object.assign({}, defaultHeaders,
    {
      method: "GET",
      cache: "default"
    }))
    .then(response => {
      if (response.ok !== true) {
        if (response.status === 401) {
          this.setState({
            logMessages: logRotate(
              this.state.logMessages,
              TR.ENTER_LOGIN_AND_PASS
            )
          });
        }

        return [];
      }
      return response.json();
    })
    .then(json => {
      if (!json) return false;
      this.setState({
        candidateMessages: json
      });
      return json;
    });
}

export function getTags() {
  return fetch(urlPrefix + "/tags", Object.assign({}, defaultHeaders,
    {
      method: "GET",
      cache: "default"
    }))
    .then(response => {
      if (response.ok !== true) return [];

      return response.json();
    })
    .then(json => {
      if (!json) return false;

      this.setState({
        tags: json
      });
      return json;
    });
}

export function getDuplicates(candidateId) {
  return fetch(urlPrefix + "/candidates/"+candidateId+"/duplicates", Object.assign({}, defaultHeaders,
    {
      method: "GET",
      cache: "default"
    }))
    .then(response => {
      if (response.ok !== true) return [];

      return response.json();
    })
    .then(json => {
      if (!json) return [];
      console.log(json);
      this.setState({
        duplicates: json
      });
      return json;
    });
}

export function getUsers() {
  return fetch(urlPrefix + "/users", Object.assign({}, defaultHeaders,
    {
      method: "GET",
      cache: "default"
    }))
    .then(response => {
      if (response.ok !== true) return [];

      return response.json();
    })
    .then(json => {
      if (!json) return false;

      this.setState({
        users: json
      });
      return json;
    });
}

export function getInterviews() {
  return fetch(urlPrefix + "/interviews", Object.assign({}, defaultHeaders,
    {
      method: "GET",
      cache: "default"
    }))
    .then(response => {
      if (response.ok !== true) return [];

      return response.json();
    })
    .then(json => {
      if (!json) return false;
      this.setState({
        interviews: json
      });
      return json;
    });
}

export function updateTags(tags, candidateInfo, reloadDetailsCallback) {
  if (!candidateInfo || !tags || tags.length === 0) return;
  tags.forEach((t,i)=>{
    if (!t.name || t.name === 0) 
      tags.splice(i,1);
  });

  let ret = { id: candidateInfo.id, name: candidateInfo.name, tags: tags };
  return fetch(urlPrefix + "/tags/update", Object.assign({}, defaultHeaders,
    {
      method: "POST",
      body: JSON.stringify(ret),
      headers: {
        "Content-Type": "application/json"
      }
    })).then(response => {
      if (reloadDetailsCallback) reloadDetailsCallback(candidateInfo.id);
      return response.ok;
    });
}

export function updateCandidateName(name, candidateInfo, reloadDetailsCallback) {

  let ret = { id: candidateInfo.id, name: name };
  return fetch(urlPrefix + "/candidate/update", Object.assign({}, defaultHeaders,
    {
      method: "POST",
      body: JSON.stringify(ret),
      headers: {
        "Content-Type": "application/json"
      }
    })).then(response => {
      if (reloadDetailsCallback) reloadDetailsCallback(candidateInfo.id);
      return response.ok;
    });
}

export function postMessage(messageBody, candidateId, userId) {
  if (!userId || !candidateId || !messageBody) return;

  let msg = {
    body: messageBody,
    type: 0,
    users: [{ id: userId }],
    candidates: [{ id: candidateId }]
  };

  return fetch(urlPrefix + "/messages/", Object.assign({}, defaultHeaders,
    {
      method: "POST",
      body: JSON.stringify(msg),
      headers: {
        "Content-Type": "application/json"
      }
    }))
    .then(response => {
      return response.ok;
    })
    .catch(err => {
      this.setState({
        logMessages: logRotate(
          this.state.logMessages,
          TR.SYS_POST_MESSAGE_FAILED
        )
      });
    });
}



export function parseUrlRequest() {
  const path = window.location.pathname;
  const search = window.location.search;
  if (path === "/candidate") {
    if (search.includes("?id=")) {
      const openId = parseInt(search.split("=")[1]);
      this.getCandidates({
        candidates: [
          {
            id: openId
          }
        ]
      });
      this.openCandidateDetails(openId);
      sleep(1000).then(() => {
        this.setState({
          query: openId
        });
      });
    }
  } else if (path === "/tag") {
    if (search.includes("?name=")) {
      const q = [search.split("=")[1]];
      this.getCandidates({
        tags: q
      });
      sleep(1000).then(() => {
        this.setState({
          query: q[0]
        });
      });
    }
  }
}

export function postInterview(interview) {
  if (!interview || !interview.candidates || !interview.begin) return;

  return fetch(urlPrefix + "/interview/", Object.assign({}, defaultHeaders,
    {
      method: "POST",
      cache: "default",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(interview)
    })).then(response => {
      return response.ok;
    });
}

export function delInterview(id) {
  if (!id) return;

  return fetch(urlPrefix + "/interview/" + id + "/delete", Object.assign({}, defaultHeaders, {
    method: "POST",
  })).then(response => {
    return response.ok;
  });
}

export function readAllMessages(id) {
  if (!id) return;

  return fetch(urlPrefix + "/messages/readTo/" + id, Object.assign({}, defaultHeaders,
    {
      method: "POST",
    })).then(response => {
      this.setState({
        lastMessageId: id
      });
      return response.ok;
    });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
