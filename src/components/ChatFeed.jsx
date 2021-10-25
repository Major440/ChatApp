import MessageForm from "./MessageForm";
import MyMessage from "./MyMessage";
import TheirMessage from "./TheirMessage";

const ChatFeed = (props) => {
    const {chats , activeChat , userName , messages} = props; // destructuring props

    const chat = chats && chats[activeChat];  //if chats exist then find chats of activeChat, looking for specific active chat

    const renderReadReceipts = (message, isMyMessage) => {
        return chat.people.map((person, index) => person.last_read === message.id && (  // render only if person has read the mssg
            <div
                key={`read_${index}`}
                className="read-receipt"
                style={{
                    float: isMyMessage ? 'right' : 'left',
                    backgroundImage: person.person.avatar && `url(${person.person.avatar})`,
                }}
            />
        ));
    }

    const renderMessages = () => {  // for generating message ... insde this we have to fetch all our messages
        const keys = Object.keys(messages);  // getting id for the messages

        return keys.map((key,index)  => {
            const message = messages[key]; //dynamically taking mssg from this key to loop over them
            // need to have 2 info about the message if any last message was send and is it my message??
            const lastMessageKey = index  === 0 ? null : keys[index-1];  // if there are messgs make sure to find the last mssg
            const isMyMessage = userName === message.sender.username;  // if mssg is ours it finds that

            return (
                <div key = {`msg_${index}`} style = {{width:'100%'}}>
                    <div className = "message-block">
                        {
                            isMyMessage ? 
                            <MyMessage message = {message} />  // passing mssg as props and taking it from line 14
                            : <TheirMessage message = {message} lastMessage = {messages[lastMessageKey]}/> 
                        }

                    </div>
                    <div clasName = "read-receipts" style = {{marginRight : isMyMessage ? '18px' : '0px' , marginleft : isMyMessage ? '0px' : '68px'}}>
                        {renderReadReceipts(message, isMyMessage)}
                    </div>

                </div>
            );

        } );
    };

    

    if(!chat) return "Loading..."  //  verifies that I have chat before accessing the title variable
    return (
        <div className="chat-feed">
          <div className="chat-title-container">
            <div className="chat-title">{chat?.title}</div>
            <div className="chat-subtitle">
              {chat.people.map((person) => ` ${person.person.username}`)}
            </div>
          </div>
          {renderMessages()}
          <div style={{ height: '100px' }} />
          <div className="message-form-container">
            <MessageForm {...props} chatId={activeChat} />
          </div>
        </div>
      );
    };
    
export default ChatFeed;