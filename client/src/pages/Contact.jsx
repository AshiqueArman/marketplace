import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Contact() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const contactUser = async (e) => {
        e.preventDefault();
        const { name, email, message } = data;

        // Basic input validation
        if (!name.trim() || !email.trim() || !message.trim()) {
            toast.error('Please fill in all fields.');
            return;
        }

        // Sanitizing inputs to prevent XSS
        const sanitizedData = {
            name: sanitizeInput(name),
            email: sanitizeInput(email),
            message: sanitizeInput(message),
        };

        try {
            const response = await axios.post('/contact', sanitizedData);

            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                setData({
                    name: '',
                    email: '',
                    message: '',
                });
                toast.success('Message sent successfully!');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred. Please try again later.');
        }
    }

    // Function to sanitize input to prevent XSS
    const sanitizeInput = (input) => {
        return input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    };

    return (
        <div>
            <form onSubmit={contactUser}>
                <div>
                    <label>Name</label>
                    <input type='text' placeholder='Your Name' value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
                </div>

                <div>
                    <label>Email</label>
                    <input type='email' placeholder='Your Email' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                </div>

                <div>
                    <label>Message</label>
                    <textarea rows="4" cols="50" placeholder='Your Message' value={data.message} onChange={(e) => setData({ ...data, message: e.target.value })}></textarea>
                </div>

                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}