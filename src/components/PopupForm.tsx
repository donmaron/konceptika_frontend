import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useAppSelector, useAppDispatch } from '../hooks'
import { fetchProducts } from "../store/productsSlice";
import axiosInstance from "../axiosInstance";

interface PopupFormProps {
  mode: "add" | "edit" | "delete";
  product?: {
    uuid: string;
    name: string;
    price: number;
    category_id: number;
  };
  onClose: () => void;
}

const PopupForm = ({ mode, product, onClose }: PopupFormProps) => {
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      name: product?.name ?? "",
      price: product?.price ?? "",
      category_id: product?.category_id ?? "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      price: Yup.number().required("Required").min(0, "Must be greater than or equal to 0"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setError("");
      try {
        switch (mode) {
          case "add":
            await axiosInstance.post("/products/add", values);
            break;
          case "edit":
            await axiosInstance.put(`/products/edit/${product?.uuid}`, values);
            break;
          case "delete":
            await axiosInstance.delete(`/products/delete/${product?.uuid}`);
            break;
        }
        onClose();
        dispatch(fetchProducts());
      } catch (error: any) {
        setError(error.message);
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <h2>{mode === "add" ? "Add Product" : mode === "edit" ? "Edit Product" : "Delete Product"}</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={formik.values.name} onChange={formik.handleChange} />
          {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input type="number" id="price" name="price" value={formik.values.price} onChange={formik.handleChange} />
          {formik.touched.price && formik.errors.price ? <div>{formik.errors.price}</div> : null}
        </div>
        <div>
          <label htmlFor="price">Category</label>
          <input type="number" id="category_id" name="category_id" value={formik.values.category_id} onChange={formik.handleChange} />
          {formik.touched.category_id && formik.errors.category_id ? <div>{formik.errors.category_id}</div> : null}
        </div>
        <button type="submit" disabled={formik.isSubmitting}>
          {mode === "delete" ? "Delete" : "Save"}
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
};

export default PopupForm;
