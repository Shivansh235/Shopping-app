import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {

      const res = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok && result.token) {
        localStorage.setItem('token', result.token);
        navigate('/products');
      } 
      else {
        alert('Invalid username or password.');
      }
    }


  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Username"
          {...register('username', { required: {value:true , message:"This field is required"} })}
        />
        {errors.username && <span className="error">{errors.username.message}</span>}

        <input
          type="password"
          placeholder="Password"
          {...register('password', { required: {value:true , message:"This field is required"} })}
        />
        {errors.password && <span className="error">{errors.password.message}</span>}

        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;


