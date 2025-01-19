// Cart.jsx
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart, clearCart } from "../Store/cartSlice";
import { addAction } from "../store/historySlice";
import EmptyCart from "../components/Cart/EmptyCart";
import { useNavigate } from "react-router-dom";

const CartContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const CartTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(120deg, #2196f3, #f44336);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ClearButton = styled(motion.button)`
  background: #ff416c;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #ff6b81;
  }
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CartItem = styled(motion.div)`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ProductTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
`;

const ProductPrice = styled.span`
  font-size: 1.1rem;
  color: #2196f3;
  font-weight: 600;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: linear-gradient(120deg, #2196f3, #f44336);
  padding: 0.5rem 1rem;
  border-radius: 30px;
`;

const QuantityButton = styled(motion.button)`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityText = styled.span`
  color: white;
  font-size: 1.1rem;
  min-width: 2rem;
  text-align: center;
`;

const CartSummary = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: ${(props) => (props.total ? "1.5rem" : "1.1rem")};
  font-weight: ${(props) => (props.total ? "700" : "400")};
`;

const PlaceOrderButton = styled(motion.button)`
  background: linear-gradient(120deg, #2196f3, #f44336);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 30px;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: fit-content;
  margin-left: auto;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Cart = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.count, 0)
      .toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(addToCart(item));
  };

  const handleDecrement = (item) => {
    dispatch(removeFromCart(item.id));
  };

  const handlePlaceOrder = () => {
    const order = {
      date: new Date().toISOString(),
      items: cart,
      total: parseFloat(calculateTotal()),
    };

    dispatch(addAction(order));
    dispatch(clearCart());
    navigate("/history");
  };

  return (
    <CartContainer>
      <CartHeader>
        <CartTitle>Your Cart</CartTitle>
        <ClearButton
          onClick={() => dispatch(clearCart())}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaTrash /> Clear Cart
        </ClearButton>
      </CartHeader>

      <CartItems>
        {cart.map((item) => (
          <CartItem
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <ProductImage src={item.thumbnail} alt={item.title} />
            <ProductInfo>
              <ProductTitle>{item.title}</ProductTitle>
              <ProductPrice>
                ${(item.price * item.count).toFixed(2)}
              </ProductPrice>
            </ProductInfo>
            <QuantityControl>
              <QuantityButton
                onClick={() => handleDecrement(item)}
                whileTap={{ scale: 0.95 }}
                disabled={item.count <= 0}
              >
                <FaMinus />
              </QuantityButton>
              <QuantityText>{item.count}</QuantityText>
              <QuantityButton
                onClick={() => handleIncrement(item)}
                whileTap={{ scale: 0.95 }}
                disabled={item.count >= item.stock}
              >
                <FaPlus />
              </QuantityButton>
            </QuantityControl>
          </CartItem>
        ))}
      </CartItems>

      <CartSummary>
        <SummaryRow>
          <span>Subtotal:</span>
          <span>${calculateTotal()}</span>
        </SummaryRow>
        <SummaryRow>
          <span>Shipping:</span>
          <span>FREE</span>
        </SummaryRow>
        <hr />
        <SummaryRow total>
          <span>Total:</span>
          <span>${calculateTotal()}</span>
        </SummaryRow>
      </CartSummary>

      <PlaceOrderButton
        onClick={handlePlaceOrder}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={cart.length === 0}
      >
        Place Order
      </PlaceOrderButton>
    </CartContainer>
  );
};

export default Cart;
