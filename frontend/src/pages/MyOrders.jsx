import { useEffect, useState } from "react";
import { getMyOrders } from "../services/orderService";
import { Link } from "react-router-dom";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const data = await getMyOrders(token);

        setOrders(data.orders || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <h1 className="text-center mt-10">
        Loading...
      </h1>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <h2>No Orders Found</h2>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-6 rounded shadow mb-6"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="font-bold">
                  Order #{order._id.slice(-8)}
                </p>

                <p>
                  Total: ₹{order.totalAmount}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded text-white text-sm ${
                  order.orderStatus === "Delivered"
                    ? "bg-green-500"
                    : order.orderStatus === "Shipped"
                    ? "bg-blue-500"
                    : order.orderStatus === "Cancelled"
                    ? "bg-red-500"
                    : "bg-yellow-500"
                }`}
              >
                {order.orderStatus}
              </span>
            </div>

            {order.orderItems?.map((item) => (
              <div
                key={item._id}
                className="border-t pt-4 mt-4 flex gap-4"
              >
                <img
                  src={item.product?.images?.[0]}
                  alt={item.product?.name}
                  className="w-24 h-24 rounded object-cover"
                />

                <div>
                  <h3 className="font-bold text-lg">
                    {item.product?.name}
                  </h3>

                  <p>Size: {item.size}</p>

                  <p>
                    Quantity: {item.quantity}
                  </p>

                  <p>
                    Price: ₹{item.price}
                  </p>
                </div>
              </div>
            ))}

            <Link
              to={`/orders/${order._id}`}
              className="inline-block mt-4 bg-black text-white px-4 py-2 rounded"
            >
              View Details
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;