import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import '../assets/tributeform.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, onSnapshot } from 'firebase/firestore';

const database = getFirestore();
const collectionRef = collection(database, 'tributes');

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

// eslint-disable-next-line react/prop-types
const TributeForm = ({ onSubmitted }) => {
  const [, setTributes] = useState([]);

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

  const addTribute = (body, author) => {
    return addDoc(collectionRef, { body, author });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = e.target.body.value;
    const author = e.target.author.value;
    const confirmed = window.confirm('Are you sure you want to submit this tribute?');
    if (!confirmed) {
    return;
    }
    addTribute(body, author).then(() => {
      alert('Tribute Submitted Successfully!');
      onSubmitted();
    })
    .catch((error) => {
      console.error('Error adding tribute: ', error);
    });
    e.target.reset();
  };

  return (
    <div>
      <form className="tribute-form" onSubmit={handleSubmit}>
      <div className='head'>Add a Tribute</div>
      <label htmlFor="body">Body:</label>
      <textarea id="body" name="body" rows="4" required />
      <label htmlFor="author">Name:</label>
      <input type="text" id="author" name="author" required />
      <button type="submit">Add Tribute</button>
    </form>
    </div>
  );
};

TributeForm.propTypes = {
  addTribute: PropTypes.func.isRequired,
};

export default TributeForm;
