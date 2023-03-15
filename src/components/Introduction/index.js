import './index.css';
import {TbStars} from 'react-icons/tb'
import {FcComments} from 'react-icons/fc'
import {GrDocumentUpdate} from 'react-icons/gr'
import {FcLike} from 'react-icons/fc'
import intro from '../../assets/images/intro.webp'

const Introduction = () => {
    return (
        <div className='container-fluid intro'>
            <div className="row">
                <div className="col-12 col-md-12 col-lg-4 p-0">
                    <img src={intro} alt="intro" />
                </div>
                <div className="col-12 col-md-12 col-lg-4 p-0">
                    <h1><b>About Us</b></h1>
                    <p>Welcome to our website, Foodiders! We are a team of home cooks who are passionate about sharing our favorite recipes with others. We believe that cooking should be a fun and rewarding experience, and that everyone can create delicious meals in their own kitchens. Our recipes are inspired by a variety of cuisines and are designed to be simple, flavorful, and easy to follow. Whether you're looking for a quick weeknight dinner or a showstopping dessert, we have something for you. Thank you for visiting our website, and we hope you find inspiration and joy in our recipes. Happy cooking!</p>
                </div>
                <div className="col-12 col-md-12 col-lg-4 p-0">
                    <h1><b>Our Features</b></h1>
                    <ul className='p-0 d-flex align-item-center justify-content-center'>
                        <div className='features'>
                            <li><TbStars style={{color: 'orange'}} size={40}/> Add Rating</li>
                            <li><FcComments size={40}/> Add Review</li>
                            <li><GrDocumentUpdate size={40}/> Update Recipes</li>
                            <li><FcLike style={{color: 'red'}} size={40}/> Add to Favourites</li>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Introduction;