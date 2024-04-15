import Menu from "./components/Menu";
import TributeBody from "./components/TributeBody";
import TributeForm from "./components/TributeForm";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Gallery from './components/Gallery';
import ScrollToTop from './components/ScrollToTop';
import TributePage from './components/TributePage';
import GalleryForm from "./components/GalleryForm";
import MusicModal from "./components/MusicModal";
import { useContext } from "react";
import { GalleryContext } from "./components/GalleryContext";

const App = () => {
  const { showModal } = useContext(GalleryContext)

  return (
    <Router>
      <div>
        <ScrollToTop />
        {showModal && <MusicModal />}
        <Menu />
        <Routes>
          <Route path="/" element={<TributeBody />} />
          <Route
            path="/tribute-form" element={<TributeForm />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/tributes" element={<TributePage />} />
          <Route path="/add-gallery" element={<GalleryForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
