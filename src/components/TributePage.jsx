import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { GalleryContext } from './GalleryContext';
const database = getFirestore();
const collectionRef = collection(database, 'Tribute');
import { useState, useEffect } from 'react';
import '../assets/tributePage.css'

const TributePage = () => {
  const [tributes, setTributes] = useState([]);

  const { isClicked, togglePopdown } = useContext(GalleryContext);

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

  return (
    <div>
      <div className="tributes-page">
        <h1 style={{textAlign: "center", paddingTop: "20px"}}>Tributes</h1>
        {tributes.slice(0, 6).map((tribute) => (
          <div className="tri" key={tribute.id}>
            <div className='tri-cover'>
                  <img src={tribute.imgUrl}alt="" />  
              </div>
            <div className='tri-body'>{tribute.body}</div>
              <div className='tri-name'>{tribute.author} ({tribute.relationship})</div>
          </div>
        ))}
      </div>
      <Link to={'/tribute-form'}><button className={`add-image ${isClicked ? 'clicked' : ''}`} onClick={togglePopdown}>Add Tribute</button></Link>
      <div className='navi'>
      <Link><button className='link-button'>Previous</button></Link>
      <Link><button className='link-button'>Next</button></Link>
      </div>
    </div>
  )
}

export default TributePage