import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { GalleryContext } from './GalleryContext';
import '../assets/tributePage.css';

const database = getFirestore();
const collectionRef = collection(database, 'Tribute');

const TributePage = () => {
  const [tributes, setTributes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

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

  const nextTributes = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevTributes = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const startIndex = currentPage * 5;
  const endIndex = startIndex + 5;

  return (
    <div>
      <div className="tributes-page">
        <h1 style={{ textAlign: "center", paddingTop: "20px" }}>Tributes</h1>
        {tributes.slice(startIndex, endIndex).map((tribute) => (
          <div className="tri" key={tribute.id}>
            <div className='tri-cover'>
              <img src={tribute.imgUrl} alt="" />
            </div>
            <div className='tri-body'>{tribute.body}</div>
            <div className='tri-name'>{tribute.author} ({tribute.relationship})</div>
          </div>
        ))}
      </div>
      <Link to={'/tribute-form'}><button className={`add-image ${isClicked ? 'clicked' : ''}`} onClick={togglePopdown}>Add Tribute</button></Link>
      <div className='navi'>
        <button className='link-button' onClick={prevTributes} disabled={currentPage === 0}>Previous</button>
        <button className='link-button' onClick={nextTributes} disabled={endIndex >= tributes.length}>Next</button>
      </div>
    </div>
  )
}

export default TributePage;
