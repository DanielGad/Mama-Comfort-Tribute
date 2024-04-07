import  { useState } from 'react';
import Menu from "./components/Menu";
import TributeBody from "./components/TributeBody";
import TributeForm from "./components/TributeForm";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Gallery from './components/Gallery';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  const [tributes, setTributes] = useState([]);

  const addTribute = (body, author) => {
    const newTribute = { body, author };
    setTributes([...tributes, newTribute]);
    return Promise.resolve(); 
  };
  const handleSubmitted = () => {
    window.location.href = '/';
  };

  return (
    <Router>
      <div>
        <ScrollToTop />
        <Menu />
        <Routes>
          <Route path="/" element={<TributeBody />} />
          <Route
            path="/tribute-form"
            element={<TributeForm addTribute={addTribute}  onSubmitted={handleSubmitted}/>}
          />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
