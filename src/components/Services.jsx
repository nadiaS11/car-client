import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);
  return (
    <div className=" ">
      <h2 className="text-center font-semibold text-4xl">Our Service Area</h2>

      <div className="grid md:grid-cols-2  lg:grid-cols-3 gap-5">
        {services?.map((service) => (
          <div
            key={service._id}
            className="card card-compact w-96  shadow-xl mx-auto"
          >
            <figure>
              <img src={service?.img} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{service?.title} </h2>
              <p className="font-semibold">$ {service?.price} </p>
              <div className="card-actions justify-end">
                <Link to={`/checkout/${service._id}`}>
                  <button className="btn btn-primary">Checkout</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Services.propTypes = {};

export default Services;
