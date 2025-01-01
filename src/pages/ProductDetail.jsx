import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaStar,
  FaShoppingCart,
  FaTruck,
  FaBox,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import { ReviewSection } from "../components/ProductDetails/ReviewSection";
import { ProductGallery } from "../components/ProductDetails/ProductGallery";
import { useParams } from "react-router-dom";
import HomeLoadingSkeleton from "../components/Common/HomeLoadingSkeleton";
import ProductDetailLoadingSkeleton from "../components/Common/ProductDetailLoadingSkeleton";
import useProductCart from "../hooks/useProductCart";
import {
  useGetProductById,
  useGetProduct,
} from "../services/query/ProductQuery";
import ProductCard from "../components/Home/ProductCard";

const ProductContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ProductInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(120deg, #2196f3, #f44336);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Price = styled.div`
  font-size: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const DiscountBadge = styled.span`
  background: #ff4757;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 1rem;
`;

const AddToCartButton = styled(motion.button)`
  background: linear-gradient(120deg, #2196f3, #f44336);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 30px;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.2s;
  width: fit-content;

  &:hover {
    transform: scale(1.05);
  }
`;

const StatusInfo = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
`;

const StatusItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${(props) => props.color || "#666"};
`;

const ErrorText = styled.p`
  color: #ff416c;
  text-align: center;
  font-weight: bold;
  margin-top: 1rem;
`;

const CartControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #f8f9fa;
  background: linear-gradient(120deg, #2196f3, #f44336);
  padding: 0.5rem 1rem;
  border-radius: 30px;
`;

const QuantityButton = styled(motion.button)`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`;

const QuantityText = styled.span`
  font-size: 1.1rem;
  min-width: 2rem;
  text-align: center;
  color: #ffffff;
`;

const ProductDetails = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 15px;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h3 {
    font-size: 1rem;
    color: #666;
  }

  p {
    font-size: 1.1rem;
    font-weight: 500;
  }
`;

const Tags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background: #e3f2fd;
  color: #2196f3;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
`;

const SimilarProducts = styled.div`
  margin-top: 4rem;

  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
    background: linear-gradient(120deg, #2196f3, #f44336);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const ProductGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ProductDetail = () => {
  const { productId } = useParams();
  const {
    data: product,
    error,
    isLoading: loading,
    isError,
  } = useGetProductById(productId);

  const {
    data: similarProducts,
    isLoading: loadingSimilar,
    error: similarError,
    isError: isSimilarError,
  } = useGetProduct(product?.category, "");

  const { alreadyInCart, count, addProductInCart, removeProductFromCart } =
    useProductCart(product);

  if (loading) return <ProductDetailLoadingSkeleton />;
  if (isError) return <ErrorText>{error.message}</ErrorText>;

  const calculateDiscountedPrice = () => {
    return (
      (product?.price * (100 - product?.discountPercentage)) /
      100
    ).toFixed(2);
  };

  return (
    <ProductContainer>
      <MainContent>
        <ProductGallery
          images={product?.images}
          thumbnail={product?.thumbnail}
        />

        <ProductInfo
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Title>{product?.title}</Title>
          <Tags>
            {product?.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Tags>

          <Price>
            ${calculateDiscountedPrice()}
            <DiscountBadge>{product?.discountPercentage}% OFF</DiscountBadge>
          </Price>

          <div className="rating">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                color={i < Math.floor(product?.rating) ? "#ffc107" : "#e4e5e9"}
              />
            ))}
            <span>({product?.rating})</span>
          </div>

          <p>{product?.description}</p>

          <StatusInfo>
            <StatusItem color={product?.stock <= 5 ? "#ff4757" : "#2ed573"}>
              <FaBox />
              {product?.stock} in stock
            </StatusItem>
            <StatusItem>
              <FaTruck />
              {product?.shippingInformation}
            </StatusItem>
          </StatusInfo>

          <CartControls>
            {!alreadyInCart ? (
              <AddToCartButton
                whileTap={{ scale: 0.95 }}
                onClick={addProductInCart}
                disabled={count >= product?.stock}
              >
                <FaShoppingCart /> Add to Cart
              </AddToCartButton>
            ) : (
              <QuantityControl>
                <QuantityButton
                  onClick={removeProductFromCart}
                  whileTap={{ scale: 0.95 }}
                  disabled={count <= 0}
                >
                  <FaMinus />
                </QuantityButton>
                <QuantityText>{count}</QuantityText>
                <QuantityButton
                  onClick={addProductInCart}
                  whileTap={{ scale: 0.95 }}
                  disabled={count >= product?.stock}
                >
                  <FaPlus />
                </QuantityButton>
              </QuantityControl>
            )}
          </CartControls>

          <ProductDetails>
            <DetailItem>
              <h3>Brand</h3>
              <p>{product?.brand}</p>
            </DetailItem>
            <DetailItem>
              <h3>SKU</h3>
              <p>{product?.sku}</p>
            </DetailItem>
            <DetailItem>
              <h3>Weight</h3>
              <p>{product?.weight} kg</p>
            </DetailItem>
            <DetailItem>
              <h3>Dimensions</h3>
              <p>{`${product?.dimensions.width} x ${product?.dimensions.height} x ${product?.dimensions.depth} cm`}</p>
            </DetailItem>
            <DetailItem>
              <h3>Warranty</h3>
              <p>{product?.warrantyInformation}</p>
            </DetailItem>
            <DetailItem>
              <h3>Return Policy</h3>
              <p>{product?.returnPolicy}</p>
            </DetailItem>
          </ProductDetails>

          <ReviewSection reviews={product?.reviews} />
        </ProductInfo>
      </MainContent>

      <SimilarProducts>
        <h2>Similar Products</h2>
        {loadingSimilar ? (
          <HomeLoadingSkeleton isSidebarOpen={false} />
        ) : (
          <ProductGrid
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {similarProducts
              ?.filter((p) => p.id !== product.id)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </ProductGrid>
        )}
      </SimilarProducts>
    </ProductContainer>
  );
};

export default ProductDetail;
