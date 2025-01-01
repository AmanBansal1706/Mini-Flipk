import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useGetProductCategories } from "../../services/query/ProductQuery";
import CategoriesLoadingSkeleton from "../Common/CategoriesLoadingSkeleton";

// Styled components
const Container = styled.div`
  overflow-y: auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  /* Smooth scroll */
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

const CategoryLink = styled(Link)`
  display: block;
  padding: 0.8rem 1.5rem;
  color: #333;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background: #2874f0;
    color: #fff;
    padding-left: 1.8rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ErrorText = styled.p`
  color: #ff416c;
  text-align: center;
  font-weight: bold;
  margin-top: 1rem;
`;

function Categories() {
  const {
    data: categories,
    isLoading: loading,
    error,
    isError,
  } = useGetProductCategories();

  if (loading) {
    return <CategoriesLoadingSkeleton />;
  }

  if (isError) {
    return <ErrorText>{error.message}</ErrorText>;
  }

  return (
    <Container>
      {categories?.map((category, index) => (
        <CategoryLink key={index} to={`/?category=${category}`}>
          {category}
        </CategoryLink>
      ))}
    </Container>
  );
}

export default Categories;
