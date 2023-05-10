import { OrderItem } from '@prisma/client';

import { ItemUi } from '@/cart';

interface ItemSummaryProps {
  item: OrderItem;
}

export const ItemSummary = ({ item }: ItemSummaryProps) => {
  return <ItemUi itemType="ORDER_ITEM" item={item} />;
};
