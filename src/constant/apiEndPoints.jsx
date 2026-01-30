const API_BASE_PATH_MENUS = "/menus";
const API_BASE_PATH_ORDERS = "/orders";

// *============================================|| API Endpoints  ||============================================* //
const API_ENDPOINTS = {
    // *============================================|| Menus ||============================================* //
    GET_ALL_MENUS: `${API_BASE_PATH_MENUS}`,
    GET_MENU_BY_ID: (menuId) => `${API_BASE_PATH_MENUS}/${menuId}`,
    CREATE_MENU: `${API_BASE_PATH_MENUS}`,
    UPDATE_MENU: (menuId) => `${API_BASE_PATH_MENUS}/${menuId}`,
    DELETE_MENU: (menuId) => `${API_BASE_PATH_MENUS}/${menuId}`,

    // *============================================|| Orders ||============================================* //
    GET_ALL_ORDERS: `${API_BASE_PATH_ORDERS}`,
    GET_ORDER_BY_ID: (orderId) => `${API_BASE_PATH_ORDERS}/${orderId}`,
    CREATE_ORDER: `${API_BASE_PATH_ORDERS}`,
    UPDATE_ORDER_STATUS: (orderId) => `${API_BASE_PATH_ORDERS}/${orderId}/status`,
    UPDATE_PAYMENT_STATUS: (orderId) => `${API_BASE_PATH_ORDERS}/${orderId}/payment`,
    CANCEL_ORDER: (orderId) => `${API_BASE_PATH_ORDERS}/${orderId}/cancel`,

    // *============================================|| Server-Sent Events (SSE) ||============================================* //
    ORDER_STATUS_STREAM: (orderId) => `${API_BASE_PATH_ORDERS}/${orderId}/stream`,
};

export default API_ENDPOINTS;
