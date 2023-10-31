import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "./Auths/AuthProvider";

const Checkout = () => {
  const service = useLoaderData();
  const { title, _id, price, img } = service;
  const { user } = useContext(AuthContext);

  const handleBookService = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const date = form.date.value;
    const email = user?.email;

    const booking = {
      customerName: name,
      email,
      img,
      service_title: title,
      service_id: _id,
      price: price,
      date,
    };
    // console.log("order info:", booking);

    fetch("http://localhost:3000/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  console.log(service);
  return (
    <div>
      book here
      <div>
        <form onSubmit={handleBookService}>
          <div className="form-control  grid grid-cols-1 gap-6 md:grid-cols-2 font-semibold ">
            <label className="    ">
              <input
                type="text"
                name="name"
                defaultValue={user ? user.displayName : ""}
                placeholder="Product name"
                className="input  input-bordered w-full  "
              />
            </label>
            <label className="   ">
              <input
                type="text"
                name="email"
                defaultValue={user ? user.email : ""}
                placeholder="Email"
                className="input input-bordered w-full"
              />
            </label>
            <label className="   ">
              <input
                type="date"
                placeholder="Date"
                name="date"
                className="input input-bordered w-full "
                id=""
              />
            </label>
            <label className="   ">
              <input
                type="text"
                placeholder="Price"
                name="price"
                defaultValue={price}
                className="input input-bordered w-full "
              />
            </label>
          </div>
          <input
            type="submit"
            value="  Book Service"
            className="btn btn-block mt-4 bg-[#FF3811] text-white"
          />
        </form>
      </div>
    </div>
  );
};

Checkout.propTypes = {};

export default Checkout;
