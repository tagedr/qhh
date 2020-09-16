import React, { Component } from "react";
import {
  Button,
  Col,
  Container,
  Input,
  InputGroup,
  Row
} from "reactstrap";
import moment from "moment/moment";
import { TR } from "../functions/tr";

class TopPanel extends Component {
  constructor(props) {
    super(props);

    this.toggleSplit = this.toggleSplit.bind(this);
    this.state = {
      splitButtonOpen: false,
      authDisabled:
        this.props.credentials.login && this.props.credentials.login.length > 0
          ? true
          : false
    };

    this.state = {
      login: this.props.credentials.login,
      password: "",
      queryStr: this.props.query ? this.props.query : ""
    };

    this.lasMessageId = 0;
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.unreadMessages &&
      prevProps.unreadMessages.length !== this.props.unreadMessages.length
    ) {
      return true;
    }
    if (
      prevProps.shortcutInfo !== this.props.shortcutInfo &&
      this.props.shortcutInfo.keyPressed === "ctrl+enter"
    ) {
      this.clickFind();
      return true;
    }

    if (
      prevProps.credentials.login !== this.props.credentials.login &&
      this.props.credentials.login &&
      this.props.credentials.login.length > 0
    ) {
      this.setState({
        authDisabled: true
      });
      return true;
    }
    if (prevProps.query !== this.props.query) {
      this.setState({
        queryStr: this.props.query
      });
    }
  }

  dateFromHandler(e) {
    console.log(e.target.value);
  }

  dateToHandler(e) {
    console.log(e.target.value);
  }

  render() {
    const msgCounter =
      this.props.unreadMessages && this.props.unreadMessages.length > 0
        ? "(" + this.props.unreadMessages.length + ")"
        : "";
    return (
      <Container style={{ paddingRight: "0", paddingLeft: "0" }}>
        <Row style={{ width: "100%", height: "100%" }}>
          <Col sm={{ size: 5, order: 0, offset: 0 }}>
            <InputGroup
              onChange={e =>
                this.setState({
                  queryStr: `${e.target.value}`
                })
              }
            >
              <Input
                autoComplete="on"
                type="search"
                placeholder={TR.ENTER_TAGS}
                defaultValue={this.state.queryStr}
              />

              {/* <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.splitButtonOpen}
                                                      toggle={this.toggleSplit}> */}
              <Button outline color="primary" onClick={() => this.clickFind()}>
                {TR.FIND_UPDATED}
              </Button>
              {/* <DropdownToggle split outline/>
                                <DropdownMenu>
                                    <DropdownItem>{TR.FIND_CREATED}</DropdownItem>
                                  </DropdownMenu> */}
              {/* </InputGroupButtonDropdown> */}
              {/* <Input type="date" name="dateFrom" id="dateFrom" placeholder={TR.FROM_DATE}
                                   onChange={this.dateFromHandler}/>
                                   <Input type="date" name="dateTo" id="dateTo" placeholder={TR.TO_DATE}
                                  onChange={this.dateToHandler}/> */}
              {/* <Button color="link">3d</Button>
              <Button color="link">7d</Button> */}
            </InputGroup>
          </Col>
          <Col sm={{ size: 3, order: 0, offset: 0 }}>
            <InputGroup style={{ marginLeft: 0 }}>
              <Input
                disabled={this.state.authDisabled}
                type="text"
                placeholder={TR.LOGIN}
                defaultValue={this.props.credentials.login}
                onChange={e => {
                  this.setState({
                    login: e.target.value
                  })
                }}
              />
              <Input
                disabled={this.state.authDisabled}
                type="password"
                placeholder={TR.PASSWORD}
                onChange={e => (this.setState({ pass: `${e.target.value}` }))}
              />
              <Button
                color={this.state.authDisabled ? "link" : "primary"}
                onClick={() => this.clickLogin()}
                type="submit"
                form="form1"
              >
                {this.state.authDisabled ? TR.LOGOUT : TR.ENTER}
              </Button>
            </InputGroup>
          </Col>
          <Col sm={{ size: "auto", offset: 1 }}>
            <Button
              style={{ width: "100%", height: "100%", textAlign: "center" }}
              color={msgCounter.length > 0 ? "primary" : "link"}
              onClick={() => this.readMessages()}
            >
              {TR.NOTIFICATIONS + msgCounter}
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }

  readMessages() {
    const unreadMsgs = this.props.unreadMessages;
    if (!unreadMsgs || unreadMsgs.length === 0) return;

    let userMessages = [];
    let newCandidates = [];
    let tagsChanges = [];
    let interviewsChanges = [];

    const urlCandidateIdPrefix = process.env.REACT_APP_CLIENT_URL_PREFIX + ":" + process.env.REACT_APP_PORT + "/candidate?id=";

    unreadMsgs.reverse();
    unreadMsgs.forEach((msg, i) => {
      if (
        !msg.candidates ||
        msg.candidates.length === 0 ||
        (!msg.users || msg.users.length === 0)
      )
        return;

      const time = moment(msg.created).format("MM.DD HH:mm");

      this.lasMessageId =
        parseInt(msg.id) > this.lasMessageId
          ? parseInt(msg.id)
          : this.lasMessageId;

      const candIdUrl = (
        <a href={urlCandidateIdPrefix + msg.candidates[0].id}>
          {msg.candidates[0].id}
        </a>
      );

      const changesMessage = (
        <p key={i} style={{ margin: "0px" }}>
          {time + " "}
          {candIdUrl}
          {": " + msg.body}
        </p>
      );

      switch (msg.type) {
        case 0:
          userMessages.push(
            <p key={i} style={{ margin: "0px" }}>
              {time + " "}
              {candIdUrl}
              {TR.BY + msg.users[0].id + " : " + msg.body.substring(0, 50)}
            </p>
          );
          break;
        case 1:
          newCandidates.push(
            <p key={i} style={{ margin: "0px" }}>
              {time + " " + msg.users[0].id + TR.ADDED} {candIdUrl}
            </p>
          );
          break;
        case 2:
          tagsChanges.push(changesMessage);
          break;
        case 5:
          interviewsChanges.push(changesMessage);
          break;
        case 6:
          interviewsChanges.push(changesMessage);
          break;
        default:
          break;
      }
    });

    const body = (
      <div>
        {TR.USER_MESSAGES}:<br />
        {userMessages}
        <br />
        {TR.INTERVIEWS}:<br />
        {interviewsChanges}
        <br />
        {TR.NEW_CANDIDATES}:<br />
        {newCandidates}
        <br />
        {TR.TAGS_CHANGED}:<br />
        {tagsChanges}
        <br />
        <Button
          style={{ width: "100%" }}
          color="primary"
          onClick={() => {
            this.props.readAllMessages(this.lasMessageId);
            this.props.toggleModal();
          }}
        >
          {TR.READ_EVERYTHING}
        </Button>
      </div>
    );

    this.props.toggleModal(TR.UNREAD_NEW_CHANGES, body);
  }

  clickLogin() {
    this.state.authDisabled ? this.props.logoutUser() : this.props.loginUser(this.state.login, this.state.pass);
  }

  clickFind() {
    let q = this.state.queryStr;
    if (!isNaN(parseInt(q)) && isFinite(q)) {
      this.props.getCandidates({
        candidates: [{ id: parseInt(q) }]
      });
    } else if (q && q.length > 0) {
      const tagList = q.includes(" ") ? q.toLowerCase().split(" ") : [q];
      this.props.getCandidates({
        tags: tagList
      });
    } else {
      return;
    }
  }

  toggleSplit() {
    this.setState({
      splitButtonOpen: !this.state.splitButtonOpen
    });
  }
}

TopPanel.propTypes = {};

export default TopPanel;
