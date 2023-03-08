import axios from 'axios';
import { useState, useEffect } from 'react';
import './index.css'
import { Card } from 'react-bootstrap';
import {BsHeartFill, BsStarFill} from 'react-icons/bs'
import { Link } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_FOOD_BASEURL;
const API_KEY = process.env.REACT_APP_FOOD_APIKEY;
const JWT_TOKEN = localStorage.getItem('token');

const FoodCard = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        getData()
    },[]);

    const getData = () => {
        axios({
            method: 'get',
            url: `${BASE_URL}/api/v1/foods`,
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
                        <Card.Img variant="top" src={item.imageUrl}/>
                            <Card.Body className='foodBody border-bottom'>
                                <Card.Title><b>{item.name}</b></Card.Title>
                                <Card.Text className='foodDesc'>{item.description}</Card.Text>
                            </Card.Body>
                            <div className='row foodFooter'>
                                <div className='col-6'>
                                    <div>{item.rating} <BsStarFill color='yellow' size={15}/></div>
                                    <div><BsHeartFill color='red' /> {item.totalLikes} suka </div>
                                </div>
                                <div className='col-6 foodLink'>
                                    <Link className='text-decoration-none' style={{color:'green'}} to = {
                                        {
                                            pathname : `/detail/${item.id}`
                                        }
                                    }>View Detail</Link>
                                </div>
                            </div>
                    </Card>
                );
            })}
        </div>
    )
}

export default FoodCard;