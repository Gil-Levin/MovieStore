import { useCartItemsApi } from '../services/useCartItemsApi';

export const useAddToCart = () => {
  const { addItem } = useCartItemsApi();

  const handleAddToCart = async (productId) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.userId) {
      console.error('User not found in local storage');
      return;
    }

    const cartItem = {
      itemID: 0,
      cartId: user.userId,
      productID: productId,
      quantity: 1
    };

    try {
      await addItem(cartItem);
      console.log('Item added to cart successfully');
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return { handleAddToCart };
};
