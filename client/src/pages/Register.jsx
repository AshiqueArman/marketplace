import {useState} from "react";
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useNavigate } from "react-router-dom";


export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email:'',
    password:'',
  })  

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;

    // Password validation (password requirements for more robust security)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
        toast.error('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one special character (!@#$%^&*)');
        return;
    }

    try {
        const { data } = await axios.post('/register', {
            name, email, password
        });

        if (data.error) {
            toast.error(data.error)
        } else {
            setData({});
            toast.success('Registration Successful!');
            navigate('/login');
        }
    } catch (error) {
        console.log(error);
    }
}

  
    return (
    <div>
        <form onSubmit={registerUser}>
            <label>Name</label>
            <input type='text' placeholder='Enter name' value={data.name} onChange={(e) => setData({...data, name: e.target.value})}/>

            <label>Email</label>
            <input type='email' placeholder='Enter email address' value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>

            <label>Password</label>
            <input type='password' placeholder='Enter passowrd' value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
        
            <button type='submit'>Submit</button>

        </form>
    </div>
  )
}
