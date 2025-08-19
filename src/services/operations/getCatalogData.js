import React from "react";
import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { catalogData } from "../api";

export const getCatalogData = async (categoryId) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const res = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, {
      categoryId: categoryId,
    });
    if (!res?.data?.success)
      throw new Error("Could not fetch Category page data");
    const result = res?.data;
  } catch (error) {
    console.log("Catalog data API Error", error);
    toast.error(error.message);
    result = error.response?.data;
  }
  toast.dismiss(toastId);
  return result;
};
