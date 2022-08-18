import { useNavigate } from "react-router-dom";
import React from "react";

export default function InfoCard(props) {
  const handleSubmit = () => {
    navigate("/listings/detail/" + props.id);
  };
  const navigate = useNavigate();
  return (
    <div>
      <h2>{props.address}</h2>
      <img></img>
      <h3>{props.rate}</h3>
      <button
        onClick={() => {
          handleSubmit();
        }}
      >
        Reserve
      </button>
    </div>
  );
}