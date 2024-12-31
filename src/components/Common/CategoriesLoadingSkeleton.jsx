import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled.div`
  overflow-y: auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  scrollbar-width: thin;
  scrollbar-color: #2874f0 #f5f5f5;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #2874f0;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: #f5f5f5;
  }
`;

const SkeletonPulse = styled(motion.div)`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: pulse 1.5s ease-in-out infinite;
  border-radius: 4px;

  @keyframes pulse {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const CategorySkeleton = styled(SkeletonPulse)`
  height: 44px;
  margin: 0.5rem 0;
`;

const CategoriesLoadingSkeleton = () => {
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
    <Container>
      {[...Array(12)].map((_, index) => (
        <CategorySkeleton
          key={index}
          variants={skeletonVariants}
          initial="initial"
          animate="animate"
          style={{ width: `${Math.random() * (95 - 70) + 70}%` }}
        />
      ))}
    </Container>
  );
};

export default CategoriesLoadingSkeleton;
