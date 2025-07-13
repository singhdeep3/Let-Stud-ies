import React from "react";
import { useSelector } from "react-redux";
import IconBtn from "../../../common/IconBtn";

const RenderTotalAmount = () => {
  const { total, cart } = useSelector((state) => state.cart);
  const handleBuyCourse = () => {
    const courses = cart.map((course) => {
      console.log("courses are: ", course);
    });
  };
  return (
    <div>
      <p>Total: </p>
      <p>Rs: {total}</p>

      <IconBtn text={"But Now"} onClick={handleBuyCourse} />
    </div>
  );
};

export default RenderTotalAmount;
