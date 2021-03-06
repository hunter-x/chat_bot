import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';

export default class MessageBox extends Component {
	constructor(props) {
	super(props);
	this.state = {showencours:false};
    }

    sendMessage(event) {
	if(event.key == 'Enter'){
	event.preventDefault();
	/* Socket is passed here as props from chat.js */
	const socket = this.props.socket;
	/* Emit an event telling server to create message */
	socket.emit(`client:createMessage`, {
	    from: this.props.username,
	    body: ReactDOM.findDOMNode(this.refs.message).value,
	    channel: this.props.channel
	}, (ackn) => {
	    console.log(ackn);
	});
	this.refs.message.value="";

    }else{

		this.setState({showencours:true});	
		this.props.encours(this.state.showencours)
	}
	}

    join(event) {
	event.preventDefault();
	/* Take username from the text field */
	var username = ReactDOM.findDOMNode(this.refs.username).value;
	this.refs.username.value="";	
	
	/* browserHistory.push('/?username=' + username);*/

	this.props.setUsername(username);
    }
    
    render() {
	if (this.props.username) {
	    return (
			<div className="message-box">
				<form  >
					<textarea type="text"  ref="message" onKeyPress={this.sendMessage.bind(this)}
						className="message-input" placeholder="Type message..."></textarea>
					<button type="submit" className="message-submit">Send</button>
				</form>
			</div>
	    );
	} else {
	    return (
			<div className="message-box">
				<form onSubmit={this.join.bind(this)} >
					<textarea type="text" ref="username" 
						className="message-input" placeholder="Type message..."></textarea>
					<button type="submit" className="message-submit">Send</button>
				</form>
			</div>
	    );	    
	}
    }
}
