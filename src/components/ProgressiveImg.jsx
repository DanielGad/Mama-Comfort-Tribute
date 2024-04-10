import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ProgressiveImg = ({ placeholderSrc, src, alt, ...props }) => {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImgSrc(src);
    };
    img.src = src;
  }, [src]);

  return (
    <img
      {...{ src: imgSrc, alt, ...props }}
      className="image"
    />
  );
};

ProgressiveImg.propTypes = {
  placeholderSrc: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

export default ProgressiveImg;
