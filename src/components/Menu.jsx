import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Menu = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayingg, setIsPlayingg] = useState(false);
  const [autoplayDenied, setAutoplayDenied] = useState(false);

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

  useEffect(() => {
    if (autoplayDenied) {
      const allowMusic = window.confirm('Permission required! Do you want to play music?');
      if (allowMusic) {
        setIsPlayingg(true);
      } else {
        setIsPlayingg(false);
      }
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
    </div>
  );
};

export default Menu;
