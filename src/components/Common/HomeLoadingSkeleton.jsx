import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const SkeletonContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
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

const ProductGridSkeleton = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-left: ${(props) => (props.isSidebarOpen ? "240px" : "0")};
  transition: margin-left 0.3s ease;
`;

const ProductCardSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 400px;
`;

const ImageSkeleton = styled(SkeletonPulse)`
  width: 100%;
  height: 200px;
`;

const ContentContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const TitleSkeleton = styled(SkeletonPulse)`
  height: 24px;
  width: 80%;
`;

const PriceSkeleton = styled(SkeletonPulse)`
  height: 20px;
  width: 40%;
`;

const RatingSkeleton = styled(SkeletonPulse)`
  height: 20px;
  width: 60%;
`;

const DescriptionSkeleton = styled(SkeletonPulse)`
  height: 40px;
  width: 100%;
`;

const HomeLoadingSkeleton = ({ isSidebarOpen = true }) => {
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
      <ProductGridSkeleton isSidebarOpen={isSidebarOpen}>
        {[...Array(8)].map((_, index) => (
          <ProductCardSkeleton key={index}>
            <ImageSkeleton
              variants={skeletonVariants}
              initial="initial"
              animate="animate"
            />
            <ContentContainer>
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
            </ContentContainer>
          </ProductCardSkeleton>
        ))}
      </ProductGridSkeleton>
    </SkeletonContainer>
  );
};

export default HomeLoadingSkeleton;
