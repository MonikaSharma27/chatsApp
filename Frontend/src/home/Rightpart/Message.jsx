import React from 'react'

const Message = ({message}) => {
  console.log(message);

  const authUser = JSON.parse(localStorage.getItem('ChatAPP'));
  console.log(authUser);

 
  const itsMe = message.senderId === authUser.user.id;
  console.log(authUser.user.id);
 console.log(message.senderId);

  const chatName = itsMe? "chat-end" : "chat-start";
  const chatColor = itsMe? "bg-blue-500":"bg-gray-700";
  return (
    <div>
      <div className="p-4">
        <div className={`chat ${chatName}`}>
          <div className={`chat-bubble text-white ${chatColor}`}>{message.message}</div>
        </div>
        
      </div>
    </div>
  )
}

export default Message
