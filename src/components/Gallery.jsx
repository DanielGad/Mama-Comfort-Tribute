import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { GalleryContext } from './GalleryContext';
import '../assets/gallery.css';

import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
const database = getFirestore();
const collectionRef = collection(database, 'tributes-info');

// eslint-disable-next-line react/prop-types
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
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevImages = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const startIndex = currentPage * 6;
  const endIndex = startIndex + 6;

  return (
    <>
    <Link to={"/add-gallery"}><button className={`add-image ${isClicked ? 'clicked' : ''}`} onClick={togglePopdown}>Add Photo</button></Link>
    {
      Data.img && <div className="preview" onClick={() => imgAction()}>
        <span className=" close-btn close" onClick={() => imgAction()}>&times;</span>
        {/* <span className="prev" onClick={() => imgAction('prev-img')}>&lt;</span> */}
        <img src={Data.img} alt="Image" />
        {/* <span className="next" onClick={() => imgAction('next-img')}>&gt;</span> */}
      </div>
    }
      <div className="gallery-container">
      <div className="headd">Gallery</div>
      <div className="image-gallery">
            <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
              >
                <Masonry gutter="20px">
                    {galleryDetails.slice(startIndex, endIndex).map((details) => (
                      <div key={details.id}>
                        <img
                            src={details.imgUrl}
                            style={{width: "100%", display: "block", cursor: "pointer", border: "5px solid rgb(31, 26, 44)", borderRadius: "20px"}}
                            alt=""
                            onClick={() => viewImage(details.imgUrl, details.i)}
                        />  
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
