import PropTypes from 'prop-types';

const ImageGallery = ({ images }) => {
  return (
    <div className="image-gallery">
      {images.map((image, index) => (
        <img key={index} src={image.secure_url} alt={image.public_id} />
      ))}
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      secure_url: PropTypes.string.isRequired,
      public_id: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ImageGallery;
