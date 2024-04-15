import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Menu = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayingg, setIsPlayingg] = useState(true);
  const [autoplayDenied, setAutoplayDenied] = useState(false);

  useEffect(() => {
    const music = document.getElementById('bg-music');
    if (music) {
      music.play().catch(() => {
        setAutoplayDenied(true);
      });
      setIsPlaying(true);
setIsPlayingg(false)
    }
  }, []);
  
  function toggleMusic() {
    var music = document.getElementById('bg-music');
    if (music) {
      if (music.paused) {
        music.play();
        setIsPlaying(true);
setIsPlayingg(false)
      } else {
        music.pause();
        setIsPlaying(false);
        setIsPlayingg(true)
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
        <div className="menu-button" onClick={toggleMusic} aria-label={isPlaying ? 'Play Music' : 'Pause'}>
          {isPlaying ? 'Play Music' : 'Pause'}
        </div>
      )}
      {!autoplayDenied && (
        <div className="menu-button" onClick={toggleMusic} aria-label={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? 'Pause' : 'Play'}
        </div>
      )}
    </div>
  );
};

export default Menu;


