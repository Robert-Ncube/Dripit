import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminProductsSlice from "./admin/productsSlice";
import ShopProductSlice from "./shop/productSlice";
import ShopCartSlice from "./cartSlice";
import AddressSlice from "./shop/addressSlice";
import shopOrderSlice from "./shop/orderSlice";
import adminOrderSlice from "./admin/orderSlice";
import searchProductSlice from "./shop/searchSlice";
import reviewProductSlice from "./shop/reviewSlice";
import FeatureSlice from "./common/featureSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsSlice,
    ShopProducts: ShopProductSlice,
    ShopCart: ShopCartSlice,
    ShopAddress: AddressSlice,
    ShopOrder: shopOrderSlice,
    AdminOrder: adminOrderSlice,
    ShopSearch: searchProductSlice,
    ProductReviews: reviewProductSlice,
    CommonFeatures: FeatureSlice,
  },
});

export default store;
