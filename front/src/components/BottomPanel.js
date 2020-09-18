import React, { PureComponent } from "react";
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

class BottomPanel extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      interviews: this.props.interviews,
      statusMessage: this.props.statusMessage,
      logMessages: this.props.logMessages,
      btnDropLogMsgs: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.shortcutInfo &&
      this.props.shortcutInfo &&
      nextProps.shortcutInfo.counter !== this.props.shortcutInfo.counter &&
      nextProps.shortcutInfo.keyPressed === "alt+t"
    ) {
      this.clickTagList();
      return true;
    }
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
    if (this.state.btnDropLogMsgs !== nextState.btnDropLogMsgs) {
      this.setState({
        btnDropLogMsgs: nextState.btnDropLogMsgs
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
    let lastMsg = lMessages[lMessages.length - 1];
    if (LogMsgsIsNotEmpty) {
      logLevel = lastMsg.LEVEL;

      lMessages.forEach((m, i) => {
        lMessagesMenuItems.push(<div><DropdownItem color={m.LEVEL} key={i}>
            {moment(m.date).format("HH:mm:ss ") + m.BODY}
          </DropdownItem></div>);
      });
    }
    return (
        <Row style={{paddingTop: "2px", marginLeft: "0px", width: "100%" }}>
          <Col xs="2" md="2" xl="1"  style={{paddingLeft:"0px", paddingRight:"2px"}}>
            <Button color="outline-primary"
              onClick={() => {
                sleep(1000).then(() => {
                  this.clickTagList();
                });
              }}
            >
              {TR.TAGS_AND_COLORS}
            </Button>
            </Col>
            <Col xs="4" md="4" xl="3" style={{paddingLeft: "2px", paddingRight: "2px"}}>
            <Button  color="outline-primary"

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
            </Col>
            <Col xs="6" md="6" xl="8" style={{paddingRight:"0px"}}>
            <Dropdown style={{float:"right"}}
              direction="up"
              color={logLevel}
              isOpen={this.state.btnDropLogMsgs}
              toggle={() => {
                this.setState({ btnDropLogMsgs: !this.state.btnDropLogMsgs });
              }}
            >
              <DropdownToggle caret color={logLevel}>
                {LogMsgsIsNotEmpty
                  ? ( lastMsg.BODY.length > 15 ? lastMsg.BODY.substring(0, 15) + "..." : lastMsg.BODY )
                  : TR.LOGS_IS_EMPTY}
              </DropdownToggle>
              
              <DropdownMenu>
                {lMessagesMenuItems}
              </DropdownMenu>
            </Dropdown>
            </Col>
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
