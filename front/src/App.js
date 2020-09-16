import React, { PureComponent } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

import { Col, Container, Row, Button } from "reactstrap";

import TopPanel from "./components/TopPanel";
import BottomPanel from "./components/BottomPanel";
import CandidateDetails from "./components/CandidateDetails";
import AttacheViewer from "./components/AttacheViewer";
import CandidatesList from "./components/CandidatesList";
import Modals from "./components/modals/Modals";
import Dropzone from "react-dropzone";
import HotKeys from "react-hot-keys";
import { TR } from "./functions/tr";
import {
  getCandidates,
  getCandidateDetails,
  postAttaches,
  getMessages,
  updateTags,
  postMessage,
  heartbeatAndFetchMsg,
  parseUrlRequest,
  loginUser,
  logoutUser,
  getTags,
  getInterviews,
  getUsers,
  readAllMessages
} from "./functions/requestHandlers";

class App extends PureComponent {
  constructor(props) {
    super(props)
    
    this.state = {
      isModalOpen: false,
      foundedCandidates: [],
      selectedCandidateInfo: null,
      attaches: [],
      shortcutInfo: { counter: 0, keyPressed: "" },
      unreadMessages: [],
      credentials: [],
      tags: [],
      interviews: [],
      candidateMessages: [],
      logMessages: [],
      users: [],
      query: ""
    };
    this.selectedTags = [];

    this.toggleModal = (title, body, style) => {
      if (!title || !body || typeof title !== "string") {
        this.setState({
          isModalOpen: false,
          modalTitle: "",
          modalBody: "",
          modalStyle: {}
        });
      } else {
        this.setState({
          isModalOpen: !this.state.isModalOpen,
          modalTitle: title ? title : null,
          modalBody: body ? body : null,
          modalStyle: style ? style : {}
        });
      }
    };

    this.getCandidates = getCandidates.bind(this);
    this.openCandidateDetails = getCandidateDetails.bind(this);
    this.clickSendNewCandidates = postAttaches.bind(this);
    this.getMessages = getMessages.bind(this);
    this.postTags = updateTags.bind(this);
    this.postMessage = postMessage.bind(this);

    this.loginUser = loginUser.bind(this);
    this.loginUser();
    
    this.logoutUser = logoutUser.bind(this);
    // this.logoutUser();

    this.parseUrlRequest = parseUrlRequest.bind(this);
    this.parseUrlRequest();

    this.getTags = getTags.bind(this);
    // this.getTags();

    this.getUsers = getUsers.bind(this);
    // this.getUsers();

    this.getInterviews = getInterviews.bind(this);
    // this.getInterviews();

    this.readAllMessages = readAllMessages.bind(this);

    this.fetchSystemMessages = heartbeatAndFetchMsg.bind(this);
    window.setInterval(this.fetchSystemMessages, process.env.FETCH_TIMEOUT);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.files !== this.state.files ||
      prevState.shortcutInfo !== this.state.shortcutInfo ||
      prevState.attaches !== this.state.attaches
    ) {
      this.setState({
        attaches: this.state.attaches
      });
    }
    if (prevState.query !== this.state.query) {
      this.setState({
        query: this.state.query
      });
    }
//    console.log("APP_DIDUPDATE");
  }

  render() {
    // console.log("RENDER_APP");
    const st = this.state;
    const attLngth = st.attaches.length;
    const selCandInfo = st.selectedCandidateInfo;

    return (
      <HotKeys
        keyName={"ctrl+enter, up, down, alt+shift+t, alt+t, ctrl+space"}
        onKeyDown={this.onKeyDown.bind(this)}
      >
        <Container className="containerStyle">
          <Row>
            <Col className="dashedStyle">
            <TopPanel
                shortcutInfo={st.shortcutInfo}
                getCandidates={this.getCandidates}
                unreadMessages={st.unreadMessages}
                credentials={st.credentials}
                loginUser={this.loginUser}
                logoutUser={this.logoutUser}
                readAllMessages={this.readAllMessages}
                toggleModal={this.toggleModal}
                query={st.query}
              />
            </Col>
          </Row>

          <Row style={{ minHeight: "880px", height: "100%" }}>
            <Col
              md="2"
              className="dashedStyle"
              style={{ overflowY: "scroll", height: "100%" }}
            >
              <Row className="dashedStyle">
                <Dropzone
                  style={{ width: "100%" }}
                  onDrop={this.onDrop.bind(this)}
                >
                  <p style={{ textAlign: "center" }}>
                    {TR.DROP_NEW_CANDIDATES_HERE}
                  </p>
                </Dropzone>

                <Button
                  style={{ textAlign: "center", width: "100%" }}
                  color={attLngth > 0 ? "secondary" : "link"}
                  disabled={attLngth === 0}
                  onClick={() => {
                    this.clickSendNewCandidates(this.onKeyDown.bind(this));
                  }}
                >
                  {attLngth === 0
                    ? TR.NOTHING_TO_UPLOAD
                    : TR.UPLOAD + attLngth + " " + TR._NEW_CANDIDATES}
                </Button>
              </Row>

              <Row>
                <CandidatesList
                  shortcutInfo={st.shortcutInfo}
                  foundedCandidates={st.foundedCandidates}
                  openCandidateDetails={this.openCandidateDetails}
                />
              </Row>
            </Col>

            <Col md="7" style={{ margin: 0, padding: 0 }}>
              <AttacheViewer
                fileName={
                  selCandInfo &&
                  selCandInfo.attaches &&
                  selCandInfo.attaches.length > 0
                    ? selCandInfo.attaches[0].fileName
                    : null
                }
              />
            </Col>

            <Col md="3" className="dashedStyle" style={{ padding: "0" }}>
              <CandidateDetails
                postTags={this.postTags}
                candidateInfo={selCandInfo}
                messages={st.candidateMessages}
                postMessage={this.postMessage}
                toggleModal={this.toggleModal}
                shortcutInfo={st.shortcutInfo}
                openCandidateDetails={this.openCandidateDetails}
                credentials={st.credentials}
                tagsInfo={st.tags ? st.tags : []}
                users={this.state.users}
              />
            </Col>
          </Row>

          <Row className="dashedStyle">
            <BottomPanel
              toggleModal={this.toggleModal}
              interviews={st.interviews}
              tags={st.tags}
              getTags={this.getTags}
              getInterviews={this.getInterviews}
              shortcutInfo={st.shortcutInfo}
              logMessages={st.logMessages}
            />
          </Row>

          <Modals
            isOpen={st.isModalOpen}
            title={st.modalTitle}
            body={st.modalBody}
            toggle={this.toggleModal}
            style={st.modalStyle}
          />
        </Container>
      </HotKeys>
    );
  }

  onDrop(files) {
    this.setState({
      attaches: files
    });
  }

  onKeyDown(keyNm) {
    this.setState({
      shortcutInfo: {
        counter: this.state.shortcutInfo.counter+1,
        keyPressed: keyNm
      }
    });
  }
}

export default App;
