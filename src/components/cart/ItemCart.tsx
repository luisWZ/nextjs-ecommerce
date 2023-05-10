
import { ItemUi } from '@/cart';
import { useItemCart } from '@/hooks';
import { Cart } from '@/interface';

interface ItemCartProps {
  item: Cart;
  editable: boolean;
}

export const ItemCart = ({ item, editable }: ItemCartProps) => {
  const { cartRemoveProduct, quantity, modifyQuantity } = useItemCart({
    size: item.size,
    slug: item.slug,
    quantity: item.quantity,
  });

  return (
    <ItemUi
      itemType="CART"
      item={{ ...item, quantity: quantity }}
      editable={editable}
      modifyQuantity={modifyQuantity}
      cartRemoveProduct={cartRemoveProduct}
    />
  );
};
