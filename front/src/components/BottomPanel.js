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
import { createTagsList } from "../functions/prerenderUtils";
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
        <Row style={{paddingTop: "2px", marginLeft: "0px", width: "100%" }}>
            {/* <LogDropdown logsItems={this.state.logMessages} /> */}
            <Button
              onClick={() => {
                sleep(1000).then(() => {
                  this.clickTagList();
                });
              }}
            >
              {TR.TAGS_AND_COLORS}
            </Button>

            <Button style={{marginLeft: "4px"}}

              onClick={() => {
                this.props.getInterviews();
                sleep(1000).then(() => {
                  this.props.toggleModal(
                    TR.INTERVIEWS,
                    <Interviews data={this.state.interviews} />,
                    {
                      width: "100%",
                      maxWidth: "1800px"
                    }
                  );
                });
              }}
            >
              {TR.INTERVIEWS}
            </Button>
            <Dropdown style={{marginLeft: "4px"}}
              direction="left"
              color={logLevel}
              isOpen={this.state.btnDropLogMsgs}
              toggle={() => {
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
        </Row>
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
