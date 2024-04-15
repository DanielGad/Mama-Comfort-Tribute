import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Menu = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayingg, setIsPlayingg] = useState(true);
  const [autoplayDenied, setAutoplayDenied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const music = document.getElementById('bg-music');
    if (music) {
      music.play().catch(() => {
        setAutoplayDenied(true);
      });
      setIsPlaying(true);
    }
  }, []);
  
  function toggleMusic() {
    var music = document.getElementById('bg-music');
    if (music) {
      if (music.paused) {
        music.play();
        setIsPlaying(true);
        setIsPlayingg(true);
      } else {
        music.pause();
        setIsPlaying(false);
        setIsPlayingg(false);
      }
    } else {
      console.error('Background music not found.');
    }
  }

  function handlePermissionResponse(response) {
    if (response === 'yes') {
      setIsPlayingg(true);
    } else {
      // Handle if user declines permission
    }
    setShowModal(false);
  }

  useEffect(() => {
    if (autoplayDenied) {
      setShowModal(true);
    }
  }, [autoplayDenied]);

  return (
    <div className='menu'>
      <Link to="/" style={{ textDecoration: 'none' }} aria-label="Go to Home">
        <div className='menu-button'>Home</div>
      </Link>
      <Link to="/tributes" style={{ textDecoration: 'none' }} aria-label="View Tributes">
        <div className='menu-button'>Tributes</div>
      </Link>
      <Link to="/gallery" style={{ textDecoration: 'none' }} aria-label="View Gallery">
        <div className='menu-button'>Gallery</div>
      </Link>
      {autoplayDenied && (
        <div className="menu-button" onClick={toggleMusic} aria-label={isPlaying ? 'Play Music' : 'Pause'}>
          {isPlayingg ? 'Play Music' : 'Pause'}
        </div>
      )}
      {!autoplayDenied && (
        <div className="menu-button" onClick={toggleMusic} aria-label={isPlaying ? 'Pause' : 'Play'}>
          {isPlayingg ? 'Pause' : 'Play'}
        </div>
      )}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Permission required! Do you want to play music?</p>
            <button onClick={() => handlePermissionResponse('yes')}>Yes</button>
            <button onClick={() => handlePermissionResponse('no')}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
