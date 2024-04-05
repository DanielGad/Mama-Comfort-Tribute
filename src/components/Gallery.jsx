import { useContext } from 'react';
import { GalleryContext } from './GalleryContext';
import '../assets/gallery.css';

import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

const Gallery = () => {
  const { imageUrls, uploadMessage, imagePreview, uploading, isClicked, isClickedd, Data, isOpen, handleImageUpload, uploadFile, viewImage, imgAction, togglePopdown, togglePopup } = useContext(GalleryContext);


  return (
    <>
    {
      isOpen && 
      <div className="upload-container">
        <div className="upload">
      <div>
        <input
            type="file"
            onChange={handleImageUpload}
            className="choose-button"
          />
      </div>
        <div className="image-preview">
          {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" width="50%" />}
        </div>
        <div>
          <button onClick={uploadFile} disabled={uploading} className={`upload-button ${isClickedd ? 'clicked' : ''}`}>
            {uploading ? "Uploading..." : "Upload Image"}
          </button>
        </div>
        <div className="message">
          {uploadMessage && <p>{uploadMessage}</p>}
        </div>
        <span className="close-btn closee" onClick={togglePopup}>
            &times;
          </span>
    </div>
      </div>
    }
    <button className={`add-image ${isClicked ? 'clicked' : ''}`} onClick={togglePopdown}>Add Image</button>
    {
      Data.img && <div className="preview">
        <span className=" close-btn close" onClick={() => imgAction()}>&times;</span>
        <span className="prev" onClick={() => imgAction('prev-img')}>&lt;</span>
        <img src={Data.img} alt="Image" />
        <span className="next" onClick={() => imgAction('next-img')}>&gt;</span>
      </div>
    }
      <div className="gallery-container">
      <div className="head">Gallery</div>
      <div className="image-gallery">
            <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
              >
                <Masonry gutter="20px">
                    {imageUrls.map((image, i) => (
                        <img
                            key={i}
                            src={image}
                            style={{width: "100%", display: "block", cursor: "pointer", border: "5px solid rgb(31, 26, 44)", borderRadius: "20px"}}
                            alt=""
                            onClick={() => viewImage(image, i)}
                        />  
                    ))}
                </Masonry>
            </ResponsiveMasonry>
      </div>

    </div>
    </>
  );
};

export default Gallery;