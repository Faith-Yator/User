import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './SignIn.css';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const schema = yup.object().shape({
    UserName: yup.string().required('UserName is required!!'),
    Password: yup.string().required('Password is required!!'),
    Roles: yup.string().required('Roles is required!!'),
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const Navigate = useNavigate();

  const onSubmit = (data) => {
    Axios.post('https://backendkyu.azurewebsites.net/auth/Login', data)
      .then((response) => {
        console.log(response.data);
        reset();
        alert('Logged in Successfully');
        Navigate("/");
      })
      
      .catch((error) => {
        alert("Invalid details or user not registered");
        Navigate('/register');
        console.error(error);
      });
    console.log(data);
  };

  return (
    <div className='formsignin'>
      <h1>Login</h1>
      <form className="signin-form" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" name="userName" placeholder="UserName" {...register('UserName')} />
        <span className="error">{errors.UserName?.message}</span>
        <input type="password" name="password" placeholder="Password" {...register('Password')} />
        <span className="error">{errors.Password?.message}</span>
        <input type="text" name="roles" placeholder="Roles" {...register('Roles')} />
        <span className="error">{errors.Roles?.message}</span>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignIn;
