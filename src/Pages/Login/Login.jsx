// Login.js
import React, { useState } from 'react';
import { loginApi } from '../../Api/loginapi';
import { Logo } from '../../Constant/ImageConstant';
import './Login.css'; // Import your CSS for styling
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storeDataLocalStorage } from '../../Util/LocalStorage';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    const errors = {};
    if (!formData.email) {
      errors.email = 'Email is required';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    }
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      // Handle form submission, e.g., send data to server

     const res = await  loginApi(formData.email,formData.password)

     if(res?.status){
      storeDataLocalStorage('claim_loginDashboard',res)
      toast.success(res?.message, {
        position: "bottom-right",
        autoClose: 3000,
        theme:'colored',
  
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });


      window.location.reload();




     }else{
      toast.error(res?.message, {
        position: "bottom-right",
        autoClose: 3000,
        theme:'colored',
  
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });


     }


    }
  };

  return (
    <div className='container1'>
      
    <div className="login-container">
      <div className="logo">
        <img src={Logo} alt="Logo" style={{width:'235px'}} />
      </div>
      <h2>Login</h2>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="loginerror">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="loginerror">{errors.password}</span>}
        </div>
      <button onClick={handleSubmit} type="submit">Submit</button>

    </div>
    </div> 

  );
};

export default Login;
