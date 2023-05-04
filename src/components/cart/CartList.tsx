import { useContext } from 'react';

import { CartContext } from '@/context';

import { CartItem } from './CartItem';

interface CartListProps {
  editable?: boolean;
}

export const CartList = ({ editable = false }: CartListProps) => {
  const { cart } = useContext(CartContext);

  return (
    <>
      {cart.map((item) => (
        <CartItem key={`${item.slug}_${item.size}`} editable={editable} item={item} />
      ))}
    </>
  );
};
