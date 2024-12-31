// History.jsx
import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { clearHistory } from "../store/historySlice";
import { Link } from "react-router-dom";
import {
  FaHistory,
  FaTrash,
  FaBox,
  FaCalendar,
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaFilter,
  FaEllipsisH,
} from "react-icons/fa";

const HistoryContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const HistoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const HistoryTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(120deg, #2196f3, #f44336);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SearchContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const SearchInput = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;

  input {
    width: 100%;
    padding: 0.8rem 1.5rem;
    padding-left: 3rem;
    border-radius: 30px;
    border: 1px solid #ddd;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: #2196f3;
    }
  }

  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  border: 1px solid #ddd;
  background: ${(props) => (props.active ? "#2196f3" : "white")};
  color: ${(props) => (props.active ? "white" : "#333")};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${(props) => (props.active ? "#1976d2" : "#f5f5f5")};
  }
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

const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const OrderCard = styled(motion.div)`
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const OrderHeader = styled.div`
  background: linear-gradient(120deg, #2196f3, #f44336);
  color: white;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const OrderPreview = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background: #ffffff;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const PreviewInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MoreItems = styled.span`
  color: #666;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  background: #e9ecef;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const OrderDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const OrderTotal = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const OrderItems = styled(motion.div)`
  padding: 1.5rem;
  background: white;
  overflow: hidden;
`;

const OrderItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1.5rem;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ItemTitle = styled.h3`
  font-size: 1.1rem;
  color: #333;
  margin: 0;
`;

const ItemPrice = styled.span`
  color: #2196f3;
  font-weight: 600;
`;

const ItemQuantity = styled.span`
  color: #666;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const EmptyHistory = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 2rem;
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

const History = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [expandedOrders, setExpandedOrders] = useState({});

  let actions = useSelector((state) => state.history.actions);
  actions = actions.slice().reverse();

  const dispatch = useDispatch();

  const toggleOrder = (index, itemCount) => {
    if (itemCount > 1) {
      setExpandedOrders((prev) => ({
        ...prev,
        [index]: !prev[index],
      }));
    }
  };

  const filteredActions = useMemo(() => {
    return actions.filter((order) => {
      const matchesSearch = order.items.some((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const orderDate = new Date(order.date);
      const today = new Date();
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

      let matchesDate = true;
      if (dateFilter === "today") {
        matchesDate = orderDate.toDateString() === today.toDateString();
      } else if (dateFilter === "week") {
        matchesDate = orderDate >= weekAgo;
      } else if (dateFilter === "month") {
        matchesDate = orderDate >= monthAgo;
      }

      return matchesSearch && matchesDate;
    });
  }, [actions, searchTerm, dateFilter]);

  if (actions.length === 0) {
    return (
      <EmptyHistory>
        <FaHistory size={64} color="#ccc" />
        <h2>No order history yet</h2>
        <p>Your ordered items will appear here</p>
        <ShopNowButton
          to="/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Continue Shopping
        </ShopNowButton>
      </EmptyHistory>
    );
  }

  return (
    <HistoryContainer>
      <HistoryHeader>
        <HistoryTitle>Order History</HistoryTitle>
        <ClearButton
          onClick={() => dispatch(clearHistory())}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaTrash /> Clear History
        </ClearButton>
      </HistoryHeader>

      <SearchContainer>
        <SearchInput>
          <FaSearch />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchInput>
        <FilterContainer>
          <FilterButton
            active={dateFilter === "all"}
            onClick={() => setDateFilter("all")}
          >
            <FaFilter /> All Time
          </FilterButton>
          <FilterButton
            active={dateFilter === "today"}
            onClick={() => setDateFilter("today")}
          >
            <FaFilter /> Today
          </FilterButton>
          <FilterButton
            active={dateFilter === "week"}
            onClick={() => setDateFilter("week")}
          >
            <FaFilter /> This Week
          </FilterButton>
          <FilterButton
            active={dateFilter === "month"}
            onClick={() => setDateFilter("month")}
          >
            <FaFilter /> This Month
          </FilterButton>
        </FilterContainer>
      </SearchContainer>

      <OrdersList>
        <AnimatePresence>
          {filteredActions.map((order, index) => (
            <OrderCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <OrderHeader
                onClick={() => toggleOrder(index, order.items.length)}
              >
                <OrderDate>
                  <FaCalendar />
                  {new Date(order.date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </OrderDate>
                <OrderTotal>
                  Total: ${order.total.toFixed(2)}
                  {order.items.length > 1 &&
                    (expandedOrders[index] ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    ))}
                </OrderTotal>
              </OrderHeader>

              {!expandedOrders[index] && order.items.length > 0 && (
                <OrderPreview>
                  <PreviewInfo>
                    <ItemImage
                      src={order.items[0].thumbnail}
                      alt={order.items[0].title}
                    />
                    <ItemInfo>
                      <ItemTitle>{order.items[0].title}</ItemTitle>
                      <ItemPrice>
                        $
                        {(order.items[0].price * order.items[0].count).toFixed(
                          2
                        )}
                      </ItemPrice>
                    </ItemInfo>
                  </PreviewInfo>
                  {order.items.length > 1 ? (
                    <MoreItems>
                      <FaEllipsisH /> {order.items.length - 1} more items
                    </MoreItems>
                  ) : (
                    <ItemQuantity>
                      <FaBox /> {order.items[0].count}{" "}
                      {order.items[0].count === 1 ? "item" : "items"}
                    </ItemQuantity>
                  )}
                </OrderPreview>
              )}

              <AnimatePresence>
                {expandedOrders[index] && (
                  <OrderItems
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                      transition: {
                        height: {
                          duration: 0.4,
                          ease: [0.04, 0.62, 0.23, 0.98],
                        },
                        opacity: {
                          duration: 0.25,
                          delay: 0.1,
                        },
                      },
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                      transition: {
                        height: {
                          duration: 0.4,
                          ease: [0.04, 0.62, 0.23, 0.98],
                        },
                        opacity: {
                          duration: 0.25,
                        },
                      },
                    }}
                  >
                    {order.items.map((item, itemIndex) => (
                      <OrderItem key={itemIndex}>
                        <ItemImage src={item.thumbnail} alt={item.title} />
                        <ItemInfo>
                          <ItemTitle>{item.title}</ItemTitle>
                          <ItemPrice>
                            ${(item.price * item.count).toFixed(2)}
                          </ItemPrice>
                        </ItemInfo>
                        <ItemQuantity>
                          <FaBox /> {item.count}{" "}
                          {item.count === 1 ? "item" : "items"}
                        </ItemQuantity>
                      </OrderItem>
                    ))}
                  </OrderItems>
                )}
              </AnimatePresence>
            </OrderCard>
          ))}
        </AnimatePresence>
      </OrdersList>
    </HistoryContainer>
  );
};

export default History;
