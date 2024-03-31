// import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  // const [showDropdown, setShowDropdown] = useState(false);
  // const dropdownRef = useRef(null);

  // const toggleDropdown = () => {
  //   setShowDropdown(!showDropdown);
  // };

  // const handleClickOutside = (event) => {
  //   if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //     setShowDropdown(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

  return (
    // <div className="menu" ref={dropdownRef}>
    //   <button onClick={toggleDropdown} className='first-button'>Menu</button>
    //   {showDropdown && (
    //     <div className="dropdown-content">
    //       <Link to="/" onClick={() => setShowDropdown(false)}><button>Home</button></Link>
    //       <Link to="/tribute-form" onClick={() => setShowDropdown(false)}><button>Add Tribute</button></Link>
    //       <Link to="/gallery" onClick={() => setShowDropdown(false)}><button>Gallery</button></Link>
    //     </div>
    //   )}
    // </div>
    <div className='menu'>
      <Link to="/"><button>Home</button></Link>
      <Link to="/tribute-form"><button>Add Tribute</button></Link>
      <Link to="/gallery"><button>Gallery</button></Link>
    </div>
  );
};

export default Menu;
