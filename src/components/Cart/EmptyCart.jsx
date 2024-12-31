// components/Cart/EmptyCart.jsx
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const EmptyCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 2rem;
`;

const EmptyCartIcon = styled(FaShoppingCart)`
  font-size: 5rem;
  color: #ccc;
`;

const EmptyCartText = styled.h2`
  font-size: 1.5rem;
  color: #666;
  text-align: center;
`;

const ShopNowButton = styled(motion(Link))`
  background: linear-gradient(120deg, #2196f3, #f44336);
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 30px;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const EmptyCart = () => {
  return (
    <EmptyCartContainer>
      <EmptyCartIcon />
      <EmptyCartText>Your cart is empty</EmptyCartText>
      <ShopNowButton
        to="/"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Continue Shopping
      </ShopNowButton>
    </EmptyCartContainer>
  );
};

export default EmptyCart;
