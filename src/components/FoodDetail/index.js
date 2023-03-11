import './index.css'
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {BsHeartFill, BsStarFill} from 'react-icons/bs'
import {MdOutlineRateReview} from 'react-icons/md'
import { Button } from 'react-bootstrap';

const BASE_URL = process.env.REACT_APP_FOOD_BASEURL;
const API_KEY = process.env.REACT_APP_FOOD_APIKEY;
const JWT_TOKEN = localStorage.getItem("token")

const FoodDetail = () => {

    let { foodId } = useParams();
    const [food, setFood] = useState("");

    useEffect(() => {
        axios({
          method: "get",
          url: `${BASE_URL}/api/v1/foods/${foodId}`,
          headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
            apiKey: `${API_KEY}`,
          },
        })
          .then((response) => {
            setFood(response.data.data);
          })
          .catch((error) => {
            console.log(error);
          });
    }, [foodId]);

    return (
        <div className='detail container'>
            <div className='row'>
                <div className='col-lg-6 leftDetail'>
                    <img src={food.imageUrl} alt="food-img" />
                </div>
                <div className='col-lg-6 rightDetail'>
                    <h1 className='border-bottom'><b>{food.name}</b></h1>
                    <p><b>Description : </b>"{food.description}"</p>
                    <p><b>Ingredients : </b>
                        {food && food.ingredients.map((a, index) => {
                            return(
                                <span key={index}>{(index ? ", " : "") + a}</span>
                            )
                        })}
                    </p>
                    <div className='row rightFooter'>
                        <div className='col-6 col-md-6 col-lg-6'>Created at : {food.createdAt}</div>
                        <div className='col-6 col-md-6 col-lg-6'>Updated at : {food.updatedAt}</div>
                    </div>
                    {localStorage.getItem("role") === "user" ? (
                    <div className='row mt-3 mb-3'>
                        <div className='col-6 col-md-6 col-lg-6'><BsHeartFill size={25} 
                        style={{
                            color: `${food.isLike ? "red" : "grey"}`,
                        }}
                        /> {food.totalLikes} suka</div>
                        <div className='col-6 col-md-6 col-lg-6'>{food.rating} <BsStarFill color='yellow' size={25} /></div>
                    <div className='ratingBtn'>
                        <Button className='mb-3' variant='success'>
                            Rate this <MdOutlineRateReview/>
                        </Button>
                    </div>
                    </div>
                    ) : <>
                            <div className='row mt-3 mb-3'>
                                <div className='col-6 col-md-6 col-lg-6'><BsHeartFill color='red' 
                                size={25} 
                                /> {food.totalLikes} suka</div>
                                <div className='col-6 col-md-6 col-lg-6'>{food.rating} <BsStarFill color='yellow' size={25} /></div>
                                <div className='ratingBtn'></div>
                            </div>
                        </> 
                    }
                    <h1 className='border-bottom'><b>Review</b></h1>
                    <div className='foodReview'>
                        ini review
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FoodDetail;