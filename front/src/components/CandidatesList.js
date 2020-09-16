import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import "../App.css";
import { getColorByTagPriority } from "../functions/prerenderUtils";

class CandidatesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foundedCandidates: props.foundedCandidates,
      activeId: -1
    };
    this.candidateElements = [];
  }

  componentDidUpdate(prevProps, prevState) {
    const prevPropCand = prevProps.foundedCandidates;
    const curPropCand = this.props.foundedCandidates;

    const isPropsEquals = prevPropCand === curPropCand;
    const isActiveIdChanged = prevState.activeId === this.state.activeId;
    const isKeyPressed = prevProps.shortcutInfo !== this.props.shortcutInfo;
    if (isKeyPressed) {
      if (this.candidateElements.length > 0) {
        this.setState({
          activeId: Number(this.candidateElements[0].key)
        });
      }
      const isUpPressed = this.props.shortcutInfo.keyPressed === "up";
      const isDownPressed = this.props.shortcutInfo.keyPressed === "down";
      let direction = 0;
      if (isDownPressed) direction = 1;
      if (isUpPressed) direction = -1;
      this.candidateElements.forEach((c, index) => {
        if (Number(c.key) === Number(this.state.activeId)) {
          this.openCandidateDetails(
            Number(
              this.candidateElements[
                index + direction >= 0 &&
                index + direction < this.candidateElements.length
                  ? index + direction
                  : index
              ].key
            )
          );
          return;
        }
      });
    }

    if (isPropsEquals) return false;

    if (isActiveIdChanged) {
      this.setState({
        foundedCandidates: curPropCand
      });
    }
  }

  render() {
    const candidates = this.state.foundedCandidates;
    if (!candidates || candidates.length === 0) this.candidateElements = [];
    else {
      let ret = [];
      let uniqKeys = [];

      candidates.forEach(c => {
        if (uniqKeys.indexOf(c.id) === -1) {
          uniqKeys = uniqKeys.concat(c.id);
        } else return;

        const isActive = c.id === this.state.activeId ? "active" : "";

        const candItemText = (
          <div>
            <b style={{ marginBottom: 0, height: "50%" }}>{c.id}</b>
            <p style={{ marginBottom:0, lineHeight: 1 }}>{c.name}</p>
          </div>
        );
 
        const bgColor = {
          backgroundColor: "#" + getColorByTagPriority(c.tags)
        };

        ret = ret.concat(
          <ListGroupItem
            className={isActive}
            style={bgColor}
            key={c.id}
            onClick={() => {
              this.props.getTags();
              this.openCandidateDetails(c.id);
            }}
          >
            {candItemText}
          </ListGroupItem>
        );
      });

      if (this.candidateElements !== ret) this.candidateElements = ret;
    }

    return (
      <ListGroup style={{ width: "100%" }}>
        {this.candidateElements.reverse()}
      </ListGroup>
    );
  }

  openCandidateDetails(id) {
    this.props.openCandidateDetails(Number(id));
    this.setState({ activeId: Number(id) });
  }
}

CandidatesList.propTypes = {};

export default CandidatesList;
