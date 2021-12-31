import { Products } from '../../data/type';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export const deleteProduct = (productId: Products['id']) => {
  return { type: DELETE_PRODUCT, pid: productId };
};
