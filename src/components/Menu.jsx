import { Link } from 'react-router-dom';

const Menu = () => {


  return (

    <div className='menu'>
      <Link to="/"><button>Home</button></Link>
      <Link to="/tribute-form"><button>Add Tribute</button></Link>
      <Link to="/gallery"><button>Gallery</button></Link>
    </div>
  );
};

export default Menu;
