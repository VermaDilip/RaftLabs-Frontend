import axios from "axios";
import API_ENDPOINTS from "../constant/apiEndPoints";

const API_URL = `${import.meta.env.VITE_BASE_API_URL}${import.meta.env.VITE_BASE_API}`;

// *============================================|| Get all menus ||============================================* //
export const getAllMenus = async () => {
  try {
    const response = await axios.get(
      `${API_URL}${API_ENDPOINTS.GET_ALL_MENUS}`
    );

    if (response.data.success) {
      return response.data.data;
    }

    // Backend responded but success=false
    throw new Error(response.data.message || "Failed to fetch menus");
  } catch (error) {
    //THIS IS THE KEY PART
    const backendMessage =
      error.response?.data?.message || error.message || "Something went wrong";

    throw new Error(backendMessage);
  }
};

// *============================================|| Get menu by ID ||============================================* //
export const getMenuById = async (menuId) => {
  try {
    const response = await axios.get(
      `${API_URL}${API_ENDPOINTS.GET_MENU_BY_ID(menuId)}`
    );

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(`Error fetching menu: ${error.message}`);
  }
};

// *============================================|| Create menu ||============================================* //
export const createMenu = async (payload) => {
  try {
    const response = await axios.post(
      `${API_URL}${API_ENDPOINTS.CREATE_MENU}`,
      payload
    );

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(`Error creating menu: ${error.message}`);
  }
};

// *============================================|| Orders API ||============================================* //


// *============================================|| Get all orders ||============================================* //
export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}${API_ENDPOINTS.GET_ALL_ORDERS}`);
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(`Error fetching orders: ${error.message}`);
  }
};

// *============================================|| Get order by ID ||============================================* //
export const getOrderById = async (orderId) => {
  try {
    const response = await axios.get(`${API_URL}${API_ENDPOINTS.GET_ORDER_BY_ID(orderId)}`);
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(`Error fetching order: ${error.message}`);
  }
};

// *============================================|| Create order ||============================================* //
export const createOrder = async (payload) => {
  try {
    const response = await axios.post(
      `${API_URL}${API_ENDPOINTS.CREATE_ORDER}`,
      payload
    );

    if (response.data.success) {
      return response.data.data;
    }

    // backend responded with success:false
    throw response.data;
  } catch (error) {
    //Extract backend response safely
    const data = error.response?.data;

    // Case 1: Validation errors
    if (data?.errors && Array.isArray(data.errors)) {
      throw {
        type: "validation",
        message: data.message || "Validation failed",
        errors: data.errors,
      };
    }

    // Case 2: Normal backend error
    if (data?.message) {
      throw new Error(data.message);
    }

    // Case 3: Network / unknown error
    throw new Error(error.message || "Something went wrong");
  }
};


// *============================================|| Update order status ||============================================* //
export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await axios.put(
      `${API_URL}${API_ENDPOINTS.UPDATE_ORDER_STATUS(orderId)}`,
      { status }
    );
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(`Error updating order status: ${error.message}`);
  }
};

// *============================================|| Update payment status ||============================================* //
export const updatePaymentStatus = async (orderId, paymentStatus) => {
  try {
    const response = await axios.put(
      `${API_URL}${API_ENDPOINTS.UPDATE_PAYMENT_STATUS(orderId)}`,
      { paymentStatus }
    );
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(`Error updating payment status: ${error.message}`);
  }
};

// *============================================|| Cancel order ||============================================* //
export const cancelOrder = async (orderId) => {
  try {
    const response = await axios.put(`${API_URL}${API_ENDPOINTS.CANCEL_ORDER(orderId)}`);
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(`Error cancelling order: ${error.message}`);
  }
};

// *============================================|| Order SSE ||============================================* //
export const connectOrderStatusStream = (orderId, onMessage, onError) => {
  if (!orderId) throw new Error("Order ID is required for SSE");

  const sseUrl = `${API_URL}${API_ENDPOINTS.ORDER_STATUS_STREAM(orderId)}`;
  const eventSource = new EventSource(sseUrl);

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (onMessage) onMessage(data);
  };

  eventSource.onerror = (err) => {
    if (onError) onError(err);
    eventSource.close();
  };

  return eventSource; // return EventSource to allow manual close
};