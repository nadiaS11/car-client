import React from "react";
import PropTypes from "prop-types";

const BookingRow = ({ booking, handleDeleteBooking, handleConfirm }) => {
  console.log(booking);
  const { _id, img, service_title, price, date, status } = booking;

  return (
    <tr>
      <th>
        <button
          onClick={() => handleDeleteBooking(_id)}
          className="btn btn-circle btn-sm  btn-neutral"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </th>
      <td>
        <div className="avatar">
          <div className="rounded w-12 h-12">
            {img && <img src={img} alt="Avatar Tailwind CSS Component" />}
          </div>
        </div>
      </td>
      <td>{service_title}</td>
      <td>{date}</td>
      <td>{price}</td>

      <th>
        {status === "Confirmed" ? (
          <button className="btn  btn-xs btn-success">Confirm</button>
        ) : (
          <button
            onClick={() => handleConfirm(_id)}
            className="btn btn-xs btn-error"
          >
            Pending
          </button>
        )}
      </th>
    </tr>
  );
};

BookingRow.propTypes = {
  booking: PropTypes.object,
};

export default BookingRow;
