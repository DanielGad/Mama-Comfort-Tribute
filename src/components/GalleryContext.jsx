import { createContext, useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "./firebase";
import { v4 as uuidv4 } from "uuid";
import { node } from 'prop-types';

export const GalleryContext = createContext();

export const GalleryProvider = ({ children }) => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageProfile, setImageProfile] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageProUrls, setImageProUrls] = useState('');
  const [uploadMessage, setUploadMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageProPreview, setImageProPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [Data, setData] = useState({img: '', i: 0});
  const [isClicked, setIsClicked] = useState(false);
  const [isClickedd, setIsClickedd] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const imagesListRef = ref(storage, "Tribute-images/");

  const imagesProListRef = ref(storage, "Tribute-profile/");

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

  const handleProfileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) {
      alert('Kindly select the file you want to upload!');
      return;
    }

    setImageProfile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImageProPreview(reader.result);
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
          setTimeout(() => {
            window.location.href = '/gallery';
          }, 2000);
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

  

  const uploadProfileFile = async () => {
    try {
      let imgUrl = 'https://firebasestorage.googleapis.com/v0/b/mama-comfort-tribute.appspot.com/o/Tribute-images%2Ff434fb28-899a-4b6a-859b-7d492826dbad_m1.png?alt=media&token=e54f23fb-75ce-411c-8114-a0980c9601ce'; // Default image URL
  
      if (imageProfile != null) {
        const fileName = `${uuidv4()}_${imageProfile.name}`;
        const imageRef = ref(storage, `Tribute-profile/${fileName}`);
        await uploadBytes(imageRef, imageProfile);
        imgUrl = await getDownloadURL(imageRef);
      }
  
      setImageProUrls(imgUrl);
      return imgUrl;
    } catch (error) {
      console.error('Error uploading profile image:', error);
      // Handle error
      return null;
    }
  };
  
  

  useEffect(() => {
    listAll(imagesProListRef)
      .then((response) => {
        Promise.all(response.items.map((item) => {
            return getDownloadURL(item);
          }))
          .then((urls) => {
            console.log("Download URLs:", urls);
            setImageProUrls(urls);
            console.log(urls);
          })
          .catch((error) => {
            console.error("Error getting download URLs:", error);
          });
      })
      .catch((error) => {
        console.error("Error listing images:", error);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  useEffect(() => {
    listAll(imagesListRef)
      .then((response) => {
        Promise.all(response.items.map((item) => {
            return getDownloadURL(item);
          }))
          .then((urls) => {
            console.log("Download URLs:", urls);
            setImageUrls(urls);
          })
          .catch((error) => {
            console.error("Error getting download URLs:", error);
          });
      })
      .catch((error) => {
        console.error("Error listing images:", error);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  
  
  

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
    <GalleryContext.Provider value={{ imageUrls, uploadMessage, imagePreview, uploading, isClicked, imageProUrls, imageProPreview, isClickedd, Data, isOpen, handleImageUpload, handleProfileUpload, uploadProfileFile, uploadFile, viewImage, imgAction, togglePopdown, togglePopup }}>
      {children}
    </GalleryContext.Provider>
  );
};

GalleryProvider.propTypes = {
  children: node.isRequired
};
