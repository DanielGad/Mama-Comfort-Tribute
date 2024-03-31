import { useEffect, useRef, useState } from "react";

const UploadWidget = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [message, setMessage] = useState("");
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: "dxl7vy4v9",
      uploadPreset: "khtz0nnc",
      maxFileSize: 15000000,
      folder: "Mama-Comfort"
    }, function(error, result) {
      if (!error && result && result.event === "success") {
        setMessage("Upload successful!");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
    })
  }, [])

  const handleUploadClick = () => {
    widgetRef.current.open();
  };

  return (
    <div className="">
      {message && <div>{message}</div>}
      <button onClick={handleUploadClick}>Upload</button>
    </div>
  );
};

export default UploadWidget;