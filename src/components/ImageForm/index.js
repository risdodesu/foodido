import React, { useState} from 'react';
import axios from 'axios';
import "./index.css";

const BASE_URL = process.env.REACT_APP_FOOD_BASEURL
const API_KEY = process.env.REACT_APP_FOOD_APIKEY
const JWT_TOKEN = localStorage.getItem("token")

const ImageForm = ({onChange}) => {
  const [image, setImage] = useState("")

  const handleChange = (e) => {
    setImage(e.target.files[0]);
  }

  const handleApi = () => {
    const url = `${BASE_URL}/api/v1/upload-image`;
    const formData = new FormData();
    formData.append("image", image);
    const headersApi = {
      headers: {
        apiKey: `${API_KEY}`,
        Authorization: `Bearer ${JWT_TOKEN}`,
        "Content-Type": "multipart/form-data",
      },
    };

    axios.post(url, formData, headersApi).then((response) => {
      onChange(response.data.url);
      alert(`${response.data.message}`);
    }).catch((error) => {
      console.log(error);
      alert("Format is not allow!");
    })
  }

  return (
    <>
        <div className="d-flex">
        <input
            className="form-control file-upload"
            type="file"
            onChange={handleChange}
            accepts="image/png, image/webp, image/jpeg"
        />
        <button
            onClick={handleApi}
            className="btn btn-success btn-upload"
            encType="multipart/form-data"
            type="button"
        >
            <i className="ri-upload-2-line">Upload</i>
        </button>
        </div>
    </>
  );
}

export default ImageForm;