import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";
import Footer from "../components/Footer/Footer";

const ScrollToTopButton = styled(motion.button)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(120deg, #2196f3, #f44336);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  z-index: 1000;

  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
`;

const MainContent = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const OutletContainer = styled.div`
  flex: 1;
  min-height: 90vh;
`;

function Layout() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [location]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <MainContent>
      <Header />
      <OutletContainer>
        <Outlet />
      </OutletContainer>
      <Footer />
      <AnimatePresence>
        {showScrollButton && (
          <ScrollToTopButton
            onClick={scrollToTop}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaArrowUp size={20} />
          </ScrollToTopButton>
        )}
      </AnimatePresence>
    </MainContent>
  );
}

export default Layout;
