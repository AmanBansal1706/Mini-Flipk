import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import ProductCard from "../components/Home/ProductCard";
import Categories from "../components/Home/Category";
import HomeLoadingSkeleton from "../components/Common/HomeLoadingSkeleton";
import { useGetProduct } from "../services/Query/ProductQuery";

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

const CategoryToggle = styled(motion.button)`
  position: fixed;
  left: ${(props) => (props.isOpen ? "240px" : "0")};
  top: 50%;
  transform: translateY(-50%);
  background: #2874f0;
  border: none;
  color: white;
  padding: 1rem 0.5rem;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  z-index: 1000;
  transition: left 0.3s ease;

  &:hover {
    background: #1f5bc6;
  }
`;

const Sidebar = styled(motion.div)`
  position: fixed;
  left: 0;
  bottom: 0;
  height: calc(100vh - 80px);
  width: 240px;
  background: white;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  padding: 2rem 0;
  overflow-y: auto;
  z-index: 999;
`;

const WelcomeBanner = styled(motion.div)`
  background: linear-gradient(135deg, #2874f0, #1f5bc6);
  color: white;
  padding: 2rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  text-align: center;
  margin-left: ${(props) => (props.isSidebarOpen ? "240px" : "0")};
  transition: margin-left 0.3s ease;

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    opacity: 0.9;
  }
`;

const ProductGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-left: ${(props) => (props.isSidebarOpen ? "240px" : "0")};
  transition: margin-left 0.3s ease;
`;

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const {
    data: products,
    isLoading: loading,
    error,
    isError,
  } = useGetProduct(category, query);

  return (
    <PageContainer>
      <CategoryToggle
        isOpen={isSidebarOpen}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        whileTap={{ scale: 0.95 }}
      >
        {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
      </CategoryToggle>

      <AnimatePresence>
        {isSidebarOpen && (
          <Sidebar
            initial={{ x: -240 }}
            animate={{ x: 0 }}
            exit={{ x: -240 }}
            transition={{ type: "tween" }}
          >
            <Categories />
          </Sidebar>
        )}
      </AnimatePresence>

      <WelcomeBanner
        isSidebarOpen={isSidebarOpen}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Welcome to Mini Flipkart</h1>
        <p>Discover amazing products at great prices</p>
      </WelcomeBanner>

      {loading && <HomeLoadingSkeleton isSidebarOpen={isSidebarOpen} />}
      {isError && <p style={{ color: "#FF416C" }}>{error.message}</p>}

      <ProductGrid
        isSidebarOpen={isSidebarOpen}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {!loading && !isError && products?.length === 0 && (
          <p>No products found for {query || category}</p>
        )}

        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductGrid>
    </PageContainer>
  );
}

export default Home;
