import { transaction, raw } from "objection";
import Interview from "../models/Interview";
import Candidate from "../models/Candidate";
import Tag from "../models/Tag";
import User from "../models/User";
import Message from "../models/Message";

export default router => {
  router.get("/", async (req, res) => {
    res.sendStatus(200);
  })
  // ---------------------------------------------------------------------------------------------
  router.get("/candidates", async (req, res) => {

    const ret = await Candidate.query()
      .distinct()
      .skipUndefined()
      .orderBy("id", "asc");

    res.send(ret);
  });

  // ---------------------------------------------------------------------------------------------
  router.get("/tags", async (req, res) => {
    let ret = await Tag.query()
      .distinct()
      .skipUndefined()
      .orderBy("priority");

    async function proc(arr) {
      // let r = [];
      for (const tag of arr) {
        const t = await Tag.query().findById(tag.id);

        if (!t) {
          throw createStatusCodeError(504);
        }

        const r = await t.$relatedQuery("candidates").skipUndefined();

        tag.size = r.length;
      }
    }

    await proc(ret);
    res.send(ret);
  });

  // ---------------------------------------------------------------------------------------------
  router.get("/candidates/:id", async (req, res) => {
    const ret = await Candidate.query()
      .where("candidates.id", req.params.id)
      .eager({
        attaches: true,
        tags: true,
        interviews: true
      })
      .distinct()
      .skipUndefined()
      .orderBy("id");

    res.send(ret);
  });

  // ---------------------------------------------------------------------------------------------
  router.get("/tags/:tags/candidates", async (req, res) => {

    const tags = JSON.parse(req.params.tags);
    console.log(tags);
    if (!tags || tags.length === 0) throw createStatusCodeError(404);

    const tagsInDB = await Tag.query()
      .whereIn("name", tags)
      .distinct()
      .orderBy("id", "desc");

    if (tags.length !== tagsInDB.length) {
      res.sendStatus(200);
      return;
    }

    const tagsRes = await Tag.query()
      .eager({
        candidates: true
      })
      .whereIn("tags.name", tags)
      .orderBy("id", "desc");

    let longestCanList = [];
    let longestTagId = "";
    tagsRes.forEach((t, i) => {
      if (longestCanList.length < t.candidates.length) {
        longestCanList = t.candidates;
        longestTagId = t.id;
      }
    });

    let afterJoin = [];
    let needJoin = false;
    if (tags.length > 1) {
      needJoin = true;
      afterJoin = longestCanList.filter(lCand => {
        let cnt = 1;
        tagsRes.forEach(t => {
          if (t.id !== longestTagId)
            t.candidates.forEach(rCand => {
              if (lCand.id === rCand.id) {
                // console.error(lCand.id + "===" + rCand.id);
                cnt++;
              }
            });
        });
        return cnt === tags.length;
      });
    }

    const candidateListToSend = needJoin ? afterJoin : longestCanList;

    let ids = candidateListToSend.map(c => {
      return c.id;
    });

    let q = await Candidate.query()
      .findByIds(ids)
      .eager({
        attaches: true,
        tags: true,
        interviews: true
      });

    res.send(q);
  });

  // ---------------------------------------------------------------------------------------------
  router.get("/logout", async (req, res) => {
    // if (!req.session || !req.session.user) {
    //   res.sendStatus(401);
    //   return;
    // }
    console.log(req.session.credentials)
    req.session.destroy();
    res.sendStatus(200);
  });

  // ---------------------------------------------------------------------------------------------
  router.get("/users", async (req, res) => {

    const ret = await User.query()
      .skipUndefined()
      .orderBy("id");

    ret.forEach((r, i) => {
      delete ret[i].pass;
    });
    res.send(ret);
  });

  // ---------------------------------------------------------------------------------------------
  router.get("/interviews", async (req, res) => {

    const ret = await Interview.query()
      .eager({
        welcomeUser: true,
        interviewer: true,
        candidates: true
      })
      .orderBy("id");

    ret.forEach((r, i) => {
      // console.error(r);
      ret[i].welcomeUser =
        r.welcomeUser.length > 0 ? r.welcomeUser.filter(e => e.id > 0) : "";
      ret[i].candidate =
        r.candidates.length > 0 ? r.candidates.filter(e => e.id > 0) : {};
      ret[i].interviewer =
        r.interviewer.length > 0 ? r.interviewer.filter(e => e.id > 0) : "";
      delete ret[i].candidates;
    });

    res.send(ret);
  });

  // ---------------------------------------------------------------------------------------------
  router.get("/users/:id/interviews", async (req, res) => {

    const user = await User.query().findById(req.params.id);

    if (!user) {
      throw createStatusCodeError(404);
    }

    const ret = await user.$relatedQuery("interviews").skipUndefined();

    res.send(ret);
  });

  // ---------------------------------------------------------------------------------------------
  router.get("/messages/:id", async (req, res) => {

    const ret = await Message.query()
      .joinRelation("candidates")
      .eager({
        users: true,
        candidates: true
      })
      .where("candidates.id", req.params.id)
      .distinct()
      .skipUndefined()
      .orderBy("created");

    console.log(ret);

    res.send(ret);
  });

  // ---------------------------------------------------------------------------------------------
  router.get("/messages/:fromDate/system", async (req, res) => {

    let fromDate = req.params.fromDate;

    /*
        0 - User chat messages,
        1 - new candidate,
        2 - candidate tags changes,
        3 - new tags,
        4 - new interview,
        5 - interview changes
        6 - delete interview
         */
    const ret = await Message.query().where(
      raw("`created` > FROM_UNIXTIME( '" + fromDate + "' )")
    );
    // .andWhere('type', '!=',0);

    res.send(ret);
  });

  // ---------------------------------------------------------------------------------------------
  router.get("/messages/:lastId/system/fromId", async (req, res) => {

    let lastMsgId = req.params.lastId;

    const ret = await Message.query()
      .eager({
        users: true,
        candidates: true
      })
      .where("id", ">", lastMsgId)
      .skipUndefined();
    // .andWhere('isSystem', 1);
    const login = req.session.credentials.login;
    res.send(ret);
  });

  router.get("/userInfo", async (req, res) => {
    const login = req.session.credentials.login;
    if (!login) {
      res.sendStatus(401);
      return;
    }
    let lastMsgId = req.params.lastId;

    const ret = await User.query().where("id", login.userInfo[0].id);
    delete ret.pass;
    // .andWhere('isSystem', 1);

    res.send(ret);
  });
};

function createStatusCodeError(statusCode) {
  return Object.assign(new Error(), {
    statusCode
  });
}
