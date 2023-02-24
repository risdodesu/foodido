import './index.css'
import {BsInstagram, BsTwitter, BsFacebook, BsYoutube, BsEnvelope, BsTelephone} from 'react-icons/bs'

const Footer = () => {
    return (
        <div className='footer container-fluid'>
            <div className='row'>
                <div className='col-12 col-md-6 col-lg-6'>
                    <h3 className='mb-3'>Contact Us</h3>
                    <ul className='contact'>
                        <li><BsEnvelope style={{color: 'white'}} size={20}/> foodido@gmail.com</li>
                        <li><BsTelephone style={{color: 'white'}} size={20}/> +62-8123-4567-890</li>
                    </ul>
                </div>
                <div className='col-12 col-md-6 col-lg-6'>
                    <h3 className='mb-3'>Follow Us</h3>
                    <ul className='follow'>
                        <li><BsInstagram style={{color: 'white'}} size={20}/> @foodido</li>
                        <li><BsTwitter style={{color: 'white'}} size={20}/> @foodido</li>
                        <li><BsFacebook style={{color: 'white'}} size={20}/> Foodido</li>
                        <li><BsYoutube style={{color: 'white'}} size={20}/> Foodido</li>
                    </ul>
                </div>
            </div>
            <div className='row mt-5 d-flex align-item-center justify-content-center text-center'>Copyright &copy; 2023 by Risdo Lihardo Saragih. All Rights Reserved.</div>
        </div>
    )
}
export default Footer;