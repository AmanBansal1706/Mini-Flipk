import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingIndicatorStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;

  &::after {
    content: "";
    width: 40px;
    height: 40px;
    border: 4px solid #ddd;
    border-top: 4px solid #2874f0;
    border-radius: 50%;
    animation: ${spin} 0.8s linear infinite;
  }
`;

function LoadingIndicator() {
  return <LoadingIndicatorStyle />;
}

export default LoadingIndicator;
