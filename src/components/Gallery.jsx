import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "./firebase";
import { v4 as uuidv4 } from "uuid";
import '../assets/gallery.css';

import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

const Gallery = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [uploadMessage, setUploadMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [Data, setData] = useState({img: '', i: 0});
  const [isClicked, setIsClicked] = useState(false);
  const [isClickedd, setIsClickedd] = useState(false);

  const imagesListRef = ref(storage, "Tribute-images/");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) {
      alert('Kindly select the file you want to upload!');
      return;
    }

    setImageUpload(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const uploadFile = () => {
    if (imageUpload == null) {
      alert("Please select a file to upload.");
      return;
    }
    if (imageUpload == null) return;
    setUploading(true);
    const fileName = `${uuidv4()}_${imageUpload.name}`;
    const imageRef = ref(storage, `Tribute-images/${fileName}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((url) => {
          setImageUrls((prevUrls) => [...prevUrls, url]);
          setUploadMessage("Image uploaded successfully!");

        })
        .catch((error) => {
          console.error("Error getting download URL:", error);
          setUploadMessage("Error uploading file. Please try again.");
        })
        .finally(() => {
          setUploading(false);
        });
    });
    setIsClickedd(true);
    setTimeout(() => {
      setIsClickedd(false);
    }, 300);
  };

  useEffect(() => {
    listAll(imagesListRef)
      .then((response) => {
        Promise.all(response.items.map((item) => getDownloadURL(item)))
          .then((urls) => {
            setImageUrls(urls);
          })
          .catch((error) => {
            console.error("Error getting download URLs:", error);
          });
      })
      .catch((error) => {
        console.error("Error listing images:", error);
      });
  }, [imagesListRef]);

  const viewImage = (img, i) => {
    setData({img, i})
  }

  const imgAction = (action) => {
    let i = Data.i;
    if (action === 'next-img') {
      setData({img: imageUrls[i + 1], i: i + 1})
    }
    if (action === 'prev-img') {
      setData({img: imageUrls[i - 1], i: i - 1})
    }
    if (!action) {
      setData({img: '', i: 0})
    }
  }

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
};

  const togglePopdown = () => {
      setIsClicked(true);
      setTimeout(() => {
        setIsClicked(false);
      }, 300);

    setIsOpen(!isOpen);
    setUploadMessage(null)
    setImagePreview(null);
    setImageUpload(null)
  }


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
                            style={{width: "100%", display: "block", cursor: "pointer"}}
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