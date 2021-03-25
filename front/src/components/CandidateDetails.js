import React, { PureComponent } from 'react';
import { Button, Col, Container, Input, Row } from 'reactstrap';
import MessagesList from './MessagesList'

import { createStatusSelector } from "../functions/prerenderUtils"
import { ChangeCandidateTags, ChangeCandidateName } from "./modals/Modals"
import { getDuplicates } from "../functions/requestHandlers"

import { TR } from "../functions/tr";

class CandidateDetails extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            message: '',
            messages: this.props.messages ? this.props.messages : [],
            isModalOpen: false,
            newTags: null,
        };
        this.newMessage = '';
        this.createStatusSelector = createStatusSelector.bind(this);
    }


    render() {
        let statusSelector, id, cTags = [], messageControls, candHeader, dupElements = [], buttonChangeName, buttonChangeTag;
        let candidateInfo = this.props.candidateInfo;
        let duplicates = this.props.duplicates ? this.props.duplicates : [];

        if (candidateInfo) {

            id = candidateInfo.id;
            candHeader = (
                <a href={process.env.REACT_APP_CLIENT_URL_PREFIX + "/candidate?id=" + id}>{id + " - " + candidateInfo.name}</a>);

            candidateInfo.tags.map((t) => {
                cTags.push(<a href={process.env.REACT_APP_CLIENT_URL_PREFIX + "/tag?name=" + t.name}>{t.name}</a>)
            });

            statusSelector = this.createStatusSelector(
                this.props.tagsInfo,
                candidateInfo,
                this.props.openCandidateDetails,
                this.props.getCandidates
            );

            messageControls = (
                <div style={{ align: 'center' }}>
                    <Input onKeyPress={(e) => {
                        if (e.charCode === 13 && e.ctrlKey) {
                            this.sendMessage();
                        }
                    }} type="textarea" style={{ margin: '0px' }} placeholder={TR.ENTER_MESSAGE_HERE}
                        onChange={(e) => this.setState({ message: e.target.value })} value={this.state.message}
                    />

                    <Button type="primary"
                        onClick={() => {
                            this.sendMessage();
                        }}>
                        {TR.SEND}
                    </Button>
                </div>
            );

            if (duplicates.length > 0) {
                duplicates.forEach((dup, i) => {
                    dupElements.push(<a href={process.env.REACT_APP_CLIENT_URL_PREFIX + "/candidate?id=" + dup.id}>{dup.id}</a>)
                })
            }

            buttonChangeName = (<Button color="light" style={{ padding: "0px" }}><img style={{ width: "24px", height: "24px" }} src={"account_box-24px.svg"}
                onClick={
                    () => this.changeNameWindow()
                }
            /></Button>);

            buttonChangeTag = (<Button color="light" style={{ padding: "0px" }}><img style={{ width: "24px", height: "24px" }} src={"label-24px.svg"}
                onClick={
                    () => this.changeTagWindow()
                }
            /></Button>);
            this.duplicatesDetails = (
                <div style={{maxHeight:"60px", overflowY: 'auto'}}>
                    {duplicates.length > 0 ? TR.POSSIBLE_DUPLICATES : ""}
                    {duplicates.length > 0 ? dupElements.map((dup) => <b> {dup} </b>) : ""}
                </div>);
        }

        return (
            <Col style={{ margin: "0px", padding: "2px", height: "100%", maxHeight: "100%" }}>
                {!this.props.candidateInfo
                    ? <div style={{ color: "#BBBBBB", display: "flex", height: "90%", width: "100%", textAlign: "center", alignItems: "center", justifyContent: "center" }}>
                        <br /><br />{TR.MUST_SELECT_CANDIDATE_FOR_DETAILS}
                    </div>
                    : ""}

                {this.props.candidateInfo ? (<div style={{ paddingTop: "6px" }}>

                    {buttonChangeName}

                    {buttonChangeTag}
                    {cTags.map((tag) => <b> {tag} </b>)}
                    <h5 style={{ wordWrap: "break-word", paddingTop: "6px" }}>
                        {candHeader}
                    </h5>
                    {this.duplicatesDetails}
                    {statusSelector}

                    {messageControls}
                </div>) : ""}
                <MessagesList messages={this.props.messages} />

            </Col>

        );
    }


    async sendMessage() {
        this.setState({
            isModalOpen: true
        });
        if (await this.props.postMessage(this.state.message, this.props.candidateInfo.id, this.props.credentials.id)) {
            this.setState({ message: '' });
        };
        sleep(1000).then(() => {
            this.props.getTags();
            this.props.openCandidateDetails(this.props.candidateInfo.id)
        })
    }

    changeTagWindow() {
        let cInfo = this.props.candidateInfo;

        let modalBody = (<ChangeCandidateTags
            toggleModal={this.props.toggleModal}
            candidateInfo={cInfo}
            updateTags={this.props.updateTags}
            openCandidateDetails={this.props.openCandidateDetails}
        />);


        this.props.toggleModal(TR.CHANGE_CANDIDATE_TAGS_FOR + " [" + cInfo.id + "] - " + cInfo.name, modalBody, { minWidth: "80%" });
    }

    changeNameWindow() {
        let cInfo = this.props.candidateInfo;

        let modalBody = (<ChangeCandidateName
            toggleModal={this.props.toggleModal}
            candidateInfo={cInfo}
            updateCandidateName={this.props.updateCandidateName}
            openCandidateDetails={this.props.openCandidateDetails}
        />);


        this.props.toggleModal(TR.CHANGE_CANDIDATE_NAME_FOR + " [" + cInfo.id + "]", modalBody, { minWidth: "80%" });
    };
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


CandidateDetails.propTypes = {};

export default CandidateDetails;
