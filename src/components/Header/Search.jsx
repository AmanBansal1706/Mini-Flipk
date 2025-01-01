import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetSearchSuggestions } from "../../services/query/ProductQuery";
import LoadingIndicator from "../Common/LoadingIndicator";
import debounce from "lodash/debounce";

const SearchWrapper = styled.div`
  position: relative;
  width: 80%;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 3rem;
  border: none;
  border-radius: 12px;
  background: #ffffff;
  font-size: 1rem;
  outline: none;
  transition: box-shadow 0.3s ease;

  &:focus {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  }
`;

const SearchIcon = styled(motion.div)`
  position: absolute;
  left: 1rem;
  color: #666;
  font-size: 1.2rem;
`;

const SuggestionsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 4px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
`;

const SuggestionItem = styled.div`
  padding: 0.8rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
  }
`;

function Search() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const key = searchParams.get("search") || "";
  const [query, setQuery] = useState(key);
  const [debouncedQuery, setDebouncedQuery] = useState(key);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const {
    data: suggestions = [],
    error,
    isLoading,
    isError,
  } = useGetSearchSuggestions(debouncedQuery);

  // Debounce function for updating search query
  const debouncedSetQuery = useCallback(
    debounce((value) => {
      setDebouncedQuery(value);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSetQuery(query);
    return () => {
      debouncedSetQuery.cancel();
    };
  }, [query, debouncedSetQuery]);

  if (location.pathname !== "/" && !location.pathname.startsWith("/product/")) {
    return null;
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(true);

    // if (!value && location.pathname !== "/") {
    //   navigate(`/`);
    // }
  };

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      setShowSuggestions(false);
      navigate(`/?search=${query}`);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    navigate(`/?search=${suggestion}`);
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow click events to register
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  return (
    <SearchWrapper>
      <SearchIcon whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <FaSearch />
      </SearchIcon>
      <SearchInput
        type="text"
        placeholder="Search for products..."
        value={query}
        onChange={handleChange}
        onKeyDown={handleSubmit}
        onFocus={() => setShowSuggestions(true)}
        onBlur={handleBlur}
      />

      {isLoading && showSuggestions && (
        <SuggestionsContainer>
          <SuggestionItem>
            <LoadingIndicator />
          </SuggestionItem>
        </SuggestionsContainer>
      )}

      {showSuggestions && suggestions.length > 0 && !isLoading && (
        <SuggestionsContainer>
          {suggestions.map((suggestion, index) => (
            <SuggestionItem
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </SuggestionItem>
          ))}
        </SuggestionsContainer>
      )}
    </SearchWrapper>
  );
}

export default Search;
