import { ChatEngine } from "react-chat-engine";
import ChatFeed from "./components/ChatFeed";
import './App.css';
import LoginForm from "./components/LoginForm";

const App = () => {
    if(!localStorage.getItem('username')) return <LoginForm />

    return (
        <ChatEngine
            height = "100vh"
            projectID = "0652bd9e-77f2-471a-8248-e5f253c31291"
            userName = {localStorage.getItem('username')}
            userSecret = {localStorage.getItem('password')}
            renderChatFeed = {(chatAppProps) => <ChatFeed {...chatAppProps} />}
         />
    );
}
export default App;