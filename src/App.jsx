import Menu from "./components/Menu";
import TributeBody from "./components/TributeBody";
import TributeForm from "./components/TributeForm";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Gallery from './components/Gallery';
import ScrollToTop from './components/ScrollToTop';
import TributePage from './components/TributePage';

const App = () => {

  return (
    <Router>
      <div>
        <ScrollToTop />
        <Menu />
        <Routes>
          <Route path="/" element={<TributeBody />} />
          <Route
            path="/tribute-form" element={<TributeForm />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/tributes" element={<TributePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
