import { useState } from 'react';
import axios from 'axios';

const projectID = '0652bd9e-77f2-471a-8248-e5f253c31291';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents default behaviour of browser getting refresh
   
    
   

    const authObject = { 'Project-ID': "0652bd9e-77f2-471a-8248-e5f253c31291", 'User-Name': username, 'User-Secret': password };

    try {
         // username / password => chatengine will give messages
      await axios.get('https://api.chatengine.io/chats', { headers: authObject });

        //works out => logged in
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);

      window.location.reload();
      setError('');
    } 
     // else error => try with new credentials
    catch (err) {
      setError('Oops, incorrect credentials.');
    }
  };

  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">Chat Application</h1>
        <form onSubmit={handleSubmit}>
            
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required /> 
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
          <div align="center">
            <button type="submit" className="button">
              <span>Start chatting</span>
            </button>
          </div>
        <h2 className = "error">{error}</h2>
        </form>
      </div>
    </div>

  );
};

export default LoginForm;