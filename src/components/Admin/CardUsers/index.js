import './index.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsEnvelope, BsTelephone, BsPerson } from 'react-icons/bs'
import defaultIcon from '../../../assets/images/default-icon.jpg'


const BASE_URL = process.env.REACT_APP_FOOD_BASEURL;
const API_KEY = process.env.REACT_APP_FOOD_APIKEY;
const JWT_TOKEN = localStorage.getItem('token');

const CardUsers = () => {

    const [data, setData] = useState([])

    const iconDefault = (e) => {
        e.target.src = defaultIcon
    }

    useEffect(() => {
        getData()
    },[]);

    const getData = () => {
        axios({
            method: 'get',
            url: `${BASE_URL}/api/v1/all-user`,
            headers: {
                Authorization: `Bearer ${JWT_TOKEN}`,
                apiKey: `${API_KEY}`,   
            },
        })
        .then(function (response){
            setData(response.data.data);
        });
    
    }
    
    return (
        <div className='foodWrapper container'>
            {data.map((item) => {
                return (
                    <Card style={{ width: '18rem' }} key={item.id}>
                        <div className='imageUsersPosition'>
                            <Card.Img alt={item.name} onError={iconDefault} className='cardImageUsers' variant="top" src={
                                item.profilePictureUrl
                                    ? item.profilePictureUrl
                                    : defaultIcon
                                }
                            />
                        </div>
                            <Card.Body className='cardUsersBody border-bottom'>
                                <Card.Title><b>{item.name}</b></Card.Title>
                                <div className='cardUsersDesc'>
                                    <Card.Text><BsEnvelope/> {item.email}</Card.Text>
                                    <Card.Text><BsTelephone/> {item.phoneNumber}</Card.Text>
                                    <Card.Text><BsPerson/> {item.role}</Card.Text>
                                </div>
                            </Card.Body>
                            <div className='row foodFooter'>
                                <div className='col-12 foodLink'>
                                    <Link className='text-decoration-none' style={{color:'green'}}>Update Role</Link>
                                </div>
                            </div>
                    </Card>
                );
            })}
        </div>
    )
}

export default CardUsers;