import { useState } from 'react';
import { storage } from './firebase'; // Assuming you have Firebase initialized as shown in your code

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const storageRef = storage.ref('images'); // Specify the folder ('uploads' in this case)
    const fileRef = storageRef.child(file.name);

    setUploading(true);

    // Upload file to Firebase Storage
    const uploadTask = fileRef.put(file);

    uploadTask.on('state_changed',
      (snapshot) => {
        // Update progress
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error('Error uploading file:', error);
        setUploading(false);
      },
      () => {
        // Upload completed successfully
        setFile(null);
        setUploading(false);
        setUploadProgress(0);
        alert('File uploaded successfully!');
      }
    );
  };

  return (
    <div>
      <h2>File Uploader</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload File'}
      </button>
      {uploading && <p>Progress: {uploadProgress}%</p>}
    </div>
  );
};

export default FileUploader;
