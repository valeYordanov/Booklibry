import { useState } from "react";

/* eslint-disable react/prop-types */
export default function MostRecentBookItem({ img, title, author, timestamp }) {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="book-card">
      <img className="book-img" src={img} alt="" />
      <h1 className="title">{title}</h1>
      <h3 className="author">{author}</h3>
      <p className="date-recent">{formatTimestamp(timestamp)}</p>
    </div>
  );
}
