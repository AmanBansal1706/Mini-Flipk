import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaStar, FaTruck, FaBox } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Card = styled(motion.div)`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    cursor: pointer;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background: #f8f9fa;
`;

// const ProductImage = styled.img`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   transition: transform 0.3s ease;
// `;
const ProductImage = styled(motion.img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #ff416c;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
`;

const ContentContainer = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: #2d3436;
`;

const Price = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: #2d3436;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  font-size: 1rem;
  color: #b2bec3;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 1rem;
`;

const Star = styled(FaStar)`
  color: ${(props) => (props.filled ? "#ffd700" : "#dfe6e9")};
`;

const StatusContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #f1f2f6;
`;

const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: ${(props) => props.color || "#636e72"};
`;

const Tag = styled.span`
  background: #f1f2f6;
  color: #636e72;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  display: inline-block;
`;

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    tags,
    shippingInformation,
    thumbnail,
    availabilityStatus,
  } = product;

  const discountedPrice = price - (price * discountPercentage) / 100;
  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };
  return (
    <Card
      onClick={handleClick}
      whileHover={{ translateY: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ImageContainer>
        <ProductImage src={thumbnail} alt={title} loading="lazy" />
        {discountPercentage > 0 && (
          <DiscountBadge>{Math.round(discountPercentage)}% OFF</DiscountBadge>
        )}
      </ImageContainer>

      <ContentContainer>
        <Title>{title}</Title>

        <Rating>
          {[...Array(5)].map((_, index) => (
            <Star key={index} filled={index < Math.floor(rating)} size={16} />
          ))}
          <span style={{ color: "#636e72", fontSize: "0.9rem" }}>
            ({rating.toFixed(1)})
          </span>
        </Rating>

        <Price>
          ${discountedPrice.toFixed(2)}
          {discountPercentage > 0 && (
            <OriginalPrice>${price.toFixed(2)}</OriginalPrice>
          )}
        </Price>

        <div style={{ marginBottom: "1rem" }}>
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        <p
          style={{
            fontSize: "0.9rem",
            color: "#636e72",
            margin: "0 0 1rem 0",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {description}
        </p>

        <StatusContainer>
          <Status color={stock <= 5 ? "#FF416C" : "#20bf6b"}>
            <FaBox />
            {stock} left
          </Status>
          <Status>
            <FaTruck />
            {shippingInformation}
          </Status>
        </StatusContainer>
      </ContentContainer>
    </Card>
  );
};

export default ProductCard;
