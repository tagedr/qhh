import React, {Component} from 'react';
import {Button, Col, Container, Input, Row} from 'reactstrap';
import MessagesList from './MessagesList'

import {createStatusSelector} from "../functions/prerenderUtils"
import {ChangeCandidateTags} from "./modals/Modals"

import {TR} from "../functions/tr";

class CandidateDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: '',
            messages: this.props.messages ? this.props.messages : [],
            isModalOpen: false,
            newTags: null
        };
        this.newMessage = '';
        this.createStatusSelector = createStatusSelector.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log("check details!");
        // console.log(this.state.messages.length);
        // console.log(nextProps.messages);
        if (nextProps.messages && ((nextProps.messages !== this.state.messages) || nextProps.messages.length !== this.state.messages.length)) {
            this.setState({
                messages: nextProps.messages
            });
            return true;
        }

        if (nextState.isModalOpen !== this.state.isModalOpen) {
            return true;
        }

        if (this.props.candidateInfo &&
            nextProps.shortcutInfo &&
            this.props.shortcutInfo &&
            nextProps.shortcutInfo.counter !== this.props.shortcutInfo.counter &&
            nextProps.shortcutInfo.keyPressed === 'alt+shift+g') {

            this.changeTagWindow();
            return true;
        }

        if ((this.props.candidateInfo === null && nextProps.candidateInfo) || this.props.candidateInfo !== nextProps.candidateInfo) {
            return true;
        }

        return false;
    }


    render() {
        let statusSelector, id, cTags, messageControls, candHeader;
        let candidateInfo = this.props.candidateInfo;

        if (candidateInfo) {

            id = candidateInfo.id;
            candHeader = (
                <a href={process.env.REACT_APP_CLIENT_URL_PREFIX+":"+process.env.REACT_APP_PORT + "/candidate?id=" + id}>{id + " - " + candidateInfo.name}</a>);

            cTags = "[ " + candidateInfo.tags.map((t) => t.name).join(' , ') + " ]";

            statusSelector = this.createStatusSelector(
                this.props.tagsInfo,
                candidateInfo,
                this.props.openCandidateDetails,
                this.props.getCandidates
            );

            messageControls = (
                <div style={{align: 'center'}}>
                    <Input type="textarea" style={{margin: '0px'}} placeholder={TR.ENTER_MESSAGE_HERE}
                           onChange={(e) => this.setState({message: e.target.value})}/>

                    <Button type="primary"
                            onClick={() => {
                                this.sendMessage();
                                sleep(1000).then(() => {
                                    this.props.getTags();
                                    this.props.openCandidateDetails(this.props.candidateInfo.id)
                                })
                            }}>
                        {TR.SEND}
                    </Button>
                </div>
            );
        }

        return (
                    <Col style={{margin:"0px",padding:"2px",height:"100%",maxHeight:"100%"}}>
                        <h5 >
                            [<img style={{width:"18px", height:"18px"}} src={"edit-black-18dp.svg"}/>]
                            {candHeader}
                        </h5>
                        <Button style={{padding: '0'}}
                                color="link"
                                onClick={
                                    () => this.changeTagWindow()
                                }>
                            {cTags}
                        </Button>
                        <br/>
                        {statusSelector}

                        {messageControls}
                        <MessagesList messages={this.props.messages}/>

                    </Col>

        );
    }

    sendMessage() {
        this.setState({
            isModalOpen: true
        });
        this.props.postMessage(this.state.message, this.props.candidateInfo.id, this.props.credentials.id);
    }

    changeTagWindow() {
        let cInfo = this.props.candidateInfo;

        let modalBody = (<ChangeCandidateTags
            toggleModal={this.props.toggleModal}
            candidateInfo={cInfo}
            updateTags={this.props.updateTags}
            openCandidateDetails={this.props.openCandidateDetails}
        />);

        this.props.toggleModal(TR.CHANGE_CANDIDATE_TAGS_FOR + " [" + cInfo.id + "] - " + cInfo.name, modalBody, {minWidth:"80%"});
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  

CandidateDetails.propTypes = {};

export default CandidateDetails;
