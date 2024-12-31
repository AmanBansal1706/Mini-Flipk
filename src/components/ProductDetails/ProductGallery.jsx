// ProductGallery.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const GalleryContainer = styled.div`
  position: sticky;
  top: 2rem;
`;

const MainImage = styled(motion.img)`
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 20px;
  margin-bottom: 1rem;
`;

const ThumbnailContainer = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
`;

const SmallImage = styled(motion.img)`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 20px;
  margin-bottom: 1rem;

  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

export const ProductGallery = ({ images, thumbnail }) => {
  const [mainImage, setMainImage] = useState(thumbnail);
  return (
    <GalleryContainer>
      <MainImage
        src={mainImage}
        alt="Product"
        loading="lazy"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      <ThumbnailContainer>
        {images?.map((image, index) => (
          <SmallImage
            src={image}
            alt={`Product ${index}`}
            loading="lazy"
            onClick={() => setMainImage(image)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        ))}
      </ThumbnailContainer>
    </GalleryContainer>
  );
};
