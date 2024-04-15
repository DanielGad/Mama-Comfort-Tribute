import { useContext } from 'react';
import { GalleryContext } from './GalleryContext';

const MusicModal = () => {
  const { setIsPlayingg, setShowModal } = useContext(GalleryContext);

  const handleYes = () => {
    const music = document.getElementById('bg-music');
    music.play();
    setIsPlayingg(true);
    setShowModal(false)

  }

  const handleNo = () => {
    const music = document.getElementById('bg-music');
    music.pause();
    setIsPlayingg(false);
    setShowModal(false)
  }



  return (
    <div className="modal">
      <div className="modal-music">
        <h3>Welcome to Mama Comfort Tribute Page</h3>
        <p>Permission Required!</p>
        <p>Do you want to play background music and continue?</p>
        <div className='click'>
          <button onClick={handleYes}>Yes, Play Music</button>
        <button onClick={handleNo}>No, Thanks</button>
        </div>
        
      </div>
    </div>
  );
};

export default MusicModal;
