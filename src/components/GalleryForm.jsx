import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { GalleryContext } from './GalleryContext';
import { useContext  } from 'react';
import { Link } from 'react-router-dom';

const database = getFirestore();
const collectionRef = collection(database, 'tributes-info');

// eslint-disable-next-line react/prop-types
const GalleryForm = ({ onSubmitted }) => {
  const { handleImageUpload, photoDetails, setPhotoDetails, imagePreview, uploadMessage, uploading, isClickedd, uploadFile, detailsMessage, detailsMessagess } = useContext(GalleryContext);

  const addGallery = (info, imgUrl) => {
    return addDoc(collectionRef, {info, imgUrl})
  };

  const handleSubmit = async (e) => {
    setPhotoDetails("")
    e.preventDefault();
  
    const info = photoDetails;
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

  return (
    <div className="upload-container">
      <Link to={"/gallery"}><span className="close-btn closee">
            &times;
          </span></Link>
        <div className="upload">
      <div>
        <input
            type="file"
            onChange={handleImageUpload}
            className="choose-button"
          />
      </div>
      <div className="error-message">
          {detailsMessagess && <div>{detailsMessagess}</div>}
        </div>
      <div className='details'>
      <div><label htmlFor="info">Caption for the Photo:</label></div>
      <textarea
        type="text"
        id="info"
        name="info"
        maxLength={50}
        required
        rows={"2"}
        value={photoDetails || ""}
        onChange={(e) => setPhotoDetails(e.target.value)}
/>
      <div className="error-message">
          {detailsMessage && <div>{detailsMessage}</div>}
        </div>
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
        </div>
      </div>
  )
}

export default GalleryForm