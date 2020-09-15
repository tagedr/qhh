import React, { Component } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Button,
  ListGroup,
  Container,
  Col,
  Row
} from "reactstrap";
import { createTagsList, prepareInterviews } from "../functions/prerenderUtils";
import { Interviews } from "./modals/Modals";
import { TR } from "../functions/tr";
import moment from "moment/moment";

class BottomPanel extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      interviews: this.props.interviews,
      statusMessage: this.props.statusMessage,
      logMessages: this.props.logMessages,
      btnDropLogMsgs: false
    };
  }

  shouldComponentUpdate(nextProps) {
    if (
      nextProps.shortcutInfo &&
      this.props.shortcutInfo &&
      nextProps.shortcutInfo.counter !== this.props.shortcutInfo.counter &&
      nextProps.shortcutInfo.keyPressed === "alt+t"
    ) {
      this.clickTagList();
      return true;
    }
    // console.error("FIRE!");
    if (this.state.interviews.length !== nextProps.interviews.length) {
      this.setState({
        interviews: nextProps.interviews
      });
      return true;
    }
    if (this.state.logMessages.length !== nextProps.logMessages.length) {
      this.setState({
        logMessages: nextProps.logMessages
      });
      return true;
    }
    if (this.state.btnDropLogMsgs !== nextProps.btnDropLogMsgs) {
      this.setState({
        btnDropLogMsgs: nextProps.btnDropLogMsgs
      });
      return true;
    }
    return false;
  }

  render() {
    const lMessages = this.state.logMessages;
    const LogMsgsIsNotEmpty = lMessages && lMessages.length > 0;
    let logLevel = "light";
    let lMessagesMenuItems = [];
    if (LogMsgsIsNotEmpty) {
      logLevel = lMessages[lMessages.length - 1].LEVEL;

      lMessages.forEach((m, i) => {
        lMessagesMenuItems.push(<div><DropdownItem key={i}>asdasd
            {moment(m.date).format("HH:mm:ss ") + m.BODY}
          </DropdownItem></div>);
      });
    }
    // console.log("rerenderrrrr " + lMessagesMenuItems);
    return (
      <Container style={{ paddingRight: "0", paddingLeft: "0" }}>
        <Row style={{ width: "100%", height: "100%" }}>
          <Col sm={{ size: 5, order: 0, offset: 0 }}>
            {/* <LogDropdown logsItems={this.state.logMessages} /> */}
            <Button
              style={{
                marginLeft: "10px",
                marginRight: "10px",
                padding: "2px"
              }}
              onClick={() => {
                sleep(1000).then(() => {
                  this.clickTagList();
                });
              }}
            >
              {TR.TAGS_AND_COLORS}
            </Button>

            <Button
              style={{
                marginLeft: "10px",
                marginRight: "10px",
                padding: "2px"
              }}
              onClick={() => {
                this.props.getInterviews();
                sleep(1000).then(() => {
                  this.props.toggleModal(
                    TR.INTERVIEWS,
                    <Interviews data={this.state.interviews} />,
                    {
                      width: "1800px",
                      margin: "1.75rem",
                      maxWidth: "1800px"
                    }
                  );
                });
              }}
            >
              {TR.INTERVIEWS}
            </Button>
          </Col>
          <Col sm={{ size: 4, order: 0, offset: 3 }}>
            <Dropdown
              direction="left"
              color={logLevel}
              isOpen={this.state.btnDropLogMsgs}
              toggle={() => {
                console.log("logState: " + this.state.btnDropLogMsgs);
                this.setState({ btnDropLogMsgs: !this.state.btnDropLogMsgs });
              }}
            >
              <DropdownToggle caret>
                {LogMsgsIsNotEmpty
                  ? moment(lMessages[lMessages.length - 1].date).format(
                      "HH:mm:ss "
                    ) + lMessages[lMessages.length - 1].BODY
                  : TR.LOGS_IS_EMPTY}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>{"lMessagesMenuItems"}</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
      </Container>
    );
  }

  clickTagList() {
    const tagsList = createTagsList(this.props.tags);
    this.props.getTags();
    this.props.toggleModal(
      TR.TAGS_AND_COLORS,
      <ListGroup>{tagsList}</ListGroup>
    );
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

BottomPanel.propTypes = {};

export default BottomPanel;
