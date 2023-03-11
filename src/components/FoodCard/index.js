import axios from 'axios';
import { useState, useEffect } from 'react';
import './index.css'
import { Card, Button } from 'react-bootstrap';
import {BsHeartFill, BsStarFill, BsTrash, BsPencil} from 'react-icons/bs'
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

    const handleLike = (id, isLike) => {
        if (!isLike) {
          axios({
            method: "post",
            url: `${BASE_URL}/api/v1/like`,
            data: {
              foodId: id,
            },
            headers: {
              Authorization: `Bearer ${JWT_TOKEN}`,
              apiKey: `${API_KEY}`,
            },
          })
            .then((response) => {
              getData();
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          axios({
            method: "post",
            url: `${BASE_URL}/api/v1/unlike`,
            data: {
              foodId: id,
            },
            headers: {
              Authorization: `Bearer ${JWT_TOKEN}`,
              apiKey: `${API_KEY}`,
            },
          })
            .then((response) => {
              getData();
            })
            .catch((error) => {
              console.log(error);
            });
        }
    };
    
    return (
        <div className='foodWrapper container'>
            {data.map((item) => {
                return (
                    <Card style={{ width: '18rem' }} key={item.id}>
                        <Card.Img className='cardImage' variant="top" src={item.imageUrl}/>
                            <Card.Body className='foodBody border-bottom'>
                                <Card.Title><b>{item.name}</b></Card.Title>
                                <Card.Text className='foodDesc'>{item.description}</Card.Text>
                            </Card.Body>
                            <div className='row foodFooter'>
                                {localStorage.getItem("role") === "user" ? (
                                  <>
                                    <div className='col-6'>
                                        <div>{item.rating} <BsStarFill color='yellow' size={15}/></div>
                                        <div><BsHeartFill style={{
                                                color: `${item.isLike ? "red" : "grey"}`,
                                                cursor: "pointer"
                                            }} 
                                            onClick={() => handleLike(item.id, item.isLike)}
                                            /> {item.totalLikes} suka</div>
                                    </div>
                                    <div className='col-6 foodLink'>
                                        <Link className='text-decoration-none' style={{color:'green'}} to = {
                                            {
                                                pathname : `/detail/${item.id}`
                                            }
                                        }>View Detail</Link>
                                    </div>
                                  </>
                                  ) : <>
                                        <div className='col-6 foodLink'>
                                            <Link className='text-decoration-none' style={{color:'green'}} to = {
                                                {
                                                    pathname : `/detail/${item.id}`
                                                }
                                            }>View Detail</Link>
                                        </div>
                                        <div className='col-6 foodLink'>
                                            <Button variant='danger'><BsTrash/></Button>
                                            <Button variant='success'><BsPencil/></Button>
                                        </div>
                                      </>
                                }
                            </div>
                    </Card>
                );
            })}
        </div>
    )
}

export default FoodCard;