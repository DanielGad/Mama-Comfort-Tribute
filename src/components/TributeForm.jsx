import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import '../assets/tributeform.css';
import { getFirestore, collection, addDoc, onSnapshot } from 'firebase/firestore';
import { useContext } from 'react';
import { GalleryContext } from './GalleryContext';
const database = getFirestore();
const collectionRef = collection(database, 'Tribute');

// eslint-disable-next-line react/prop-types
const TributeForm = ({ onSubmitted }) => {
  const { imageProPreview, handleProfileUpload, uploadProfileFile, isClickedd, setIsClickedd } = useContext(GalleryContext)
  const [, setTributes] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const addTribute = (body, author, imgUrl) => {
    return addDoc(collectionRef, { body, author, imgUrl });
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

  try {
    await addTribute(body, author, imgUrl);
    alert('Tribute Submitted Successfully!');
    onSubmitted();
  } catch (error) {
    console.error('Error adding tribute: ', error);
  } finally {
    setLoading(false);
  }
};
  
  return (
    <div>
      <form className="tribute-form" onSubmit={handleSubmit}>
      <div className='head'>Add a Tribute</div>
      <label htmlFor="body">Tribute:</label>
      <textarea id="body" name="body" rows="4" required />
      <label htmlFor="author">Name:</label>
      <input type="text" id="author" name="author" required />
      <label htmlFor="file">Profile Image:</label>
      <input type="file" onChange={handleProfileUpload}/>
      <div className="image-preview">
          {imageProPreview && <img src={imageProPreview} alt="Preview" className="image-preview" width="50%" />}
        </div>
      <button type="submit" disabled={loading} className={`add-Tribute ${isClickedd ? 'clicked' : ''}`} 
      onClick={() => setIsClickedd(true)}>
        {loading ? 'Uploading...' : 'Add Tribute'}
      </button>
    </form>
    </div>
  );
};

TributeForm.propTypes = {
  addTribute: PropTypes.func.isRequired,
};

export default TributeForm;

