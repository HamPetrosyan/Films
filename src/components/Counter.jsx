import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../reduxStore/counterSlice";

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleIncrement = () => {
    dispatch(increment());
  };

  return (
    <>
      <button style={{ width: 50 }} onClick={handleDecrement}>
        -
      </button>
      <p>{count}</p>
      <button style={{ width: 50 }} onClick={handleIncrement}>
        +
      </button>
    </>
  );
};

export { Counter };
