import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './index.css'
import { Form, Container } from 'react-bootstrap';
import {BsEnvelope, BsLock, BsPencilSquare, BsPerson, BsPersonCircle, BsTelephone} from 'react-icons/bs'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ImageForm from '../../components/ImageForm'


const BASE_URL = process.env.REACT_APP_FOOD_BASEURL;
const API_KEY = process.env.REACT_APP_FOOD_APIKEY;

const errorStyle = {color:"red", height:"25px"}

const RegisterForm = () => {
    
    const [uploadImage, setUploadImage] = useState("");

    const navigate = useNavigate();
    // Logic ketika sudah terdapat token, maka tidak bisa masuk ke halaman login
    useEffect(()=>{
        if(localStorage.getItem('token')){
            navigate('/')
        }
    }, [navigate])

  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            passwordRepeat: '',
            role: '',
            phoneNumber: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string()
                .min(6, 'Minimal 6 characters')
                .max(127, 'Must be 127 characters or less')
                .required('Required'),
            passwordRepeat: Yup.string()
                .required('Required')
                .oneOf([Yup.ref('password'), null], 'Password must match'),
            role: Yup.string().oneOf(["user", "admin"]).required("Required"),
            phoneNumber: Yup.string()
            .matches(/^[0-9]{10,14}$/, "Phone number is not valid")
            .required("Required"),
        }),
    
        onSubmit: (values) => {

            axios({
                method: 'post',
                url: `${BASE_URL}/api/v1/register`,
                headers: {
                    apiKey: `${API_KEY}`
                },
                data: {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    passwordRepeat: values.passwordRepeat,
                    role: values.role,
                    profilePictureUrl: uploadImage,
                    phoneNumber: values.phoneNumber,
                },
            })
            .then((response) => {
                console.log(response);
                alert("Registration success!");
                window.location.reload();
              })
              .catch((error) => {
                console.log(error);
                alert("Registration failed. Please try again!");
              });
          },
        });

  return (
    <div className='wrapper'>
        <Container className='main'>
            <div className='row'>
                <div className="col-md-6 side-image"/>
                <div className='col-md-6 rightReg'>
                    <form onSubmit={formik.handleSubmit}>
                    <header>Register</header>
                        <div className='registerForm'>
                            <label htmlFor="name">Name <BsPencilSquare/></label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                placeholder='Enter your name here'
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <Form.Text>
                                    <div style={errorStyle}>{formik.errors.name}</div>
                                </Form.Text>
                            ) : null}

                            <label htmlFor="email">Email <BsEnvelope/></label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                placeholder='Enter your email here'
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <Form.Text>
                                    <div style={errorStyle}>{formik.errors.email}</div>
                                </Form.Text>
                            ) : null}
                            
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
                            {formik.touched.password && formik.errors.password ? (
                                <Form.Text>
                                    <div style={errorStyle}>{formik.errors.password}</div>
                                </Form.Text>
                            ) : null}
                            
                            <label htmlFor="passwordRepeat">Confirm Password <BsLock/></label>
                            <input
                                id="passwordRepeat"
                                name="passwordRepeat"
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.passwordRepeat}
                                placeholder='Enter your password here'
                            />
                            {formik.touched.passwordRepeat && formik.errors.passwordRepeat ? (
                                <Form.Text>
                                    <div style={errorStyle}>{formik.errors.passwordRepeat}</div>
                                </Form.Text>
                            ) : null}

                            <label htmlFor="password">Select Role <BsPerson/></label>                  
                            <select
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.role}
                                component="select"
                                id="role"
                                name="role"
                                multiple={false}
                                className="form-select fs-12px"
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                
                            <label htmlFor="profile">Profile Picture <BsPersonCircle/></label>
                            <ImageForm onChange={(value) => setUploadImage(value)} />

                            <label htmlFor="phoneNumber">Phone Number <BsTelephone/></label>
                            <input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phoneNumber}
                                autoComplete="off"
                                placeholder='Enter your number here'
                            />
                            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                                <Form.Text>
                                    <div style={errorStyle}>{formik.errors.phoneNumber}</div>
                                </Form.Text>
                            ) : null}
                            
                        </div>
                            <button className='submit container' value="RegisterForm" type="submit">Register</button>
                            <div className='login'>
                                <span>Already have an account? <a href="/login">Login here</a></span>
                            </div>
                    </form>
                </div>
            </div>
        </Container>
    </div>
  );
};

export default RegisterForm;