import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/tributeform.css';
import { getFirestore, collection, addDoc, getDocs} from 'firebase/firestore';
import { useContext } from 'react';
import { GalleryContext } from './GalleryContext';
const database = getFirestore();
const collectionRef = collection(database, 'Tribute');

// eslint-disable-next-line react/prop-types
const TributeForm = ({ onSubmitted }) => {
  const { imageProPreview, handleProfileUpload, uploadProfileFile, isClickedd, detailsMessage } = useContext(GalleryContext)
  const [loading, setLoading] = useState(false);
  

  const addTribute = async (body, author, relationship, imgUrl) => {
    const querySnapshot = await getDocs(collectionRef);
    const sequence = querySnapshot ? querySnapshot.size : 0;
    return addDoc(collectionRef, { body, author, relationship, imgUrl, sequence });
  };
  

  const handleSubmit = async (e) => {
    const confirmed = window.confirm('Are you sure you want to submit this tribute?');
  if (!confirmed) {
    return;
  }
  setLoading(true);
  e.preventDefault();

  const imgUrl = await uploadProfileFile();
  const body = e.target.body.value;
  const author = e.target.author.value;
  const relationship = e.target.relationship.value;

  try {
    await addTribute(body, author, relationship, imgUrl);
    alert('Tribute Submitted Successfully!');
      window.location.href = '/tributes';
    onSubmitted();
  } catch (error) {
    console.error('Error adding tribute: ', error);
  } finally {
    setLoading(false);
  }
};
  
  return (
    <div>
      <Link to={"/tributes"}><span className="close-btn closee">
            &times;
          </span></Link>
      <form className="tribute-form" onSubmit={handleSubmit}>
      <div className='head'>Add a Tribute</div>
      <label htmlFor="body">Tribute:</label>
      <textarea id="body" name="body" rows="4" required />
      <label htmlFor="author">Name:</label>
      <input type="text" id="author" name="author" required/>
      <label htmlFor="relationship">Relationship with Mama:</label>
      <input type="text" id="relationship" name="relationship" required maxLength={30}/>
      <label htmlFor="file">Profile Photo:</label>
      <input type="file" onChange={handleProfileUpload}/>
      <div className="error-message">
          {detailsMessage && <div>{detailsMessage}</div>}
        </div>
      <div className="image-preview">
          {imageProPreview && <img src={imageProPreview} alt="Preview" className="image-preview" width="50%" />}
        </div>
      <button type="submit" disabled={loading} className={`add-Tribute ${isClickedd ? 'clicked' : ''}`} 
      >
        {loading ? 'Uploading...' : 'Add Tribute'}
      </button>
    </form>

    </div>
  );
};

export default TributeForm;

