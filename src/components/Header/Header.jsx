import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaHome, FaShoppingCart, FaHistory } from "react-icons/fa";
import Search from "./Search";
import { FaUser } from "react-icons/fa6";

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #2874f0, #1e5bc8);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Logo = styled(motion(Link))`
  color: white;
  font-size: 2rem;
  font-weight: 700;
  cursor: pointer;
  margin: 0;
  text-decoration: none;

  span {
    color: #ffd700;
  }
`;

const SearchContainer = styled.div`
  flex: 1;
  max-width: 600px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: space-around;
    width: 100%;
  }
`;

const StyledLink = styled(motion(Link))`
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-weight: 500;
  font-size: 1rem;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: white;
  color: #1e5bc8;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
`;

function Header() {
  const cartCount = useSelector((state) => state.cart.items.length);
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} to="/">
          Mudit's<span>Store</span>
        </Logo>

        <SearchContainer>
          <Search />
        </SearchContainer>

        <NavLinks>
          <StyledLink
            to="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaHome /> Home
          </StyledLink>

          <StyledLink
            to="/cart"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ position: "relative" }}
          >
            <FaShoppingCart /> Cart
            {cartCount > 0 && <CartCount>{cartCount}</CartCount>}
          </StyledLink>

          <StyledLink
            to="/history"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaHistory /> History
          </StyledLink>

          <StyledLink
            to="/profile"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaUser /> Profile
          </StyledLink>
        </NavLinks>
      </HeaderContent>
    </HeaderContainer>
  );
}

export default Header;
