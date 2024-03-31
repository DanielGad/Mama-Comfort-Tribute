import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  onSnapshot,
} from 'firebase/firestore';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../assets/ImageCarousel.css';
import image1 from '../assets/images/m1.png';
import image2 from '../assets/images/25.jpg';
import image3 from '../assets/images/1.jpg';
import image4 from '../assets/images/2.jpg';
import image5 from '../assets/images/3.jpg';
import image6 from '../assets/images/4.jpg';
import image7 from '../assets/images/5.jpg';
import image8 from '../assets/images/6.jpg';

const firebaseConfig = {
  apiKey: "AIzaSyDRLlw_PFraCbmGbIpq5Epq2HFozS35OMo",
  authDomain: "mama-comfort-tribute.firebaseapp.com",
  projectId: "mama-comfort-tribute",
  storageBucket: "mama-comfort-tribute.appspot.com",
  messagingSenderId: "47637660416",
  appId: "1:47637660416:web:6dc4bfaaf2241f1017a9e5",
  measurementId: "G-4TG99XPJTE"
};

initializeApp(firebaseConfig);

const database = getFirestore();
const collectionRef = collection(database, 'tributes');


const TributeBody = () => {

  const [tributes, setTributes] = useState([]);

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

  const images = [image1, image2, image3, image4, image5, image6, image7, image8];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: images.length > 1 ? 3 : 1,
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
  
    const handleImageClick = (image) => {
      setFullscreenImage(image);
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
          {images.map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt={`Image ${index + 1}`} onClick={() => handleImageClick(imageUrl)} />
          ))}
        </Slider>

      </div>
      

      {fullscreenImage && (
        <div className="image-fullscreen" onClick={handleCloseFullscreen}>
          <img src={fullscreenImage} alt="Fullscreen Image" />
          <span className="close-btn" onClick={handleCloseFullscreen}>
            &times;
          </span>
        </div>
      )}

<div className="tributes">
        <h1 style={{textAlign: "center", paddingTop: "20px"}}>Tributes</h1>
        {tributes.map((tribute) => (
          <div className="tri" key={tribute.id}>
            <div className='tri-cover'>
                <img src="m1.png" alt="image"/>
              </div>
            <p>{tribute.body}</p>
              <div className='tri-name'>{tribute.author}</div>
          </div>
        ))}
      </div>
      <div className="copy">&#169; Gadhub All Right Reserved 2024. </div>
    </div>
    
    </>
  )
}

export default TributeBody;