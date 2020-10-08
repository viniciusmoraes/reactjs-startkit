import React from 'react';

import MessageItem from './MessageItem';

// @ts-ignore
const MessageList = ({authUser, messages, onEditMessage, onRemoveMessage,}) => (
    <ul>
        {messages.map((message: any) => (
            <MessageItem
                //@ts-ignore
                authUser={authUser}
                key={message.uid}
                message={message}
                onEditMessage={onEditMessage}
                onRemoveMessage={onRemoveMessage}
            />
        ))}
    </ul>
);

export default MessageList;
