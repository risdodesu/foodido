import './index.css'
import { Button, Modal, Form } from "react-bootstrap";
import { MdOutlineRateReview } from 'react-icons/md'
import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from 'formik'
import axios from 'axios';

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
}

const BASE_URL = process.env.REACT_APP_FOOD_BASEURL;
const API_KEY = process.env.REACT_APP_FOOD_APIKEY;
const JWT_TOKEN = localStorage.getItem('token');

const ReviewModal = (props) => {
    
    let { foodId } = useParams();
    const stars = Array(5).fill(0)
    const [rating, setRating] = useState("");
    const [hover, setHover] = useState(null);

    const addReview = useFormik({
        initialValues: {
          rating: "",
          review: "",
        },
        validationSchema: Yup.object({
          rating: Yup.number(),
          review: Yup.string().required(),
        }),
        onSubmit: (values) => {
          axios({
            method: "post",
            url: `${BASE_URL}/api/v1/rate-food/${foodId}`,
            headers: {
              apiKey: `${API_KEY}`,
              Authorization: `Bearer ${JWT_TOKEN}`,
            },
            data: {
              rating: rating,
              review: values.review,
            },
          })
            .then(() => {
                alert("Thank you, your review has been submitted!");
                window.location.reload();
            })
            .catch((error) => {
              console.log(error);
            });
        },
    });

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        addReview.submitForm();
    };

    return(
        <>
            <Button className='mb-3' variant='success' onClick={handleShow}>
                Add Review <MdOutlineRateReview/>
            </Button>

            <Modal show={show} onHide={handleClose}
                {...props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title>Add Review</Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex align-item-center justify-content-center'>
                        <Form onSubmit={handleReviewSubmit}>                      
                            {stars.map((_, index) => {
                                const ratingValue = index + 1;  
                                return(
                                    <Form.Label key={index}>
                                        <Form.Check
                                            className="detail-review-type"
                                            type="radio"
                                            name="rating"
                                            style={{ display: "none" }}
                                            value={ratingValue}
                                            onClick={() => {
                                                setRating(ratingValue);
                                            }}
                                        />
                                        <FaStar 
                                            size={30}
                                            style={{
                                                marginRight: 10,
                                                cursor: "pointer",
                                            }}
                                            color={ratingValue <= (hover || rating) ? colors.orange : colors.grey}
                                            onMouseEnter={() => {
                                                setHover(ratingValue);
                                            }}
                                            onMouseLeave={() => {
                                                setHover(null);
                                            }}
                                        />
                                    </Form.Label>
                                );
                            })}
                            <Form.Group className="mb-3" controlId="review">
                                <Form.Control
                                    className="detail-review-control"
                                    as="textarea"
                                    placeholder="Leave your review here..."
                                    onBlur={addReview.handleBlur}
                                    onChange={addReview.handleChange}
                                    value={addReview.values.review}
                                />
                            </Form.Group>
                            <div className='d-flex align-item-center justify-content-center'>
                                <Button variant="success" type="submit">
                                    Submit
                                </Button>
                            </div>
                        </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ReviewModal;