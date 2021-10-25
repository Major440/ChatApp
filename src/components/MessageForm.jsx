import { useState } from 'react';
import { SendOutlined, PictureOutlined } from '@ant-design/icons';  //importing icons
import { sendMessage, isTyping } from 'react-chat-engine';  //feature of react-chat-engine

const MessageForm = (props) => {
  const [value, setValue] = useState('');  //initial value of msssg is empty string
  const { chatId, creds } = props;

  const handleChange = (event) => {
    setValue(event.target.value);

    isTyping(props, chatId);
  };

  const handleSubmit = (event) => { // event here is a string
    event.preventDefault(); // prevents browser refresh once we submit the form

    const text = value.trim();  // will remove the entry white space

    if (text.length > 0) {
      sendMessage(creds, chatId, { text }); //{text}; object that includes the text of our message... this all are props
    }

    setValue('');  //set value back to empty string
  };

  const handleUpload = (event) => {  // event here contains image
    sendMessage(creds, chatId, { files: event.target.files, text: '' });
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        className="message-input"
        placeholder="Send a message..."
        value={value}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <label htmlFor="upload-button">
        <span className="image-button">
          <PictureOutlined className="picture-icon" />
        </span>
      </label>
      <input
        type="file"
        multiple={false}
        id="upload-button"
        style={{ display: 'none' }}
        onChange={handleUpload.bind(this)}
      />
      <button type="submit" className="send-button">
        <SendOutlined className="send-icon" />
      </button>
    </form>
  );
};

export default MessageForm;