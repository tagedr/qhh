import React, {Component} from 'react';
import moment from "moment/moment";
import '../App.css';
import {TR} from "../functions/tr";

export default class MessagesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: this.props.messages && this.props.messages > 0 ? this.props.messages : null
        }
    }

    shouldComponentUpdate(nextProps) {
        console.log("check MessagesList!");
        if (nextProps.messages !== this.state.messages) {
            this.setState({
                messages: nextProps.messages
            });
            console.log("should update MessagesList!");
            return true;
        }
        return false;
    }

    render() {
        let msgs = this.state.messages && this.state.messages.length > 0 ? this.state.messages : [];
        let ret = [];
        const chatStyle = {margin: '10px'};
        const sysStyle = {margin: '10px', fontSize: '0.7rem'};
        msgs.forEach((m, i) => {
            console.log(m.updated);
            let time = moment(m.updated).local();
            const isSysMessage = m.type != 0 ? true : false;
            const user = m.users.length > 0 && m.users[0].login ? m.users[0].login : "Anonymous";
            let compMsg =
                (
                    <p key={i}
                       style={isSysMessage ? sysStyle : chatStyle}
                    >
                        {isSysMessage ? time.format("HH:mm:ss ") : <b>{time.format("HH:mm:ss ")}</b>}
                        {isSysMessage ? time.format("YY.MM.DD ") : <b>{time.format("MM.DD ")}</b>}
                        {isSysMessage ? "by " + user + "" : <b>{user}</b>}
                        <br/>
                        {m.body}
                    </p>);
            ret = ret.concat(compMsg);
        });
        ret.reverse();

        return (
            <div style={{fontSize: '0.8rem', marginTop: "10px"}}>
                {ret.length > 0 ? ret : TR.NO_MESSAGES}
            </div>
        )

    }
}