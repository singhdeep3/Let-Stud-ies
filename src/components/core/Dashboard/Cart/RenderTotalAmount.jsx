import React from "react";
import { useSelector } from "react-redux";
import IconBtn from "../../../common/IconBtn";
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI";

const RenderTotalAmount = () => {
  const { total, cart } = useSelector((state) => state.cart);
  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id)
    buyCourse(token, courses, user, navigate, dispatch)
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
