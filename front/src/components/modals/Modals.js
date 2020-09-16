import React, { PureComponent, Component } from 'react';
import { BootstrapTable, TableHeaderColumn, DeleteButton } from 'react-bootstrap-table';
import { Button, Col, FormGroup, Input, InputGroup, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import moment from "moment/moment";
import { actionFormatter, candidateFormatter, dateFormatter, userFormatter } from "../../functions/prerenderUtils"
import { delInterview, postInterview } from "../../functions/requestHandlers";
import { TR } from "../../functions/tr";

export default class Modals extends Component {

    render() {
        const title = this.props && this.props.title ? this.props.title : '';
        return (
            <div>
                <Modal style={this.props.style ? this.props.style : {}} size="lg" isOpen={this.props.isOpen}
                    toggle={this.props.toggle}>
                    <ModalHeader toggle={this.props.toggle}>{title}</ModalHeader>
                    <ModalBody>
                        {this.props.body ? this.props.body : ''}
                    </ModalBody>
                </Modal>
            </div>
        );
    }

}

export class Interviews extends PureComponent {
    handleDeleteButtonClick = (onClick) => {
        console.log(this.props.data.length);
        onClick();
    }

    createCustomDeleteButton = (onClick) => {
        return (
            <DeleteButton
                btnText={TR.DELETE}
                btnContextual='btn-success'
                className='my-custom-class'
                btnGlyphicon='glyphicon-edit'
                onClick={e =>
                    this.handleDeleteButtonClick(onClick)
                } />
        );
    }
    render() {
        let data = this.props.data.slice();
        for (let i = 0; i < data.length; i++) {
            data[i].actions = [];
            data[i].actions.push(
                {
                    label: "[X]",
                    callback: (() => {
                        delInterview(data[i].id);
                        delete data[i];
                    })
                })
        }

        const options = {
            deleteBtn: this.createCustomDeleteButton
        };
        const selectRow = {
            mode: 'checkbox'
        };
        return (
            <BootstrapTable selectRow={selectRow} options={options} deleteRow data={data} height='500px' scrollTop={'Bottom'} hover condensed >
                <TableHeaderColumn width='46px' dataSort={true} isKey dataField='id'>
                    #
                </TableHeaderColumn>
                <TableHeaderColumn width='110px' dataSort={true} dataField='begin'
                    dataFormat={dateFormatter}>
                    {TR.DATE_TIME}
                </TableHeaderColumn>
                <TableHeaderColumn width='330px' dataSort={true} dataField='candidate'
                    dataFormat={candidateFormatter}>
                    {TR.CANDIDATE}
                </TableHeaderColumn>
                <TableHeaderColumn width='120px' dataSort={true} dataField='welcomeUser'
                    dataFormat={userFormatter}>
                    {TR.WELCOME_USER}
                </TableHeaderColumn>
                <TableHeaderColumn width='120px' dataSort={true} dataField='interviewer'
                    dataFormat={userFormatter}>
                    {TR.INTERVIEWER}
                </TableHeaderColumn>
                <TableHeaderColumn width='330px' dataSort={true} dataField='desc'>
                    {TR.COMMENTS}
                </TableHeaderColumn>
            </BootstrapTable>
        );
    }
}

export class ChangeCandidateTags extends PureComponent {

    render() {
        let initTags = [];
        let cTags = [];

        // init value to display in text field
        let cInfo = this.props.candidateInfo;
        cInfo.tags.forEach((t) => {
            initTags = initTags.concat(t.name);

        });

        let sendTags = () => {
            if (!cTags || cTags.length === 0)
                return;
            let ret = [];
            let splitted = cTags.toLowerCase().replace(/ /g, '').split(',');
            if (splitted) {
                splitted.forEach((t, i) => {
                    ret[i] = ({ name: t });
                })
            }

            cTags = (cTags && cTags.length > 0) ? ret : [];
            this.props.postTags(cTags, this.props.candidateInfo, this.props.openDetailsFunc)
        };

        return <FormGroup row style={{ width: '100%' }}>
            <InputGroup style={{ padding: '10px' }} type="textarea" name="text">
                <Input autofocus type="textarea" style={{ margin: '10px' }} defaultValue={initTags.join(', ')}
                    placeholder={TR.ENTER_NEW_TAGS} onChange={(e) => cTags = e.target.value} />
                <Col sm={{ size: 12, offset: 0 }}>
                    <Button style={{ width: "100%" }} color="primary"
                        onClick={() => {
                            sendTags();
                            this.props.toggleModal();
                        }}>{TR.SEND}</Button>
                </Col>
            </InputGroup>
        </FormGroup>;
    }

}

export class AddInterview extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            welcomeUser: this.props.users && this.props.users.length > 0 ? this.props.users[0].login : null,
            interviewer: this.props.users && this.props.users.length > 0 ? this.props.users[0].login : null,
            candidate: this.props.candidate,
            date: moment(Date.now()).format("YYYY-MM-DD"),
            time: moment(Date.now()).format("HH:mm"),
            desc: ''
        }
    }


    render() {
        let users = [];
        this.props.users.forEach((u) => {
            users.push(<option>{u.login}</option>)
        });
        console.error(this.state.interviewer);
        return (
            <div>
                <InputGroup>
                    <Label style={{ width: "150px" }} for="WelcomeUserSelect">{TR.WELCOME_USER}</Label>
                    <Input type="select" name="select" id="WelcomeUserSelect"
                        onChange={(e) => {
                            this.setState({
                                welcomeUser: e.target.value
                            });
                        }}
                    >
                        {users}
                    </Input>
                </InputGroup>
                <InputGroup>
                    <Label style={{ width: "150px" }} for="InterviewerSelect">{TR.INTERVIEWER}</Label>
                    <Input type="select" name="select" id="InterviewerSelect"
                        onChange={(e) => {
                            this.setState({
                                interviewer: e.target.value
                            });
                        }}
                    >
                        {users}
                    </Input>
                </InputGroup>
                <InputGroup>
                    <Label style={{ width: "150px" }} for="CandidateSelect">{TR.CANDIDATE}</Label>
                    <Input type="select" name="select" id="CandidateSelect" disabled>
                        <option>{this.props.candidate.name}</option>
                    </Input>
                </InputGroup>
                <InputGroup>
                    <Label style={{ width: "150px" }} for="Datetime">{TR.DATE_TIME}</Label>
                    <Input type="date" name="date" id="Date" defaultValue={this.state.date} onChange={(e) => {
                        this.setState({ date: e.target.value })
                    }} />
                    <Input type="time" name="time" id="Time" defaultValue={this.state.time} onChange={(e) => {
                        this.setState({ time: e.target.value })
                    }} />
                </InputGroup>
                <InputGroup>
                    <Label style={{ width: "150px" }} for="Desc">
                        {TR.COMMENTS}
                    </Label>
                    <Input type="textarea" name="text" id="Desc" onChange={(e) => {
                        this.setState({ desc: e.target.value })
                    }}
                    />
                </InputGroup>
                <Button style={{ width: "100%", marginTop: "10px" }} color="primary"
                    onClick={() => {
                        this.clickAdd();
                        this.props.toggleModal()
                    }}
                >
                    {TR.ADD_NEW_INTERVIEW}
                </Button>
            </div>
        );
    }

    clickAdd() {
        const ts = this.state;
        const tp = this.props;
        let datetime = moment(ts.date + " " + ts.time, "YYYY-MM-DD HH:mm");
        let { wUser, interviewer } = {};
        tp.users.forEach((u) => {
            if (u.login === ts.welcomeUser)
                wUser = u;

            if (u.login === ts.interviewer)
                interviewer = u;
        });
        const interview = {
            begin: datetime.format("YYYY-MM-DD HH:mm"),
            desc: ts.desc,
            welcomeUser: [wUser],
            interviewer: [interviewer],
            candidates: [tp.candidate]
        };
        console.log(datetime);
        console.log(interview);
        postInterview(interview);
    }

}

Modals.propTypes = {};

