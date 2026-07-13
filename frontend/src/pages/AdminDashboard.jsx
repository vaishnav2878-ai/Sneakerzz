import { useEffect, useState } from "react";

import {
  getDashboardStats,
  getRecentOrders,
  getLowStockProducts,
} from "../services/dashboardService";

import {
  FaShoppingBag,
  FaBoxOpen,
  FaUsers,
  FaDollarSign,
  FaTags,
  FaList,
} from "react-icons/fa";

import AdminCard from "../components/admin/AdminCard";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const [statsData, ordersData, stockData] =
          await Promise.all([
            getDashboardStats(token),
            getRecentOrders(token),
            getLowStockProducts(token),
          ]);

        setStats({
          totalOrders: statsData.totalOrders,
          totalProducts: statsData.totalProducts,
          totalUsers: statsData.totalUsers,
          totalRevenue: statsData.totalRevenue,
        });

        setRecentOrders(ordersData.recentOrders);
        setLowStockProducts(stockData.lowStockProducts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboard();
  }, []);

  const cards = [
    {
      title: "Orders",
      value: stats.totalOrders,
      icon: (
        <FaShoppingBag className="text-2xl md:text-3xl text-orange-500" />
      ),
      link: "/admin/orders",
      dark: false,
    },
    {
      title: "Products",
      value: stats.totalProducts,
      icon: (
        <FaBoxOpen className="text-2xl md:text-3xl text-orange-500" />
      ),
      link: "/admin/products",
      dark: false,
    },
    {
      title: "Users",
      value: stats.totalUsers,
      icon: (
        <FaUsers className="text-2xl md:text-3xl text-orange-500" />
      ),
      link: "/admin/users",
      dark: false,
    },
    {
      title: "Revenue",
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: (
        <FaDollarSign className="text-2xl md:text-3xl text-orange-400" />
      ),
      link: "#",
      dark: true,
    },
    {
      title: "Brands",
      value: "Manage",
      icon: (
        <FaTags className="text-2xl md:text-3xl text-orange-500" />
      ),
      link: "/admin/brands",
      dark: false,
    },
    {
      title: "Categories",
      value: "Manage",
      icon: (
        <FaList className="text-2xl md:text-3xl text-orange-500" />
      ),
      link: "/admin/categories",
      dark: false,
    },
  ];

  return (
<div className="w-full max-w-full p-3 md:p-8 overflow-hidden">
      {/* Dashboard Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {cards.map((card) => (
          <AdminCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            link={card.link}
            dark={card.dark}
          />
        ))}
      </div>

      {/* Recent Orders */}

      <div className="mt-10 md:mt-12">
        <h2 className="text-xl md:text-2xl font-bold mb-4">
          Recent Orders
        </h2>

        <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-200">

          <table className="min-w-[700px] w-full">

            <thead className="bg-black text-white">

              <tr>
                <th className="px-4 py-3 text-left">
                  Customer
                </th>

                <th className="px-4 py-3 text-left">
                  Amount
                </th>

                <th className="px-4 py-3 text-left">
                  Status
                </th>

                <th className="px-4 py-3 text-left">
                  Date
                </th>
              </tr>

            </thead>

            <tbody>

              {recentOrders.map((order) => (

                <tr
                  key={order._id}
                  className="border-t hover:bg-orange-50 transition"
                >

                  <td className="px-4 py-3">
                    {order.user?.name}
                  </td>

                  <td className="px-4 py-3">
                    ₹{order.totalAmount}
                  </td>

                  <td className="px-4 py-3">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.orderStatus === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.orderStatus === "Processing"
                          ? "bg-blue-100 text-blue-700"
                          : order.orderStatus === "Shipped"
                          ? "bg-purple-100 text-purple-700"
                          : order.orderStatus === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.orderStatus}
                    </span>

                  </td>

                  <td className="px-4 py-3">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      </div>

      {/* Low Stock */}

      <div className="mt-10 md:mt-12">

        <h2 className="text-xl md:text-2xl font-bold mb-4">
          Low Stock Products
        </h2>

        <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-200">

          <table className="min-w-[700px] w-full">

            <thead className="bg-black text-white">

              <tr>

                <th className="px-4 py-3 text-left">
                  Product
                </th>

                <th className="px-4 py-3 text-left">
                  Low Stock Sizes
                </th>

              </tr>

            </thead>

            <tbody>

              {lowStockProducts.map((product) => (

                <tr
                  key={product._id}
                  className="border-t hover:bg-orange-50 transition"
                >

                  <td className="px-4 py-3">
                    {product.name}
                  </td>

                  <td className="px-4 py-3">

                    {product.sizes
                      .filter((size) => size.stock <= 5)
                      .map((size) => (
                        <div key={size.size}>
                          Size {size.size} — Stock {size.stock}
                        </div>
                      ))}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;
