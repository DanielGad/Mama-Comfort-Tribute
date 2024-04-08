import { useContext, useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { GalleryContext } from './GalleryContext';
import '../assets/gallery.css';

import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
const database = getFirestore();
const collectionRef = collection(database, 'tributes-info');

// eslint-disable-next-line react/prop-types
const Gallery = ({onSubmitted}) => {
  const { uploadMessage, imagePreview, uploading, isClicked, isClickedd, Data, isOpen, handleImageUpload, uploadFile, viewImage, imgAction, togglePopdown, togglePopup, photoDetails, setPhotoDetails } = useContext(GalleryContext);

  const [galleryDetails, setGalleryDetails] = useState([]);



  const addGallery = (info, imgUrl) => {
    return addDoc(collectionRef, {info, imgUrl})
  };

  const handleSubmit = async (e) => {
    const confirmed = window.confirm('Are you sure you want to upload this photo?');
    if (!confirmed) {
      return;
    }
    e.preventDefault();
  
    const info = photoDetails;
    if (info === '') {
      alert('Pls provide the detail about the photo.')
      return;
    }
    const imgUrl = await uploadFile();
  
    if (imgUrl) {
      try {
        await addGallery(info, imgUrl);
        alert('Photo Uploaded Successfully!');
        onSubmitted();
      } catch (error) {
        console.error('Error uploading Photo: ', error);
      }
    }
  };

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
  
  


  return (
    <>
    {
      isOpen && 
      <div className="upload-container">
        <div className="upload">
      <div>
        <input
            type="file"
            onChange={handleImageUpload}
            className="choose-button"
          />
      </div>
      <div className='details'>
      <div><label htmlFor="info">Details about the Photo:</label></div>
      <input
        type="text"
        id="info"
        name="info"
        maxLength={50}
        required
        value={photoDetails}
        onChange={(e) => setPhotoDetails(e.target.value)}
/>
      </div>
        <div className="image-preview">
          {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" width="50%" />}
        </div>
        <div>
          <button onClick={handleSubmit} disabled={uploading} className={`upload-button ${isClickedd ? 'clicked' : ''}`}>
            {uploading ? "Uploading..." : "Upload Image"}
          </button>
        </div>
        <div className="message">
          {uploadMessage && <p>{uploadMessage}</p>}
        </div>
        <span className="close-btn closee" onClick={togglePopup}>
            &times;
          </span>
    </div>
      </div>
    }
    <button className={`add-image ${isClicked ? 'clicked' : ''}`} onClick={togglePopdown}>Add Photo</button>
    {
      Data.img && <div className="preview" onClick={() => imgAction()}>
        <span className=" close-btn close" onClick={() => imgAction()}>&times;</span>
        {/* <span className="prev" onClick={() => imgAction('prev-img')}>&lt;</span> */}
        <img src={Data.img} alt="Image" />
        {/* <span className="next" onClick={() => imgAction('next-img')}>&gt;</span> */}
      </div>
    }
      <div className="gallery-container">
      <div className="head">Gallery</div>
      <div className="image-gallery">
            <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
              >
                <Masonry gutter="20px">
                    {galleryDetails.map((details) => (
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
    </>
  );
};

export default Gallery;