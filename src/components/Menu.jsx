import { Link } from 'react-router-dom';

const Menu = () => {


  return (

    <div className='menu'>
      <Link to="/" style={{ textDecoration: 'none' }}><div className='menu-button'>Home</div></Link>
      <Link to="/tributes" style={{ textDecoration: 'none' }}><div className='menu-button'>Tributes</div></Link>
      <Link to="/gallery" style={{ textDecoration: 'none' }}><div className='menu-button'>Gallery</div></Link>
    </div>
  );
};

export default Menu;
