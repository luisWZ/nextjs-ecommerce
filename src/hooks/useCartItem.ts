import { useContext, useEffect, useMemo, useState } from 'react';

import { CartContext } from '@/context';
import { Cart } from '@/interface';
import { config } from '@/lib';

export const useCartItem = ({
  size,
  slug,
  quantity: itemQuantity,
}: Pick<Cart, 'size' | 'slug' | 'quantity'>) => {
  const { cart, cartRemoveProduct, cartStockAvailablePerItem, cartModifyItemQuantity } =
    useContext(CartContext);

  const maxStock = useMemo(
    () => cartStockAvailablePerItem(slug),
    [cartStockAvailablePerItem, slug]
  );

  const [quantity, setQuantity] = useState(itemQuantity);
  const [stockAvailable, setStockAvailable] = useState(maxStock());

  useEffect(() => {
    setStockAvailable(maxStock());
  }, [cart, maxStock]);

  const modifyQuantity = (operation: '-' | '+') => {
    return operation === '-'
      ? () => {
          if (quantity <= 1) return;
          const newQuantity = quantity - 1;
          setQuantity(newQuantity);
          cartModifyItemQuantity(newQuantity, { slug, size });
        }
      : () => {
          if (!stockAvailable || quantity === config.MAX_CART_ITEMS_PER_SIZE) return;
          const newQuantity = quantity + 1;
          setQuantity(newQuantity);
          cartModifyItemQuantity(newQuantity, { slug, size });
        };
  };

  return {
    cartRemoveProduct,
    quantity,
    modifyQuantity,
  };
};
