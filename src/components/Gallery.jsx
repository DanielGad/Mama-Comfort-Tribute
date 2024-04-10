import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { GalleryContext } from './GalleryContext';
import '../assets/gallery.css';
import ProgressiveImg from './ProgressiveImg';

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ScrollToTop from './ScrollToTop';
import Default from "/istock.jpg";
const database = getFirestore();
const collectionRef = collection(database, 'tributes-info');

const Gallery = () => {
  const { isClicked, Data, viewImage, imgAction, togglePopdown } = useContext(GalleryContext);

  const [galleryDetails, setGalleryDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchGalleryDetails = async () => {
      const querySnapshot = await getDocs(collectionRef);
      const details = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGalleryDetails(details);
    };
    fetchGalleryDetails();
  }, []);

  const nextImages = () => {
    window.scrollTo(0, 0);
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevImages = () => {
    window.scrollTo(0, 0);
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const startIndex = currentPage * 6;
  const endIndex = startIndex + 6;

  return (
    <>
    <ScrollToTop />
      <Link to={"/add-gallery"}>
        <button className={`add-image ${isClicked ? 'clicked' : ''}`} onClick={togglePopdown}>Add Photo</button>
      </Link>
      {
      Data.img && <div className="preview" onClick={() => imgAction()}>
        <span className=" close-btn close" onClick={() => imgAction()}>&times;</span>
        {/* <span className="prev" onClick={() => imgAction('prev-img')}>&lt;</span> */}
        <div className='preview-img'>
        <img src={Data.img} alt="Image" />
        <div className='preview-info'>{Data.info}</div>
        </div>
        {/* <span className="next" onClick={() => imgAction('next-img')}>&gt;</span> */}
      </div>
    }
      <div className="gallery-container">
        <div className="headd">Gallery</div>
        <div className="image-gallery">
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          >
            <Masonry gutter="20px">
              {galleryDetails.slice(startIndex, endIndex).map((details) => (
                <div key={details.id}> 
                  <ProgressiveImg placeholderSrc={Default} src={details.imgUrl} alt="" 
                  onClick={() => viewImage(details.imgUrl, details.info, details.i)}/>
                  <p>{details.info}</p>
                </div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </div>
      <div className='navi'>
        <button className='link-button' onClick={prevImages} disabled={currentPage === 0}>Previous</button>
        <button className='link-button' onClick={nextImages} disabled={endIndex >= galleryDetails.length}>Next</button>
      </div>
    </>
  );
};

export default Gallery;
