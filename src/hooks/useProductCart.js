import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../Store/cartSlice";

const useProductCart = (product) => {
  const dispatch = useDispatch();
  const existingItem = useSelector((state) =>
    state.cart.items.find((item) => item.id === product?.id)
  );

  const alreadyInCart = !!existingItem;
  const count = existingItem ? existingItem.count : 0;

  const handleAdd = () => {
    if (!product) return;
    dispatch(addToCart(product));
  };

  const handleRemove = () => {
    if (!product) return;
    dispatch(removeFromCart(product?.id));
  };

  return {
    alreadyInCart,
    count,
    addProductInCart: handleAdd,
    removeProductFromCart: handleRemove,
  };
};

export default useProductCart;
