import { useState } from "react";
import axios from 'axios';
import {toast} from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';

export default function Contact (){
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        email: '',
        message: '',
    })

    const contactUser =  async (e) => {
        e.preventDefault();
        const {name, email, message} = data;

        try{
            const {data} = await axios.post('/contact', {
                name, email, message
            });
        
            if(data.error){
                toast.error(data.error);
            }else{
                setData({
                    name: '',
                    email: '',
                    message: '',
                });
                toast.success('Message sent successfully!');
            }
        }catch(error){
            console.log(error);
        }
    }

    return(
        <div>
            <form onSubmit={contactUser}>
                <label>Name</label>
                <input type='text' placeholder='Your Name' value={data.name} onChange={(e) => setData({...data, name: e.target.value})} />

                <label>Email</label>
                <input type='email' placeholder='Your Email' value={data.email} onChange={(e) => setData({...data, email: e.target.value})} />

                <label>Message</label>
                <input type='text' placeholder='Your Message' value={data.message} onChange={(e) => setData({...data, message: e.target.value})} />

                <button type='submit'>Submit</button>
            
            </form>

        </div>
    )

}