import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaHome, FaSearch } from "react-icons/fa";

const NotFoundContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 80vh;
  justify-content: center;
`;

const ErrorCode = styled(motion.h1)`
  font-size: 8rem;
  font-weight: 900;
  margin: 0;
  background: linear-gradient(120deg, #2196f3, #f44336);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 6rem;
  }
`;

const ErrorMessage = styled(motion.h2)`
  font-size: 2rem;
  color: #333;
  margin: 1rem 0 2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const ActionButton = styled(motion.button)`
  background: ${(props) =>
    props.primary
      ? "linear-gradient(120deg, #2196f3, #f44336)"
      : "transparent"};
  color: ${(props) => (props.primary ? "white" : "#333")};
  border: ${(props) => (props.primary ? "none" : "2px solid #333")};
  padding: 1rem 2rem;
  border-radius: 30px;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
    background: ${(props) =>
      props.primary
        ? "linear-gradient(120deg, #1976d2, #d32f2f)"
        : "rgba(0, 0, 0, 0.1)"};
  }
`;

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <NotFoundContainer>
      <ErrorCode
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        404
      </ErrorCode>

      <ErrorMessage
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Page Not Found
      </ErrorMessage>

      <Description
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Oops! The page you're looking for seems to have vanished into thin air.
        Don't worry though, you can always head back home or search for
        something else.
      </Description>

      <ButtonContainer>
        <ActionButton
          primary
          onClick={() => navigate("/")}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <FaHome /> Back to Home
        </ActionButton>
      </ButtonContainer>
    </NotFoundContainer>
  );
};

export default NotFound;
