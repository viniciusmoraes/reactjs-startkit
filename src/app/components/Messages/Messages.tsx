import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import {withFirebase} from '../Firebase';
import MessageList from './MessageList';

class Messages extends Component {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {
            text: '',
            loading: false,
        };
    }

    componentDidMount() {
      // @ts-ignore
        if (!this.props.messages.length) {
            this.setState({loading: true});
        }

        this.onListenForMessages();
    }

    // @ts-ignore
  componentDidUpdate(props) {
    // @ts-ignore
        if (props.limit !== this.props.limit) {
            this.onListenForMessages();
        }
    }

    onListenForMessages = () => {
      // @ts-ignore
        this.props.firebase
            .messages()
            .orderByChild('createdAt')
            // @ts-ignore
            .limitToLast(this.props.limit)
            .on('value', (snapshot: any) => {
              // @ts-ignore
                this.props.onSetMessages(snapshot.val());

                this.setState({loading: false});
            });
    };

    componentWillUnmount() {
      // @ts-ignore
        this.props.firebase.messages().off();
    }

    onChangeText = (event: any) => {
        this.setState({text: event.target.value});
    };

    onCreateMessage = (event: any, authUser: any) => {
      // @ts-ignore
        this.props.firebase.messages().push({
          // @ts-ignore
            text: this.state.text,
            userId: authUser.uid,
          // @ts-ignore
            createdAt: this.props.firebase.serverValue.TIMESTAMP,
        });

        this.setState({text: ''});

        event.preventDefault();
    };

    onEditMessage = (message: any, text: any) => {
        const {uid, ...messageSnapshot} = message;
      // @ts-ignore
        this.props.firebase.message(message.uid).set({
            ...messageSnapshot,
            text,
          // @ts-ignore
            editedAt: this.props.firebase.serverValue.TIMESTAMP,
        });
    };

    onRemoveMessage = (uid: any) => {
      // @ts-ignore
        this.props.firebase.message(uid).remove();
    };

    onNextPage = () => {
      // @ts-ignore
        this.props.onSetMessagesLimit(this.props.limit + 5);
    };

    render() {
        // @ts-ignore
        const {messages} = this.props;
        // @ts-ignore
        const {text, loading} = this.state;
        // @ts-ignore
        const authUser = this.props.authUser;

        return (
            <div>
                {!loading && messages && (
                    <button type="button" onClick={this.onNextPage}>
                        More
                    </button>
                )}

                {loading && <div>Loading ...</div>}

                {messages && (
                    <MessageList
                        authUser={authUser}
                        messages={messages}
                        onEditMessage={this.onEditMessage}
                        onRemoveMessage={this.onRemoveMessage}
                    />
                )}

                {!messages && <div>There are no messages ...</div>}

                <form
                    onSubmit={event =>
                        // @ts-ignore
                        this.onCreateMessage(event, this.props.authUser)
                    }
                >
                    <input
                        type="text"
                        value={text}
                        onChange={this.onChangeText}
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    authUser: state.sessionState.authUser,
    messages: Object.keys(state.messageState.messages || {}).map(
        key => ({
            ...state.messageState.messages[key],
            uid: key,
        }),
    ),
    limit: state.messageState.limit,
});

const mapDispatchToProps = (dispatch: any) => ({
    onSetMessages: (messages: any) =>
        dispatch({type: 'MESSAGES_SET', messages}),
    onSetMessagesLimit: (limit: any) =>
        dispatch({type: 'MESSAGES_LIMIT_SET', limit}),
});

// @ts-ignore
export default compose(withFirebase, connect(mapStateToProps, mapDispatchToProps,),)(Messages);
