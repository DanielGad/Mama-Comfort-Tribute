import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { GalleryContext } from './GalleryContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeOff, faVolumeUp } from '@fortawesome/free-solid-svg-icons';



const Menu = () => {
  const { isPlayingg, setIsPlayingg} = useContext(GalleryContext)
  const [autoplayDenied, setAutoplayDenied] = useState(false);

  useEffect(() => {
    const music = document.getElementById('bg-music');
    if (music) {
      music.play().catch(() => {
        setAutoplayDenied(true);
      });
    }
  }, []);
  
  function toggleMusic() {
    var music = document.getElementById('bg-music');
    if (music) {
      if (music.paused) {
        music.play();
        setIsPlayingg(true)
      } else {
        music.pause();
        setIsPlayingg(false)
      }
    } else {
      console.error('Background music not found.');
    }
  }

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
        <div className="menu-button sound" onClick={toggleMusic} aria-label={!isPlayingg ? 'Play' : 'Pause'}>
          {!isPlayingg ? <FontAwesomeIcon icon={faVolumeUp} /> : <FontAwesomeIcon icon={faVolumeOff} />}
        </div>
      )}
    </div>
  );
};

export default Menu;
