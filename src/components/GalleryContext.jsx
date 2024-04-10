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

  // const uploadFile = () => {
  //   if (imageUpload == null) {
  //     alert("Please select a file to upload.");
  //     return;
  //   }
  //   if (imageUpload == null) return;
  //   setUploading(true);
  //   const fileName = `${uuidv4()}_${imageUpload.name}`;
  //   const imageRef = ref(storage, `Tribute-images/${fileName}`);
  //   uploadBytes(imageRef, imageUpload).then((snapshot) => {
  //     getDownloadURL(snapshot.ref)
  //       .then((url) => {
  //         setImageUrls((prevUrls) => [...prevUrls, url]);
  //         setUploadMessage("Image uploaded successfully!");
  //         setTimeout(() => {
  //           window.location.href = '/gallery';
  //         }, 2000);
  //       })
  //       .catch((error) => {
  //         console.error("Error getting download URL:", error);
  //         setUploadMessage("Error uploading file. Please try again.");
  //       })
  //       .finally(() => {
  //         setUploading(false);
  //       });
  //   });
  //   setIsClickedd(true);
  //   setTimeout(() => {
  //     setIsClickedd(false);
  //   }, 300);
  // };

  const uploadFile = async () => {
    setPhotoDetails("")
    try {
      if (imageUpload == null) {
        setDetailsMessagess('Select a photo to upload!');
        await new Promise(resolve => setTimeout(resolve, 2000));
        setDetailsMessagess(null);
        return;
      }

      const maxSize = 4 * 1024 * 1024;
      if (imageUpload.size > maxSize) {
        setDetailsMessagess("Selected Photo is too large. Please select a photo under 4MB.");
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setDetailsMessagess(null);
        return;
      }

      if (!photoDetails) {
        setDetailsMessage('Kindly provide details about the photo.');
        await new Promise(resolve => setTimeout(resolve, 2000));
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
  

  const uploadProfileFile = async () => {
    const maxSize = 2 * 1024 * 1024; // 2MB
      if (imageProfile.size > maxSize) {
        setDetailsMessage('Selected Photo is too large. Please select a photo not more than 2MB.');
        await new Promise(resolve => setTimeout(resolve, 4000));
        setDetailsMessage(null);
        return;
      }

    try {
      let imgUrl = 'https://firebasestorage.googleapis.com/v0/b/mama-comfort-tribute.appspot.com/o/Tribute-profile%2F1074c9f9-5d5a-4793-8c03-f27e2f66cbd7_m1.png?alt=media&token=30725b90-31a2-4723-9d9e-b1b6c3146bfa';
  
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

  return (
    <GalleryContext.Provider value={{ imageUrls, uploadMessage, imagePreview, uploading, isClicked, imageProUrls, imageProPreview, isClickedd, Data, isOpen, photoDetails, detailsMessage, detailsMessagess, setPhotoDetails, handleImageUpload, handleProfileUpload, uploadProfileFile, uploadFile, viewImage, imgAction, togglePopdown, togglePopup }}>
      {children}
    </GalleryContext.Provider>
  );
};

GalleryProvider.propTypes = {
  children: node.isRequired
};
