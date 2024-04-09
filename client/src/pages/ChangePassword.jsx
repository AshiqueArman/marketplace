import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const changePassword = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwords;

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const { data } = await axios.post('/change-password', {
        currentPassword,
        newPassword,
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        setPasswords({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        toast.success('Password changed successfully!');
        navigate('/dashboard');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogout = () => {
    window.location.href = "http://localhost:5173";
  }

  const handleCancel = () => {
    navigate('/buy');
  }

  return (
    <div>
      <button style={{ position: 'absolute', top: 10, right: 10 }} onClick={handleLogout}>Logout</button>
      <form onSubmit={changePassword}>
        <label>Current Password</label>
        <input
          type='password'
          placeholder='Enter current password'
          value={passwords.currentPassword}
          onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
        />

        <label>New Password</label>
        <input
          type='password'
          placeholder='Enter new password'
          value={passwords.newPassword}
          onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
        />

        <label>Confirm Password</label>
        <input
          type='password'
          placeholder='Confirm new password'
          value={passwords.confirmPassword}
          onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
        />

        <button type='submit'>Change Password</button>
      </form>
      <button style={{ position: 'absolute', left: '50%', bottom: 20, transform: 'translateX(-50%)' }} onClick={handleCancel}>Cancel</button>
    </div>
  )
}
