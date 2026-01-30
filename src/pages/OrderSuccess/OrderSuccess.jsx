import React, { useEffect, useState } from "react";
import { getOrderById } from "../../services/servicesApi";
import { connectOrderStatusStream } from "../../services/servicesApi";
import "./OrderSuccess.css";

const OrderSuccess = () => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Define order statuses for timeline
    const statusSteps = ["Order Received", "Preparing", "Out for Delivery", "Delivered"];

    // Fetch initial order data
    useEffect(() => {
        const fetchOrder = async () => {
            const orderId = localStorage.getItem("orderId");
            if (!orderId) {
                setError("No order found.");
                setLoading(false);
                return;
            }

            try {
                const data = await getOrderById(orderId);
                setOrder(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, []);

    // Connect SSE for live status updates
    useEffect(() => {
        const orderId = localStorage.getItem("orderId");
        if (!orderId) return;

        // Connect via API service
        const eventSource = connectOrderStatusStream(
            orderId,
            (data) => {
                if (data.status) {
                    setOrder((prevOrder) => ({
                        ...prevOrder,
                        status: data.status,
                        updatedAt: data.updatedAt,
                    }));
                }

                if (["Delivered", "Cancelled"].includes(data.status)) {
                    eventSource.close();
                }
            },
            (err) => {
                console.error("SSE error:", err);
            }
        );

        return () => {
            eventSource.close(); // cleanup
        };
    }, []);


    if (loading) return <p>Loading order details...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!order) return null;

    const currentStep = statusSteps.indexOf(order.status);

    return (
        <div className="order-success-container">
            <h1>Order Placed Successfully!</h1>
            <p className="order-id">
                Order ID: <strong>{order._id}</strong>
            </p>

            {/* Timeline */}
            <div className="timeline">
                {statusSteps.map((step, index) => (
                    <div key={index} className="timeline-step">
                        <div className={`circle ${index <= currentStep ? "active" : ""}`}></div>
                        <p className={`status-label ${index <= currentStep ? "active" : ""}`}>{step}</p>
                        {index < statusSteps.length - 1 && (
                            <div className={`line ${index < currentStep ? "active" : ""}`}></div>
                        )}
                    </div>
                ))}
            </div>

            {/* Customer Details */}
            <div className="details-section">
                <h2>Customer Details</h2>
                <p><strong>Name:</strong> {order.customerName}</p>
                <p><strong>Email:</strong> {order.customerEmail}</p>
                <p><strong>Phone:</strong> {order.customerPhone}</p>
                <p><strong>Address:</strong> {order.deliveryAddress}</p>
            </div>

            {/* Items Table */}
            <div className="details-section">
                <h2>Items Ordered</h2>
                <table className="items-table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.items.map((item) => (
                            <tr key={item._id}>
                                <td>
                                    <div className="item-info">
                                        <img src={item.menuItem.imageUrl} alt={item.menuItem.name} />
                                        <span>{item.menuItem.name}</span>
                                    </div>
                                </td>
                                <td>{item.quantity}</td>
                                <td>${item.menuItem.price.toFixed(2)}</td>
                                <td>${item.price.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h3 className="total-amount">Total Amount: ${order.totalAmount.toFixed(2)}</h3>
            </div>
        </div>
    );
};

export default OrderSuccess;
