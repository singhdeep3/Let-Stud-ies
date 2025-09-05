import { useSelector } from "react-redux"

import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart)

  return (
    <div className="ml-24">
      <h1 className="mb-14 text-3xl font-medium text-black text-center mt-10">Cart</h1>
      <p className="border-b border-b-amber-600 pb-2 font-semibold text-black">
        {totalItems} Courses in Cart
      </p>
      {total > 0 ? (
        <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p className="mt-14 text-center text-3xl text-black">
          Your cart is empty
        </p>
      )}
    </div>
  )
}