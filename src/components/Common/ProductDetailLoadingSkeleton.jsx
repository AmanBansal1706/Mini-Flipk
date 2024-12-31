import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const SkeletonContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const SkeletonPulse = styled(motion.div)`
  background: linear-gradient(90deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%);
  background-size: 200% 100%;
  animation: pulse 1.5s ease-in-out infinite;
  border-radius: 8px;

  @keyframes pulse {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const GallerySkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MainImageSkeleton = styled(SkeletonPulse)`
  width: 100%;
  height: 400px;
  margin-bottom: 1rem;
`;

const ThumbnailContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const ThumbnailSkeleton = styled(SkeletonPulse)`
  width: 80px;
  height: 80px;
`;

const ProductInfoSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const TitleSkeleton = styled(SkeletonPulse)`
  height: 48px;
  width: 80%;
`;

const PriceSkeleton = styled(SkeletonPulse)`
  height: 40px;
  width: 40%;
`;

const RatingSkeleton = styled(SkeletonPulse)`
  height: 24px;
  width: 30%;
`;

const DescriptionSkeleton = styled(SkeletonPulse)`
  height: 100px;
  width: 100%;
`;

const StatusSkeleton = styled.div`
  display: flex;
  gap: 2rem;
`;

const StatusItemSkeleton = styled(SkeletonPulse)`
  height: 24px;
  width: 120px;
`;

const ButtonSkeleton = styled(SkeletonPulse)`
  height: 48px;
  width: 180px;
  border-radius: 30px;
`;

const ReviewsSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const ReviewItemSkeleton = styled(SkeletonPulse)`
  height: 100px;
  width: 100%;
`;

const ProductDetailLoadingSkeleton = () => {
  const skeletonVariants = {
    initial: { opacity: 0.6 },
    animate: { opacity: 1 },
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatType: "reverse",
    },
  };

  return (
    <SkeletonContainer>
      <GallerySkeleton>
        <MainImageSkeleton
          variants={skeletonVariants}
          initial="initial"
          animate="animate"
        />
        <ThumbnailContainer>
          {[...Array(4)].map((_, index) => (
            <ThumbnailSkeleton
              key={index}
              variants={skeletonVariants}
              initial="initial"
              animate="animate"
            />
          ))}
        </ThumbnailContainer>
      </GallerySkeleton>

      <ProductInfoSkeleton>
        <TitleSkeleton
          variants={skeletonVariants}
          initial="initial"
          animate="animate"
        />
        <PriceSkeleton
          variants={skeletonVariants}
          initial="initial"
          animate="animate"
        />
        <RatingSkeleton
          variants={skeletonVariants}
          initial="initial"
          animate="animate"
        />
        <DescriptionSkeleton
          variants={skeletonVariants}
          initial="initial"
          animate="animate"
        />

        <StatusSkeleton>
          <StatusItemSkeleton
            variants={skeletonVariants}
            initial="initial"
            animate="animate"
          />
          <StatusItemSkeleton
            variants={skeletonVariants}
            initial="initial"
            animate="animate"
          />
        </StatusSkeleton>

        <ButtonSkeleton
          variants={skeletonVariants}
          initial="initial"
          animate="animate"
        />

        <ReviewsSkeleton>
          {[...Array(3)].map((_, index) => (
            <ReviewItemSkeleton
              key={index}
              variants={skeletonVariants}
              initial="initial"
              animate="animate"
            />
          ))}
        </ReviewsSkeleton>
      </ProductInfoSkeleton>
    </SkeletonContainer>
  );
};

export default ProductDetailLoadingSkeleton;
