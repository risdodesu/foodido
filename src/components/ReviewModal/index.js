import './index.css'
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import { MdOutlineRateReview } from 'react-icons/md'
import React, { useState } from 'react';
import { FaStar } from "react-icons/fa"

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
}

const ReviewModal = (props) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const stars = Array(5).fill(0)
    const [currentStar, setStar] = useState(0);
    const [hover, setHover] = useState(undefined);

    const handleClick = value => {
        setStar(value)
    };

    const handleHover = value => {
        setHover(value)
    };

    const handleMouseLeave = () => {
        setHover(undefined)
    };

    return(
        <>
            <Button className='mb-3' variant='success' onClick={handleShow}>
                Add Review <MdOutlineRateReview/>
            </Button>

            <Modal show={show} onHide={handleClose}
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex align-item-center justify-content-center'>
                        {stars.map((_, index) => {
                            return(
                                <FaStar 
                                    key={index}
                                    size={30}
                                    style={{
                                        marginRight: 10,
                                        cursor: "pointer"
                                    }}
                                    color={(hover || currentStar) > index ? colors.orange : colors.grey}
                                    onClick={() => handleClick(index+1)}
                                    onMouseOver={() => handleHover(index + 1)}
                                    onMouseLeave={handleMouseLeave}
                                />
                            )
                        })}
                    </div>
                    <div className='d-flex align-item-center justify-content-center mt-3'>
                        <textarea
                            placeholder='Leave your review here...'
                            style={{
                                width: 500,
                                padding: 10,
                                borderRadius: 10,
                                minHeight: 200
                            }}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleClose}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ReviewModal;