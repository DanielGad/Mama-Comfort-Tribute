import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';
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
    const fetchGalleryDetails = async () => {
      const querySnapshot = await getDocs(query(collectionRef, orderBy('sequence')));
      const details = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTributes(details);
    };
    fetchGalleryDetails();
  }, []);

  const nextTributes = () => {
    window.scrollTo(0, 0);
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevTributes = () => {
    window.scrollTo(0, 0);
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
            <div>
            <div className='tri-body'>{tribute.body}</div>
            <div className='tri-name'>{tribute.author} ({tribute.relationship})</div>
            </div>
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
