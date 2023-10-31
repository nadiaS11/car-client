import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "./Auths/AuthProvider";
import axios from "axios";
import BookingRow from "./BookingRow";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

const Bookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  //   const axiosSecure = useAxiosSecure();
  const url = `http://localhost:3000/bookings?email=${user?.email}`;

  useEffect(() => {
    // fetch(url)
    //   .then((res) => res.json())
    //   .then((data) => setBookings(data));

    axios.get(url, { withCredentials: true }).then((res) => {
      console.log(res.data);
      setBookings(res.data);
    });
  }, [url]);

  const handleDeleteBooking = (id) => {
    const proceed = confirm("Are you sure you want to delete?");
    if (proceed) {
      fetch(`http://localhost:3000/bookings/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            alert("Deleted successfully");
            const remaining = bookings.filter((booking) => booking._id !== id);
            setBookings(remaining);
          }
        });
    }
  };

  const handleConfirm = (id) => {
    fetch(`http://localhost:3000/bookings/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status: "Confirmed" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          //update state
          const remaining = bookings.filter((booking) => booking._id !== id);
          const updated = bookings.find((booking) => booking._id === id);
          updated.status = "Confirmed";

          const newBookings = [updated, ...remaining];
          setBookings(newBookings);
        }
      });
  };

  return (
    <div>
      <h1 className="text-3xl text-center font-bold">
        {" "}
        My Bookings Here:{bookings?.length}
      </h1>

      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {bookings?.map((booking) => (
                <BookingRow
                  key={booking._id}
                  booking={booking}
                  handleDeleteBooking={handleDeleteBooking}
                  handleConfirm={handleConfirm}
                ></BookingRow>
              ))}
            </tbody>
            {/* foot */}
          </table>
        </div>
      </div>
    </div>
  );
};

Bookings.propTypes = {};

export default Bookings;
