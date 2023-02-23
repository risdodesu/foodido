import './index.css';
import intro from '../../assets/images/intro.webp'

const Introduction = () => {
    return (
        <div className='container-fluid intro'>
            <div className="row">
                <div className="col-12 col-md-12 col-lg-4 p-0">
                    <img src={intro} alt="intro" />
                </div>
                <div className="col-12 col-md-12 col-lg-4 p-0">
                    <h1><u>About Us</u></h1>
                    <p>Welcome to our website, Foodiders! We are a team of home cooks who are passionate about sharing our favorite recipes with others. We believe that cooking should be a fun and rewarding experience, and that everyone can create delicious meals in their own kitchens. Our recipes are inspired by a variety of cuisines and are designed to be simple, flavorful, and easy to follow. Whether you're looking for a quick weeknight dinner or a showstopping dessert, we have something for you. Thank you for visiting our website, and we hope you find inspiration and joy in our recipes. Happy cooking!</p>
                </div>
                <div className="col-12 col-md-12 col-lg-4 p-0">
                    <h1><u>Our Features</u></h1>
                    <ul>
                        <li>Fitur 1</li>
                        <li>Fitur 2</li>
                        <li>Fitur 3</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Introduction;