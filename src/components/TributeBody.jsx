import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GalleryContext } from './GalleryContext';
import {
  getFirestore,
  collection,
  onSnapshot,
} from 'firebase/firestore';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../assets/ImageCarousel.css';

const database = getFirestore();
const collectionRef = collection(database, 'Tribute');

const collectionReff = collection(database, 'tributes-info')

const TributeBody = () => {
  const { imageUrls } = useContext(GalleryContext);

  const [tributes, setTributes] = useState([]);
  const [tributesImg, setTributesImg] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const updatedTributes = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTributes(updatedTributes);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collectionReff, (snapshot) => {
      const updatedTributesImg = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTributesImg(updatedTributesImg);
    });

    return () => unsubscribe();
  }, []);

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: imageUrls.length > 1 ? 3 : 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

    const [fullscreenImage, setFullscreenImage] = useState(null);
  
    const handleImageClick = (image, text) => {
      setFullscreenImage({ image, text });
    };
  
    const handleCloseFullscreen = () => {
      setFullscreenImage(null);
    };


  return (
    <>
    <div className="Tribute">
      <div className="tribute-body">
        <div className="top">
          <h1>Celebration of Life</h1>
          <img src="/Mama Comfort Oyeteju.png" alt="Mama Comfort Image" width={'400px'} />
          <div className="name">
            <div className="name1">MAMA</div>
            <div className="name2">COMFORT OYETEJU</div>
            <div className="name3" style={{ fontSize: '60px', marginTop: '-15px', color: 'rgb(255, 255, 121)' }}>
              OLAJIDE
            </div>
            <div>1923 - 2024</div>
          </div>
          <div className="age">
            <div>Aged</div>
            <div style={{ fontSize: '30px', fontWeight: '900' }}>101</div>
            <div>Years</div>
          </div>
        </div>
      </div>

      <div className='carousel'>
        <h1>PHOTO SPEAKS</h1>
        <Slider {...settings}>
          {tributesImg.slice(0, 4).map((pics, index) => (
            <div key={index}>
              <img src={pics.imgUrl} alt={`Image ${index + 1}`} onClick={() => handleImageClick(pics.imgUrl, pics.info)} />
              <p>{pics.info}</p>
            </div>
          ))}
        </Slider>
        <Link to="/gallery"><button className='link-button'>View More Photos</button></Link>

      </div>
      

          {fullscreenImage && (
      <div className="image-fullscreen" onClick={handleCloseFullscreen}>
        <img src={fullscreenImage.image} alt="Fullscreen Image" />
        <br />
        <p>{fullscreenImage.text}</p>
        <span className="close-btn" onClick={handleCloseFullscreen}>
          &times;
        </span>
      </div>
        )} 

<div className="tributes">
        <h1 style={{textAlign: "center", paddingTop: "20px"}}>Tributes</h1>
        {tributes.slice(0, 3).map((tribute) => (
          <div className="tri" key={tribute.id}>
            <div className='tri-cover'>
                  <img src={tribute.imgUrl}alt="" />  
              </div>
            <div className='tri-body'>{tribute.body}</div>
              <div className='tri-name'>{tribute.author} ({tribute.relationship})</div>
          </div>
        ))}
        <Link to={"/tributes"}><button className='link-button'>View More Tributes</button></Link>
      </div>
      <div className="copy">&#169; Gadhub All Right Reserved 2024. </div>
    </div>
    
    </>
  )
}

export default TributeBody;