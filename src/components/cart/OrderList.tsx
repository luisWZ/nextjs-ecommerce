import { OrderItem } from '@prisma/client';
import { useContext } from 'react';

import { ItemCart, ItemSummary } from '@/cart';
import { CartContext } from '@/context';

interface OrderListProps {
  editable?: boolean;
  orderItems?: OrderItem[];
}

export const OrderList = ({ editable = false, orderItems }: OrderListProps) => {
  const { cart } = useContext(CartContext);

  return orderItems ? (
    <>
      {orderItems.map((item) => (
        <ItemSummary key={`${item.slug}_${item.size}`} item={item} />
      ))}
    </>
  ) : (
    <>
      {cart.map((item) => (
        <ItemCart key={`${item.slug}_${item.size}`} editable={editable} item={item} />
      ))}
    </>
  );
};
