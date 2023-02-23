import img1 from '../../assets/images/carousel1.webp'
import img2 from '../../assets/images/carousel2.webp'
import img3 from '../../assets/images/carousel3.webp'
import Carousel from 'react-bootstrap/Carousel'
import './index.css'

const Banner = () => {
  return (
    <>
      <Carousel fade>
        <Carousel.Item>
            <img
              className='banner-carousel'
              src={img1}
              alt="banner1"
            />
          <Carousel.Caption style={{left:"0%",right:"0%",bottom:"0%"}} className="banner-caption">
              <h1 className='banner-title'>“Cooking is like love. It should be entered into with abandon or not at all.”</h1>
              <p className="banner-paragraph">-Harriet Van Horne-</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
              className='banner-carousel'
              src={img2}
              alt="banner2"
            />
          <Carousel.Caption style={{left:"0%",right:"0%",bottom:"0%"}} className="banner-caption">
              <h1 className='banner-title'>“Cooking is about imbibing different cultures and putting them in a plate on the table.”</h1>
              <p className="banner-paragraph">-Johnny Iuzzini-</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
              className='banner-carousel'
              src={img3}
              alt="banner1"
            />
          <Carousel.Caption style={{left:"0%",right:"0%",bottom:"0%"}} className="banner-caption">
              <h1 className='banner-title'>“If you think well, you cook well.”</h1>
              <p className="banner-paragraph">-Ferran Adria-</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default Banner;