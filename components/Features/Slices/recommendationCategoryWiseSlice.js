import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  // recommendedCategoryWiseProductData:null,
  productCategories: {},
  hasMoreCategories: false,
  loader:false
};

export const recommendationCategoryWiseSlice = createSlice({
  name: "recommendedCategoryWiseProduct",
  initialState,
  reducers: {
    recommendCategoryWiseProduct: (state, action) => {
      // state.recommendedCategoryWiseProductData = action.payload;
      const { categories, hasMoreCategories } = action.payload.recommendations;
      state.productCategories = { ...state.productCategories, ...categories }; // Merge new data
      state.hasMoreCategories = hasMoreCategories;
    },
    recommendationCategoryWiseLoader:(state,action)=>{
        state.loader = action.payload;
    },
    fetchRecommendationCategoryWiseRequest: (state) => {
      state.status = 'loading';
    },
  },
});


export const {
    recommendCategoryWiseProduct,
    recommendationCategoryWiseLoader,
    fetchRecommendationCategoryWiseRequest,
    } = recommendationCategoryWiseSlice.actions;

// export const selectRecommendedCategoryWiseProduct = (state) => state.recommendedCategoryWiseProduct.recommendedCategoryWiseProductData;
export const selectRecommendedCategoryWiseProduct = (state) => state.recommendedCategoryWiseProduct.productCategories;
export const selectRecommendationCategoryWiseLoader = (state) => state.recommendedCategoryWiseProduct.loader;
export const selectRecommendationCategoryWiseStatus = (state) => state.recommendedCategoryWiseProduct.status;

export default recommendationCategoryWiseSlice.reducer;


