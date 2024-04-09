import {useState} from "react";
import axios from 'axios';
import {toast} from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();  
  const [data, setData] = useState({
    email: '',
    password:'',
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const {email, password} = data;

    try {
      // Sanitize user input
      const sanitizedEmail = sanitizeInput(email);
      const sanitizedPassword = sanitizeInput(password);

      const {data} = await axios.post('/login', {
        email: sanitizedEmail,
        password: sanitizedPassword
      });

      if(data.error){
        toast.error(data.error);
      } else {
        setData({
          email: '',
          password: ''
        });
        navigate('/buy');
      }
    } catch(error) {
      // Handle error
      console.error("Login error:", error);
    }
  }

  // Function to sanitize input to prevent XSS
  const sanitizeInput = (input) => {
    // Replacing "<" with "&lt;" and ">" with "&gt;"
    return input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };

  return (
    <div>
      <form onSubmit={loginUser}>
        <label>Email</label>
        <input type='email' placeholder='Enter email address' value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>

        <label>Password</label>
        <input type='password' placeholder='Enter password' value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>

        <button type='submit'>Login</button>
      </form>
    </div>
  )
}
