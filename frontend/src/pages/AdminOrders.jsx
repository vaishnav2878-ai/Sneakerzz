import { useEffect, useState } from "react";

import {
  getAllOrders,
  updateOrderStatus,
} from "../services/orderService";


function AdminOrders() {
  

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const data = await getAllOrders(token);

      setOrders(data.orders || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      const token = localStorage.getItem("token");

      await updateOrderStatus(orderId, status, token);

      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <h1 className="text-center mt-10 text-2xl">Loading...</h1>
    );
  }

  const filteredOrders = orders.filter((order) => {
    const customer = order.user?.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const status =
      statusFilter === "All" ? true : order.orderStatus === statusFilter;

    return customer && status;
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <h1 className="text-4xl font-bold">Admin Orders</h1>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-2 w-72"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option>All</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Total Orders</h3>
          <p className="text-3xl font-bold mt-2">{orders.length}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Pending</h3>
          <p className="text-3xl font-bold mt-2">
            {orders.filter((o) => o.orderStatus === "Pending").length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Delivered</h3>
          <p className="text-3xl font-bold mt-2">
            {orders.filter((o) => o.orderStatus === "Delivered").length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Revenue</h3>
          <p className="text-3xl font-bold mt-2">
            ₹{orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0)}
          </p>
        </div>
      </div>

      {/* Orders list */}
      {filteredOrders.length === 0 ? (
        <h2>No Orders Found</h2>
      ) : (
        filteredOrders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
          >
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold">
                  Order #{order._id.slice(-8)}
                </h2>

                <p className="text-gray-600 mt-1">
                  <strong>Customer:</strong> {order.user?.name}
                </p>

                <p className="text-gray-600">
                  <strong>Email:</strong> {order.user?.email}
                </p>

                <p className="text-gray-600">
                  <strong>Date:</strong>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <span
                className={`px-4 py-2 rounded-full text-white font-semibold ${
                  order.orderStatus === "Delivered"
                    ? "bg-green-500"
                    : order.orderStatus === "Shipped"
                    ? "bg-blue-500"
                    : order.orderStatus === "Cancelled"
                    ? "bg-red-500"
                    : order.orderStatus === "Processing"
                    ? "bg-purple-500"
                    : "bg-yellow-500"
                }`}
              >
                {order.orderStatus}
              </span>
            </div>

            <hr className="my-6" />

            {/* Products */}
            <div className="space-y-6">
              {order.orderItems?.map((item) => (
                <div key={item._id} className="flex gap-5">
                  <img
                    src={item.product?.images?.[0]}
                    alt={item.product?.name}
                    className="w-28 h-28 object-cover rounded-lg border"
                  />

                  <div className="flex-1">
                    <h3 className="text-lg font-bold">
                      {item.product?.name}
                    </h3>

                    <p className="text-gray-500">
                      Brand : {item.product?.brand?.name}
                    </p>

                    <p className="text-gray-500">
                      Category : {item.product?.category?.name}
                    </p>

                    <p>Size : {item.size}</p>

                    <p>Quantity : {item.quantity}</p>

                    <p className="font-semibold">₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <hr className="my-6" />

            {/* Shipping */}
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-2">Shipping Address</h3>

              <p>{order.address?.fullName}</p>

              <p>{order.address?.addressLine}</p>

              <p>
                {order.address?.city}, {order.address?.state}
              </p>

              <p>{order.address?.country}</p>

              <p>{order.address?.phone}</p>
            </div>

            <hr className="my-6" />

            {/* Footer */}
            <div className="flex justify-between items-center">
              <div>
                <p>
                  <strong>Payment:</strong> {order.paymentStatus}
                </p>

                <p className="text-2xl font-bold mt-2">
                  Total : ₹{order.totalAmount}
                </p>
              </div>

              <select
                value={order.orderStatus}
                onChange={(e) =>
                  handleStatusChange(order._id, e.target.value)
                }
                className="border rounded-lg px-4 py-2"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminOrders;