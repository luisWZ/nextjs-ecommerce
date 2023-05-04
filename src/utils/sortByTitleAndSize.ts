import { ValidSizes } from '@prisma/client';

import { Cart } from '@/interface';

const sizesArr = Object.keys(ValidSizes);

function sizeEnum(size: ValidSizes) {
  return sizesArr.findIndex((_size_) => _size_ === size);
}

export const sortByTitleAndSize = (a: Cart, b: Cart) => {
  if (a.title > b.title) return 1;
  if (a.title < b.title) return -1;
  if (sizeEnum(a.size!) > sizeEnum(b.size!)) return 1;
  if (sizeEnum(a.size!) < sizeEnum(b.size!)) return -1;
  return 0;
};
