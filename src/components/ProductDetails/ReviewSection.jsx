// ReviewSection.jsx
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const ReviewContainer = styled.div`
  margin-top: 3rem;
`;

const ReviewCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 15px;
  margin-bottom: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

export const ReviewSection = ({ reviews }) => {
  return (
    <ReviewContainer>
      <h2>Customer Reviews</h2>
      {reviews?.map((review, index) => (
        <ReviewCard
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="rating">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                color={i < review.rating ? "#ffc107" : "#e4e5e9"}
              />
            ))}
          </div>
          <p>{review.comment}</p>
          <small>
            {review.reviewerName} - {new Date(review.date).toLocaleDateString()}
          </small>
        </ReviewCard>
      ))}
    </ReviewContainer>
  );
};
