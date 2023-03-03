import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './index.css'
import { Form, Container } from 'react-bootstrap';
import {BsEnvelope, BsLock, BsPencilSquare, BsPerson, BsPersonCircle, BsTelephone} from 'react-icons/bs'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ImageForm from "../../components/ImageForm";

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
            // profilePictureUrl: '',
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
            role: Yup.string(),
            profilePictureUrl: Yup.string()
                .required('Required'),
            phoneNumber: Yup.string()
            .matches(/^[0-9]{10,14}$/, "Phone number is not valid")
            .required("Required"),
        }),
    
        onSubmit: (values) => {

            axios({
                method: 'post',
                url: `${BASE_URL}/api/v1/login`,
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
            .then(function (response){
                const token = response.data.token;
                const username = response.data.user.name;
                const role = response.data.user.role;
                
                localStorage.setItem('token', token);
                localStorage.setItem('username', username);
                localStorage.setItem('role', role);
                
                window.location.assign('/')
            })
            .catch(function(error){
                alert(error.message);
            })
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
                                autoComplete="off"
                                placeholder='Enter your name here'
                            />
                            <Form.Text>
                                <div style={errorStyle}>{formik.errors.name && formik.errors.name}</div>
                            </Form.Text>

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
                            <Form.Text>
                                <div style={errorStyle}>{formik.errors.passwordRepeat && formik.errors.passwordRepeat}</div>
                            </Form.Text>

                            <label htmlFor="password">Select Role <BsPerson/></label>
                            <Form.Select className='mb-3' aria-label="Default select example">
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </Form.Select>
                
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
                            <Form.Text>
                                <div style={errorStyle}>{formik.errors.phoneNumber && formik.errors.phoneNumber}</div>
                            </Form.Text>

                        </div>
                            <button className='submit container' type="submit">Register</button>
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