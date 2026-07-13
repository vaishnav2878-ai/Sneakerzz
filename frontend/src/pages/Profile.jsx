import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  Country,
  State,
} from "country-state-city";

import {
  getAddresses,
  createAddress,
} from "../services/addressService";

function Profile() {
  const { user } = useSelector(
    (state) => state.auth
  );

  const [addresses, setAddresses] =
    useState([]);

  const [formData, setFormData] =
    useState({
      fullName: "",
      phone: "",
      addressLine: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    });

  const token =
    localStorage.getItem("token");

  const countries =
    Country.getAllCountries();

  const selectedCountry =
    countries.find(
      (country) =>
        country.name ===
        formData.country
    );

  const states =
    selectedCountry
      ? State.getStatesOfCountry(
          selectedCountry.isoCode
        )
      : [];

  const fetchAddresses =
    async () => {
      try {
        const data =
          await getAddresses(token);

        setAddresses(
          data.addresses
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleChange = (e) => {
    const { name, value } =
      e.target;

    if (name === "country") {
      setFormData({
        ...formData,
        country: value,
        state: "",
      });

      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await createAddress(
          formData,
          token
        );

        alert(
          "Address Added Successfully"
        );

        setFormData({
          fullName: "",
          phone: "",
          addressLine: "",
          city: "",
          state: "",
          pincode: "",
          country: "",
        });

        fetchAddresses();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        My Profile
      </h1>

      {/* User Info */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <p>
          <strong>Name:</strong>{" "}
          {user?.name}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {user?.email}
        </p>

        <p>
          <strong>Role:</strong>{" "}
          {user?.role}
        </p>
      </div>

      {/* Address Form */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Add Address
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={
              formData.fullName
            }
            onChange={
              handleChange
            }
            className="border p-3 rounded"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={
              formData.phone
            }
            onChange={
              handleChange
            }
            className="border p-3 rounded"
            required
          />

          <input
            type="text"
            name="addressLine"
            placeholder="Address"
            value={
              formData.addressLine
            }
            onChange={
              handleChange
            }
            className="border p-3 rounded md:col-span-2"
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={
              formData.city
            }
            onChange={
              handleChange
            }
            className="border p-3 rounded"
            required
          />

          <select
            name="country"
            value={
              formData.country
            }
            onChange={
              handleChange
            }
            className="border p-3 rounded"
            required
          >
            <option value="">
              Select Country
            </option>

            {countries.map(
              (country) => (
                <option
                  key={
                    country.isoCode
                  }
                  value={
                    country.name
                  }
                >
                  {country.name}
                </option>
              )
            )}
          </select>

          <select
            name="state"
            value={
              formData.state
            }
            onChange={
              handleChange
            }
            className="border p-3 rounded"
            required
          >
            <option value="">
              Select State
            </option>

            {states.map(
              (state) => (
                <option
                  key={
                    state.isoCode
                  }
                  value={
                    state.name
                  }
                >
                  {state.name}
                </option>
              )
            )}
          </select>

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={
              formData.pincode
            }
            onChange={
              handleChange
            }
            className="border p-3 rounded"
            required
          />

          <button
            type="submit"
            className="bg-black text-white py-3 rounded md:col-span-2"
          >
            Save Address
          </button>
        </form>
      </div>

      {/* Saved Addresses */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">
          Saved Addresses
        </h2>

        {addresses.length === 0 ? (
          <p>
            No Address Found
          </p>
        ) : (
          addresses.map(
            (address) => (
              <div
                key={
                  address._id
                }
                className="border p-4 rounded mb-4"
              >
                <h3 className="font-bold">
                  {
                    address.fullName
                  }
                </h3>

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
                    address.pincode
                  }
                </p>

                <p>
                  {
                    address.phone
                  }
                </p>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}

export default Profile;