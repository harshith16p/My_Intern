// sagas/index.js
import { all } from "redux-saga/effects";
import { watchFetchRecommendedCategoryWiseProduct } from "./recommendationCategoryWiseSaga";
import { watchFetchRecommendedProduct } from "./recommendationSaga";
import { watchFetchSliderView } from "./sliderSaga";
import { watchSearchProducts } from "./searchSaga";
import { watchFetchFirstCard } from "./FirstCardSaga";
import { watchSelectedItemsSaga } from "./selectedItemsSaga";
import { watchFetchProfileData } from "./profileSaga";
import { watchFetchProductById, watchFetchRoomData } from "./roomSaga";
import { cartSaga } from "./cartSaga";
import { watchSelectedProductsSaga } from "./compareSaga";
import { watchVirtualGet } from "./virtualSaga";
import { watchFetchTrendingData } from "./trendingSaga";
import { watchFetchRankedProductsData } from "./rankedProductsSaga";
import { watchMultiCardData } from "./multiCardSaga";
import { watchFetchImagechangerData } from "./ImageChangerSaga";
import { watchFetchDisplayData } from "./displaySaga";
import { watchFetchMusicData } from "./musicSaga";
import { watchFetchFirstImgChangerData } from "./firstImageChangerSaga";
import { watchFilterProducts } from "./FilteredProductSaga";
import { watchFetchAllProducts } from "./productSaga";
import { watchFetchImageData } from "./imageDataSaga";
import { watchFetchBlogCardData } from "./blogCardSage";
import { watchFetchSuggestionData } from "./suggestionDataSaga";
import { watchFetchRoomMainData } from "./roomMainSaga";
import { watchFetchProductsFromDemandType } from "./demandTypeProductsSaga";
import { watchFetchProductsFromOffers } from "./offerProductsSaga";

export default function* rootSaga() {
  yield all([
    watchFetchRecommendedProduct(),
    watchFetchRecommendedCategoryWiseProduct(),
    watchFetchSliderView(),
    watchSearchProducts(),
    watchFetchFirstCard(),
    watchFetchProfileData(),
    watchFetchTrendingData(),
    watchFetchRoomData(),
    watchFetchProductById(),
    watchSelectedItemsSaga(),
    cartSaga(),
    watchVirtualGet(),
    watchSelectedProductsSaga(),
    watchMultiCardData(),
    watchFetchImagechangerData(),
    watchFetchDisplayData(),
    watchFetchMusicData(),
    watchFetchFirstImgChangerData(),
    watchFilterProducts(),
    watchFetchAllProducts(),
    watchFetchImageData(),
    watchFetchBlogCardData(),
    watchFetchSuggestionData(),
    watchFetchRoomMainData(),
    watchFetchProductsFromDemandType(),
    watchFetchProductsFromOffers(),
    watchFetchRankedProductsData(),
  ]);
}
