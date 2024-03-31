import  { useState } from 'react';
import Menu from "./components/Menu";
import TributeBody from "./components/TributeBody";
import TributeForm from "./components/TributeForm";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTopOnRefresh from './components/ScrollToTopOnRefresh';
import Gallery from './components/Gallery';

const App = () => {
  const [tributes, setTributes] = useState([]);

  const addTribute = (body, author) => {
    // Add logic to add the new tribute to the list
    const newTribute = { body, author };
    setTributes([...tributes, newTribute]);
    return Promise.resolve(); // Return a resolved promise for now
  };
  const handleSubmitted = () => {
    // Navigate back to the home page
    window.location.href = '/';
  };

  return (
    <Router>
      <div>
        <Menu />
        <ScrollToTopOnRefresh />
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
