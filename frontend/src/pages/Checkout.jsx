import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAddresses } from "../services/addressService";
import { createOrder } from "../services/orderService";

function Checkout() {
  const navigate = useNavigate();

  const [addresses, setAddresses] =
    useState([]);

  const [selectedAddress, setSelectedAddress] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const token =
          localStorage.getItem("token");

        const data =
          await getAddresses(token);

        setAddresses(data.addresses);

        if (data.addresses.length > 0) {
          setSelectedAddress(
            data.addresses[0]._id
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const handlePlaceOrder =
    async () => {
      try {
        const token =
          localStorage.getItem("token");

        const data =
          await createOrder(
            selectedAddress,
            token
          );

        alert(data.message);

        navigate("/my-orders");
      } catch (error) {
        console.log(error);

        alert(
          error.response?.data
            ?.message ||
            "Order Failed"
        );
      }
    };

  if (loading) {
    return (
      <h1 className="text-center mt-10">
        Loading...
      </h1>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Checkout
      </h1>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">
          Select Address
        </h2>

        {addresses.length === 0 ? (
          <p>
            No Address Found.
            Please add an address
            first.
          </p>
        ) : (
          addresses.map(
            (address) => (
              <label
                key={address._id}
                className="block border p-4 rounded mb-4 cursor-pointer"
              >
                <input
                  type="radio"
                  name="address"
                  value={address._id}
                  checked={
                    selectedAddress ===
                    address._id
                  }
                  onChange={(e) =>
                    setSelectedAddress(
                      e.target.value
                    )
                  }
                  className="mr-3"
                />

                <strong>
                  {
                    address.fullName
                  }
                </strong>

                <p>
                  {
                    address.addressLine
                  }
                </p>

                <p>
                  {address.city},{" "}
                  {
                    address.state
                  }
                </p>

                <p>
                  {
                    address.country
                  }
                </p>

                <p>
                  {
                    address.phone
                  }
                </p>
              </label>
            )
          )
        )}

        {addresses.length > 0 && (
          <button
            onClick={
              handlePlaceOrder
            }
            className="bg-black text-white px-6 py-3 rounded mt-4"
          >
            Place Order
          </button>
        )}
      </div>
    </div>
  );
}

export default Checkout;