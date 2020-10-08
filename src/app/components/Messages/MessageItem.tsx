import React, {Component} from 'react';

class MessageItem extends Component {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {
            editMode: false,
            // @ts-ignore
            editText: this.props.message.text,
        };
    }

    onToggleEditMode = () => {
        this.setState(state => ({
            // @ts-ignore
            editMode: !state.editMode,
            // @ts-ignore
            editText: this.props.message.text,
        }));
    };

    onChangeEditText = (event: any) => {
        this.setState({editText: event.target.value});
    };

    onSaveEditText = () => {
        // @ts-ignore
        this.props.onEditMessage(this.props.message, this.state.editText);

        this.setState({editMode: false});
    };

    render() {
        // @ts-ignore
        const {authUser, message, onRemoveMessage} = this.props;
        // @ts-ignore
        const {editMode, editText} = this.state;

        return (
            <li>
                {editMode ? (
                    <input
                        type="text"
                        value={editText}
                        onChange={this.onChangeEditText}
                    />
                ) : (
                    <span>
                    <strong>{message.userId}</strong> {message.text} {message.editedAt && <span>(Edited)</span>}
          </span>
                )}

                {authUser.uid === message.userId && (
                    <span>
            {editMode ? (
                <span>
                    <button onClick={this.onSaveEditText}>Save</button>
                    <button onClick={this.onToggleEditMode}>Reset</button>
                </span>
            ) : (
                <button onClick={this.onToggleEditMode}>Edit</button>
            )}

                        {!editMode && (
                            <button
                                type="button"
                                onClick={() => onRemoveMessage(message.uid)}
                            >
                                Delete
                            </button>
                        )}
          </span>
                )}
            </li>
        );
    }
}

export default MessageItem;
