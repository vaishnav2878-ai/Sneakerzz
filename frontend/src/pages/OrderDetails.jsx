import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getSingleOrder,
  cancelOrder,
} from "../services/orderService";

function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token =
          localStorage.getItem("token");

        const data =
          await getSingleOrder(
            id,
            token
          );

        setOrder(data.order);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!order) {
    return (
      <h1>Order Not Found</h1>
    );
  }

const handleCancelOrder =
  async () => {
    try {
      const token =
        localStorage.getItem("token");

      const data =
        await cancelOrder(
          order._id,
          token
        );

      alert(data.message);

      setOrder({
        ...order,
        orderStatus:
          "Cancelled",
      });
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data
          ?.message ||
          "Failed To Cancel Order"
      );
    }
  };
  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Order Details
      </h1>

      <div className="bg-white p-6 rounded shadow mb-6">

        <p>
          <strong>
            Order ID:
          </strong>{" "}
          {order._id}
        </p>

        <p>
          <strong>
            Status:
          </strong>{" "}
          {order.orderStatus}
        </p>

        <p>
          <strong>
            Payment:
          </strong>{" "}
          {order.paymentStatus}
        </p>

        <p>
          <strong>
            Total:
          </strong>{" "}
          ₹{order.totalAmount}
        </p>
        {order.orderStatus ===
  "Pending" && (
  <button
    onClick={
      handleCancelOrder
    }
    className="mt-4 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded"
  >
    Cancel Order
  </button>
)}

      </div>

      <div className="bg-white p-6 rounded shadow mb-6">

        <h2 className="text-xl font-bold mb-4">
          Shipping Address
        </h2>

        <p>
          {
            order.address
              ?.fullName
          }
        </p>

        <p>
          {
            order.address
              ?.addressLine
          }
        </p>

        <p>
          {order.address?.city}
          ,
          {
            order.address
              ?.state
          }
        </p>

        <p>
          {
            order.address
              ?.country
          }
        </p>
        <p>
           {order.address?.phone}
       </p>

      </div>

      <div className="bg-white p-6 rounded shadow">

        <h2 className="text-xl font-bold mb-4">
          Products
        </h2>

        {order.orderItems?.map(
          (item) => (
            <div
              key={item._id}
              className="flex gap-4 border-b pb-4 mb-4"
            >
              <img
                src={
                  item.product
                    ?.images?.[0]
                }
                alt={
                  item.product
                    ?.name
                }
                className="w-24 h-24 object-cover rounded"
              />

              <div>
                <h3 className="font-bold">
                  {
                    item.product
                      ?.name
                  }
                </h3>

                <p>
                  Size:
                  {item.size}
                </p>

                <p>
                  Qty:
                  {
                    item.quantity
                  }
                </p>

                <p>
                  ₹
                  {item.price}
                </p>
              </div>
            </div>
          )
        )}

      </div>

    </div>
  );
}

export default OrderDetails;