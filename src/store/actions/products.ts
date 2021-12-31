import { Products } from '../../data/type';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteProduct = (productId: Products['id']) => {
  return { type: DELETE_PRODUCT, pid: productId };
};

export const createProduct = (
  title: Products['title'],
  description: Products['description'],
  imageUrl: Products['imageUrl'],
  price: Products['price'],
) => {
  return {
    type: CREATE_PRODUCT,
    productData: {
      title,
      description,
      imageUrl,
      price,
    },
  };
};

export const updateProduct = (
  id: Products['id'],
  title: Products['title'],
  description: Products['description'],
  imageUrl: Products['imageUrl'],
) => {
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      title,
      description,
      imageUrl,
    },
  };
};
