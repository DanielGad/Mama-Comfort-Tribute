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

  const [isTributeOpen, setIsTributeOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const handleTributeClick = () => {
    setIsTributeOpen(!isTributeOpen);
    setIsGalleryOpen(false); 
  };

  const handleGalleryClick = () => {
    setIsGalleryOpen(!isGalleryOpen);
    setIsTributeOpen(false); 
  };

  const closeDropdowns = () => {
    setIsTributeOpen(false);
    setIsGalleryOpen(false);
  };

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (!e.target.closest('.dropdown')) {
        closeDropdowns();
      }
    };

    const handleScroll = () => {
      closeDropdowns();
    };

    document.body.addEventListener('click', handleDocumentClick);
    document.body.addEventListener('scroll', handleScroll);

    return () => {
      document.body.removeEventListener('click', handleDocumentClick);
      document.body.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='menu'>
      <Link to="/" style={{ textDecoration: 'none' }} aria-label="Go to Home">
        <div className='menu-button'>Home</div>
      </Link>
      <div className="dropdown" onMouseEnter={handleTributeClick} onMouseLeave={() => setIsTributeOpen(false)}>
        <Link to={"/tributes"} style={{textDecoration: "none"}}><div className='menu-button'>Tributes</div></Link>
        {isTributeOpen && (
          <div className="dropdown-content">
            <Link to="/tribute-form" style={{ textDecoration: 'none' }} onClick={closeDropdowns}>Add a Tribute</Link>
          </div>
        )}
      </div>
      <div className="dropdown" onMouseEnter={handleGalleryClick} onMouseLeave={() => setIsGalleryOpen(false)}>
        <Link to={"/gallery"} style={{textDecoration: "none"}}><div className='menu-button'>Gallery</div></Link>
        {isGalleryOpen && (
          <div className="dropdown-content">
            <Link to="/add-gallery" style={{ textDecoration: 'none' }} onClick={closeDropdowns}>Add Photo to Gallery</Link>
          </div>
        )}
      </div>
      {autoplayDenied && (
        <div className="menu-button sound" onClick={toggleMusic} aria-label={!isPlayingg ? 'Play' : 'Pause'}>
          {!isPlayingg ? <FontAwesomeIcon icon={faVolumeUp} /> : <FontAwesomeIcon icon={faVolumeOff} />}
        </div>
      )}
    </div>
  );
};

export default Menu;
