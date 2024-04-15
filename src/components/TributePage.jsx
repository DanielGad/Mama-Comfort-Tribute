import { getFirestore, collection, getDocs, query, orderBy, doc, updateDoc } from 'firebase/firestore';
// import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import { GalleryContext } from './GalleryContext';
import '../assets/tributePage.css';
import TributeModal from './TributeModal';

const database = getFirestore();
const collectionRef = collection(database, 'Tribute');

const TributePage = () => {
  // const { isClicked, togglePopdown } = useContext(GalleryContext);
  const [tributess, setTributes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [editingTribute, setEditingTribute] = useState(null);

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

  const [modalOpen, setModalOpen] = useState(false);
  // const handleEdit = (tribute) => {
  //   setEditingTribute(tribute);
  //   setModalOpen(true);
  // };

  const handleUpdate = async (id, body, author, relationship, imgUrl) => {
    try {
      await updateDoc(doc(collectionRef, id), { body, author, relationship, imgUrl });
      const updatedTributes = tributess.map((tribute) =>
        tribute.id === id ? { ...tribute, body, author, relationship, imgUrl } : tribute
      );
      setTributes(updatedTributes);
      setEditingTribute(null);
    } catch (error) {
      console.error('Error updating tribute: ', error);
    }
  };

  return (
    <div>
      <div className="tributes-page">
        <h1 style={{ textAlign: "center", paddingTop: "20px" }}>Tributes</h1>
        {tributess.slice(startIndex, endIndex).map((tribute) => (
          <div className="tri" key={tribute.id}>
            <div className='tri-cover'>
              <img src={tribute.imgUrl} alt="" />
            </div>
            <div>
            <div className='tri-body'>{tribute.body}</div>
            <div style={{
              display: 'flex', justifyContent: 'space-between'
            }}>
              {/* <button onClick={() => {handleEdit(tribute)
              setDisImg(tribute.imgUrl)}}>Edit</button> */}
            <div className='tri-name'>{tribute.author} ({tribute.relationship})</div>
            </div>
            </div>
          </div>
        ))}
        {editingTribute && modalOpen &&
        <TributeModal tribute={editingTribute} onUpdate={handleUpdate} setOpenModal={setModalOpen} />}
      </div>

      <div className='navi'>
        <button className='link-button' onClick={prevTributes} disabled={currentPage === 0}>Previous</button>
        {/* <Link to={'/tribute-form'}><button className={`add-image ${isClicked ? 'clicked' : ''}`} onClick={togglePopdown}>Add a Tribute</button></Link> */}
        <button className='link-button' onClick={nextTributes} disabled={endIndex >= tributess.length}>Next</button>
      </div>
    </div>
  )
}

export default TributePage;
