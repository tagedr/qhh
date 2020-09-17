import { Button, ButtonGroup, ListGroupItem } from 'reactstrap'
import React, { Component } from 'react';
import moment from "moment/moment";
import { updateTags } from './requestHandlers'
import { AddInterview } from "../components/modals/Modals";
import { TR } from "./tr"


export function createStatusSelector(tags, candInfo, openCandidateDetails) {
    let ret = [];
    let deactivatedTagIndex = [];
    tags.forEach((tag, i) => {
        if (tag.priority >= 100 && tag.priority < 300) {
            let activeStatusStyle = '';
            candInfo.tags.forEach((cTag, cI) => {
                if (tag.id === cTag.id) {
                    activeStatusStyle = { borderWidth: "5px" };
                    deactivatedTagIndex.push(cI);
                }
            });

            let statusStyle = {
                backgroundColor: "#" + tag.color,
                margin: "1px",
                paddingLeft: "3px",
                paddingRight: "3px"
            };

            const name = tag.name.split("");
            ret = ret.concat(
                <Button key={i}
                    style={Object.assign({}, activeStatusStyle, statusStyle)}
                    onClick={() => {
                        let changedTagList = candInfo.tags.slice();
                        deactivatedTagIndex.forEach((t) => {
                            changedTagList.splice(t, 1);
                        });
                        if (tag.name === "interview") {
                            addInterviewModal.bind(this)();
                        }
                        changedTagList.push(tag);
                        console.log(changedTagList);
                        updateTags(changedTagList, candInfo, openCandidateDetails);
                    }}
                >
                    {name[0]}{name[1]}{name[2]}
                </Button>)
        }
    });
    return <ButtonGroup>{ret}</ButtonGroup>
}

function addInterviewModal() {
    let cInfo = this.props.candidateInfo;

    let modalBody = (
        <AddInterview
            users={this.props.users.filter((u) => u.id && u.id !== 0)}
            candidate={cInfo}
            toggleModal={this.props.toggleModal}
        />
    );

    this.props.toggleModal(TR.ADD_NEW_INTERVIEW_FOR + " [" + cInfo.id + "] - " + cInfo.name, modalBody);
}

export function createTagsList(tags) {
    let ret = [];
    tags.forEach((t, i) => {
        const bgColor = { backgroundColor: "#" + t.color, textAlign: "center" };
        const link = "/tag?name=" + t.name;
        ret = ret.concat(
            (<ListGroupItem style={bgColor}
                key={i}
            >
                <a href={link}>{t.name} ({t.size})</a>
            </ListGroupItem>)
        );
    });
    return ret;
}

export function candidateFormatter(cell, row, enumObject, index) {
    return (
        <CandidateFormatter key={index} data={cell} />
    );
}

export function userFormatter(cell, row, enumObject, index) {
    return (
        <UserFormatter key={index} data={cell} />
    );
}

export function actionFormatter(cell, row, enumObject, index) {
    console.warn(cell);
    let ret = [];
    cell.forEach((e) => {
        ret.push(<Button key={index} color="link" style={{ margin: "0px", padding: "0px" }}
            onClick={e.callback}
        >
            {e.label}
        </Button>);
    });
    return (<div style={{ margin: "0px", padding: "0px" }}>{ret}</div>);
}


class CandidateFormatter extends Component {
    render() {
        const tpData = this.props.data[0];
        const linkId = tpData && tpData.id ? "/candidate?id=" + tpData.id : '';
        const id = tpData && tpData.id ? tpData.id : 'empty';
        const name = tpData && tpData.name ? tpData.name : 'empty';
        return (
            <div>
                <a href={linkId}>
                    [{id}] {name}
                </a>
            </div>
        );
    }
}

class UserFormatter extends Component {
    render() {
        const tpData = this.props.data[0];
        const name = tpData && tpData.login ? tpData.login : 'empty';
        return (
            <div>
                {name}
            </div>
        );
    }
}

export function dateFormatter(cell, row, enumObject, index) {
    return (
        <DateFormatter data={cell}></DateFormatter>
    );
}

//2020-07-17T06:59:00.000Z
class DateFormatter extends Component {
    render() {
        let time = moment(this.props.data).local();
        return (
            <div>
                {time.format("MM.DD")} {time.format("HH:mm")}
            </div>
        );
    }
}

export function getColorByTagPriority(tags) {
    let ret = { priority: -1 };
    tags.forEach((c) => {
        ret = c.priority && c.priority > ret.priority ? c : ret;
    });
    return ret.color;
}