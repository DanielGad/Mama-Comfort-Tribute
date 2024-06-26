import { createContext, useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "./firebase";
import { v4 as uuidv4 } from "uuid";
import { node } from 'prop-types';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const database = getFirestore();
const collectionRef = collection(database, 'tributes-info');

export const GalleryContext = createContext();

export const GalleryProvider = ({ children }) => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageProfile, setImageProfile] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageProUrls, setImageProUrls] = useState('');
  const [uploadMessage, setUploadMessage] = useState("");
  const [detailsMessage, setDetailsMessage] = useState("");
  const [detailsMessagess, setDetailsMessagess] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageProPreview, setImageProPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [Data, setData] = useState({img: '', i: 0});
  const [isClicked, setIsClicked] = useState(false);
  const [isClickedd, setIsClickedd] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [photoDetails, setPhotoDetails] = useState("");
  const [galleryDetails, setGalleryDetails] = useState([]);

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
  

  const uploadFile = async () => {
    setPhotoDetails("")
    try {
      if (imageUpload == null) {
        setDetailsMessagess('Select a photo to upload!');
        await new Promise(resolve => setTimeout(resolve, 3000));
        setDetailsMessagess(null);
        return;
      }

      const maxSize = 4 * 1024 * 1024;
      if (imageUpload.size > maxSize) {
        setDetailsMessagess("Selected Photo is too large. Please select a photo under 4MB.");
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setDetailsMessagess(null);
        return;
      }

      if (!photoDetails) {
        setDetailsMessage('Kindly provide a caption for the photo.');
        await new Promise(resolve => setTimeout(resolve, 3000));
        setDetailsMessage(null);
        return;
      }
      
      const confirmed = window.confirm('Are you sure you want to upload this photo?');
      if (!confirmed) {
        return;
      }
      
      let imgUrl;
  
      if (imageUpload != null) {
        setUploading(true);
        const fileName = `${uuidv4()}_${imageUpload.name}`;
        const imageRef = ref(storage, `Tribute-images/${fileName}`);
        await uploadBytes(imageRef, imageUpload);
        imgUrl = await getDownloadURL(imageRef);
      }
      setUploadMessage("Image uploaded successfully!");
      setTimeout(() => {
        window.location.href = '/gallery';
     }, 2000);
     setImageUrls((prevUrls) => [...prevUrls, imgUrl])
      return imgUrl;
    } catch (error) {
      console.error('Error uploading profile image:', error);
      setUploadMessage("Error uploading file. Please try again.");
      return null;
    } finally {
      setUploading(false); 
      setIsClickedd(true); 
      setTimeout(() => {
        setIsClickedd(false); 
      }, 300);
    }
  };

  const updateProfile = async () => {
    const maxSize = 4 * 1024 * 1024; // 4MB
    console.log("Image profile:", imageProfile);
  
    if (!imageProfile) {
      return null; // Return null if no image is selected
    }
  
    if (imageProfile.size > maxSize) {
      setDetailsMessage('Selected Photo is too large. Please select a photo not more than 4MB.');
      await new Promise(resolve => setTimeout(resolve, 4000));
      setDetailsMessage(null);
      return null; // Return null if image size is too large
    }
  
    try {
      const fileName = `${uuidv4()}_${imageProfile.name}`;
      const imageRef = ref(storage, `Tribute-profile/${fileName}`);
      await uploadBytes(imageRef, imageProfile);
      const imgUrl = await getDownloadURL(imageRef);
      return imgUrl; // Return the imgUrl if upload is successful
    } catch (error) {
      console.error('Error uploading profile image:', error);
      return null; // Return null if there is an error
    }
  };
  
  

  const uploadProfileFile = async () => {
    const maxSize = 4 * 1024 * 1024; // 4MB

    let imgUrl;
    if (!imageProfile) {
      imgUrl = 'https://firebasestorage.googleapis.com/v0/b/mama-comfort-tribute.appspot.com/o/Tribute-profile%2F74706eb3-3bb8-452d-945d-1623e24a3527_Mama%20Comfort%20OyetejuN.png?alt=media&token=26c77613-99de-47b2-89b6-9d72eb556515';
      return imgUrl;
    }

      if (imageProfile.size > maxSize) {
        setDetailsMessage('Selected Photo is too large. Please select a photo not more than 4MB.');
        await new Promise(resolve => setTimeout(resolve, 4000));
        setDetailsMessage(null);
        return;
      }

    try {
      let imgUrl = 'https://firebasestorage.googleapis.com/v0/b/mama-comfort-tribute.appspot.com/o/Tribute-profile%2F74706eb3-3bb8-452d-945d-1623e24a3527_Mama%20Comfort%20OyetejuN.png?alt=media&token=26c77613-99de-47b2-89b6-9d72eb556515';
  
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
            // console.log("Download URLs:", urls);
            setImageProUrls(urls);
            // console.log(urls);
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
            // console.log("Download URLs:", urls);
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
  
  
  useEffect(() => {
    const fetchGalleryDetails = async () => {
      const querySnapshot = await getDocs(collectionRef);
      const details = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGalleryDetails(details);
    };
    fetchGalleryDetails();
  }, []);
  

  const viewImage = (img, info, i) => {
    setData({ img, info, i });
  };  
  
  const imgAction = (action) => {
    let i = Data.i;
  
    if (action === 'next-img') {
      setData({img: galleryDetails[i + 1].imgUrl, info: galleryDetails[i + 1].info, i: i + 1});
    }
    if (action === 'prev-img') {
      setData({img: galleryDetails[i - 1].imgUrl, info: galleryDetails[i - 1].info, i: i - 1});
    }
    if (!action) {
      setData({img: '', info: '', i: 0});
    }
  };
  

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
    setImageProfile(null)
    setPhotoDetails(null)
    setDetailsMessage(null)
    setImageProPreview(null)
  }
  const [disImg, setDisImg] = useState(null);
  const [isPlayingg, setIsPlayingg] = useState(false);
  const [showModal, setShowModal] = useState(true);

  return (
    <GalleryContext.Provider value={{ imageUrls, uploadMessage, imagePreview, uploading, isClicked, imageProUrls, imageProPreview, isClickedd, Data, isOpen, photoDetails, detailsMessage, detailsMessagess, disImg, isPlayingg, showModal, setShowModal, setIsPlayingg, setDisImg, updateProfile, setPhotoDetails, handleImageUpload, setImageProPreview, handleProfileUpload, uploadProfileFile, uploadFile, viewImage, imgAction, togglePopdown, togglePopup }}>
      {children}
    </GalleryContext.Provider>
  );
};

GalleryProvider.propTypes = {
  children: node.isRequired
};
