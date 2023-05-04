import { Product, ValidSizes } from '@prisma/client';
import { useContext, useState } from 'react';

import { CartContext } from '@/context';
import { Cart } from '@/interface';
import { config } from '@/utils';

export const useProductDetailPage = (product: Product) => {
  const { images, title, price, inStock, slug, gender } = product;

  const { cartAddProduct } = useContext(CartContext);

  const [maxStock, setMaxStock] = useState(inStock);

  const [tempCartProduct, setTempCartProduct] = useState<Cart>({
    price,
    title,
    slug,
    gender,
    inStock,
    quantity: 1,
    image: images[0],
  });

  const modifyQuantity = (operation: '-' | '+') => {
    return operation === '-'
      ? () => {
          const quantity = tempCartProduct.quantity;
          if (quantity <= 1) return;
          setTempCartProduct({ ...tempCartProduct, quantity: quantity - 1 });
        }
      : () => {
          const quantity = tempCartProduct.quantity;
          if (quantity >= maxStock || quantity === config.MAX_CART_ITEMS_PER_SIZE) return;
          setTempCartProduct({ ...tempCartProduct, quantity: quantity + 1 });
        };
  };

  const onSelectedSize = (size: ValidSizes) => () => {
    setTempCartProduct({ ...tempCartProduct, size });
  };

  const onClickAddToCart = () => {
    if (!tempCartProduct.size) return;

    cartAddProduct(tempCartProduct);

    const newQuantity = maxStock - tempCartProduct.quantity;

    if (newQuantity < 1) {
      setMaxStock(0);
      setTempCartProduct({} as Cart);
    } else {
      setMaxStock(newQuantity);
      setTempCartProduct({ ...tempCartProduct, quantity: 1, size: undefined });
    }
  };

  return {
    tempCartProduct,
    maxStock,
    modifyQuantity,
    onSelectedSize,
    onClickAddToCart,
  };
};
