import { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../assets/tributeModal.css';
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { GalleryContext } from './GalleryContext';

const TributeModal = ({ tribute, onUpdate, setOpenModal }) => {
  const { isClickedd, disImg } = useContext(GalleryContext);
  const [loading, setLoading] = useState(false);
  const [detailsMessage, setDetailsMessage] = useState('');

  const [body, setBody] = useState(tribute.body);
  const [author, setAuthor] = useState(tribute.author);
  const [relationship, setRelationship] = useState(tribute.relationship);
  const [imgUrl, setImgUrl] = useState(tribute.imgUrl);
  const [imageProfile, setImageProfile] = useState(null);
  const [ImageProPreview, setImageProPreview] = useState(null);

  useEffect(() => {
    setImageProPreview(disImg);
  }, [disImg])

  const handleProfileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setImageProPreview(imgUrl);
      return;
    }

    setImageProfile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImageProPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  
  const handleSubmit = async () => {
    setLoading(true);
  
    try {
      let newImgUrl = imgUrl;
  
      if (imageProfile) {
        const maxSize = 4 * 1024 * 1024;
        if (imageProfile.size > maxSize) {
          setDetailsMessage('Selected Photo is too large. Please select a photo not more than 4MB.');
          await new Promise(resolve => setTimeout(resolve, 4000));
          setDetailsMessage(null);
          setLoading(false);
          return;
        }
  
        const fileName = `${uuidv4()}_${imageProfile.name}`;
        const imageRef = ref(storage, `Tribute-profile/${fileName}`);
        await uploadBytes(imageRef, imageProfile);
        newImgUrl = await getDownloadURL(imageRef); 
      }
  
      setImgUrl(newImgUrl); 

      await onUpdate(tribute.id, body, author, relationship, newImgUrl);
      setLoading(false);
      setImageProPreview(null);
      setOpenModal(false);
    } catch (error) {
      console.error('Error updating tribute:', error);
      setLoading(false);
      // Handle error
    }
  };
  
  const handleClose = () => {
    setImageProPreview(null)
    setOpenModal(false);
  };
  

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Tribute</h2>
        <label className='modal-label' htmlFor="body">Tribute:</label>
        <textarea className='modal-input' id="body" rows="6" value={body} onChange={(e) => setBody(e.target.value)} />
        <label className='modal-label' htmlFor="author">Name:</label>
        <input className='modal-input' type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <label className='modal-label' htmlFor="relationship">Relationship with Mama:</label>
        <input className='modal-input' type="text" id="relationship" value={relationship} onChange={(e) => setRelationship(e.target.value)} />
        <label className='modal-label' htmlFor="file">Profile Photo: Select a new Photo to Change</label>
        <input className='modal-input' style={{border: "none", backgroundColor: "rgb(31,26,44)", padding: "5px", cursor: "pointer", color: "white"}} type="file" onChange={handleProfileUpload} />
        <div className="error-message">
          {detailsMessage && <div>{detailsMessage}</div>}
        </div>
        <div className="image-preview">
          {ImageProPreview && <img src={ImageProPreview} alt="Preview" className="image-preview" width="50%" />}
        </div>
        <div className='butt'>
        <button onClick={handleClose} className='but-but'>Close</button>
        <button onClick={handleSubmit} disabled={loading} className={`but-but add-Tribute ${isClickedd ? 'clicked' : ''}`}>
          {loading ? 'Updating...' : 'Save & Submit'}
        </button>
        </div>
      </div>
    </div>
  );
};

TributeModal.propTypes = {
  tribute: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  setOpenModal: PropTypes.func.isRequired
};

export default TributeModal