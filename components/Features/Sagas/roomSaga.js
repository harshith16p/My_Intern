import { call, put, takeEvery } from "redux-saga/effects";
import { setRoomData } from "../Slices/roomSlice";
import axios from "axios";
import { getProductByProductId } from "@/actions/getProductByProductId";

function* fetchProductById(action) {
  try {
    const product = yield call(async () => {
      const response = await getProductByProductId(action.payload);

      if (!response) {
        throw new Error("Error fetching product by ID");
      }

      return response;
    });

    yield put(setRoomData({ roomData: product, status: "succeeded" }));

    if (product.productImages && product.productImages.length > 0) {
      yield put({
        type: "FETCH_IMAGE_DATA",
        payload: response.data.productImages[0].color,
      });
    } else {
      yield put({ type: "FETCH_IMAGE_DATA", payload: null });
    }

    const productTitle = product.productTitle;

    yield call(updateProductPopularity, productTitle);
    yield call(sendPreferences, product);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    yield put(setRoomData({ roomData: [], status: "failed" }));
  }
}

function* fetchRoomData(action) {
  try {
    // Fetch product data
    const response = yield call(
      axios.get,
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getSingleProduct?title=${action.payload}`
    );

    // Dispatch action to set room data
    yield put(setRoomData({ roomData: response.data, status: "succeeded" }));
    if (response.data.productImages && response.data.productImages.length > 0) {
      yield put({
        type: "FETCH_IMAGE_DATA",
        payload: response.data.productImages[0].color,
      });
    } else {
      yield put({ type: "FETCH_IMAGE_DATA", payload: null });
    }

    // Extract product ID and update popularity
    const productTitle = action.payload;
    console.log("Product title:", productTitle);
    yield call(updateProductPopularity, productTitle);

    // Send preferences to the server
    yield call(sendPreferences, response.data); // Assuming productTitle is related to preferences
  } catch (error) {
    console.error("Error fetching room data:", error);
    yield put(setRoomData({ roomData: [], status: "failed" }));
  }
}

function* updateProductPopularity(productTitle) {
  try {
    // Make POST request to update product popularity
    yield call(
      axios.post,
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/increment-popularity?title=${productTitle}`
    );
    console.log("Product popularity updated successfully.");
  } catch (error) {
    console.error("Error updating product popularity:", error);
  }
}

function* sendPreferences(productData) {
  try {
    let id;
    if (typeof window !== "undefined") {
      id = localStorage.getItem("deviceId");
    }

    // Use `id` instead of `deviceId`
    yield call(
      axios.post,
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/preferences`,
      {
        deviceId: id, // Corrected variable name
        userPreferredCategories: [
          {
            name: productData.category,
            subcategories: [productData.subcategory],
          },
        ],
      }
    );
    console.log("Preferences sent successfully.");
  } catch (error) {
    console.error("Error sending preferences:", error);
    // You might want to dispatch an action to handle the error here
  }
}

export function* watchFetchRoomData() {
  yield takeEvery("FETCH_ROOM_REQUEST", fetchRoomData);
}

export function* watchFetchProductById() {
  yield takeEvery("FETCH_PRODUCT_BY_ID", fetchProductById);
}
