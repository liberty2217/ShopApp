export const routes = {
  navigators: {
    App: 'AppNavigator',
    Auth: 'AuthNavigator',
    Products: 'ProductsNavigator',
  },
  tabNavigators: {
    Shop: 'ShopNavigator',
    Orders: 'OrdersNavigator',
    Admin: 'AdminNavigator',
  },
  ordersTab: {
    shopOrders: 'ShopOrders',
  },
  authStack: {
    auth: 'Auth',
  },
  productsStack: {
    shopProductsOverview: 'ShopProductsOverview',
    shopProductDetails: 'ShopProductDetails',
    shopCart: 'ShopCart',
  },
  adminStack: {
    userProducts: 'UserProducts',
    userEditProducts: 'UserEditProduct',
  },
};
