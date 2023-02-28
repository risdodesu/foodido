import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './index.css'
import { Form, Container } from 'react-bootstrap';
import {BsEnvelope, BsLock} from 'react-icons/bs'

const errorStyle = {color:"red", height:"25px"}

const LoginForm = () => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
        password: Yup.string()
            .max(127, 'Must be 127 characters or less')
            .required('Required'),
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className='wrapper'>
        <Container className='main'>
            <div className='row'>
                <div className="col-md-6 side-image">
                    <div className='text'>
                        <p>We're sure to give you what you deserve. <i>-Foodido</i></p>
                    </div>
                </div>

                <div className='col-md-6 right'>
                    <form onSubmit={formik.handleSubmit}>
                    <header>Login</header>
                    <label htmlFor="email">Email <BsEnvelope/></label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        autoComplete="off"
                        placeholder='Enter your email here'
                    />
                    <Form.Text>
                        <div style={errorStyle}>{formik.errors.email && formik.errors.email}</div>
                    </Form.Text>
                    
                    <label htmlFor="password">Password <BsLock/></label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        placeholder='Enter your password here'
                    />
                    <Form.Text>
                        <div style={errorStyle}>{formik.errors.password && formik.errors.password}</div>
                    </Form.Text>
                    
                    <button className='submit container' type="submit">Login</button>
                    <div className='register'>
                        <span>Don't have an account? <a href="/register">Register here</a></span>
                    </div>
                    </form>
                </div>
            </div>
        </Container>
    </div>
  );
};

export default LoginForm;