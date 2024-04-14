import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Menu = () => {

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const music = document.getElementById('bg-music'); 
    if (music) { 
      music.play(); 
    setIsPlaying(true); 
    } 
  }, []);

  function toggleMusic() {
    var music = document.getElementById('bg-music');
    if (music.paused) {
      music.play();
      setIsPlaying(true);
    } else {
      music.pause();
      setIsPlaying(false);
    }
  }

  return (

    <div className='menu'>
      <Link to="/" style={{ textDecoration: 'none' }}><div className='menu-button'>Home</div></Link>
      <Link to="/tributes" style={{ textDecoration: 'none' }}><div className='menu-button'>Tributes</div></Link>
      <Link to="/gallery" style={{ textDecoration: 'none' }}><div className='menu-button'>Gallery</div></Link>
      <div className="menu-button" onClick={toggleMusic}>
        {isPlaying ? 'Pause Music' : 'Play Music'}
      </div>
    </div>
  );
};

export default Menu;

