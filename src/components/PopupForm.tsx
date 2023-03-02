import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "../hooks";
import { fetchProducts } from "../store/productsSlice";
import axiosInstance from "../axiosInstance";
import styled from "styled-components";

const PopupFormContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
`;

const PopupFormTitle = styled.h2`
  font-size: 1.5rem;
  margin: 2rem 0;
  color: #273465;
  text-align: center;
  &.delete {
    text-align: left;
    margin: 0;
  }
`;

const PopupFormError = styled.div`
  color: red;
  margin-bottom: 1rem;
`;

const FormControl = styled.div`
  margin-bottom: 1rem;
`;

const FormControlLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #364270;
`;

const FormControlInput = styled.input`
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 0.75rem;
  font-size: 1rem;
  width: 100%;
  max-width: 324px;
  background-color: #fafbfe;
  color: #384472;
  margin-bottom: 0.5rem;

  &:focus {
    outline: none;
    border-color: #0077ff;
    box-shadow: 0px 0px 5px #0077ff;
  }
`;

const FormControlSelect = styled.select`
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background-color: #fafbfe;
  color: #384472;
  padding: 0.75rem;
  font-size: 1rem;
  width: 100%;
  margin-bottom: 0.5rem;

  &:focus {
    outline: none;
    border-color: #0077ff;
    box-shadow: 0px 0px 5px #0077ff;
  }
`;

const FormActions = styled.div`
  display: flex;
  margin-top: 2rem;
  justify-content: flex-end;
  align-items: stretch;
  flex-direction: column;
  gap: 1rem;
  &.delete {
    justify-content: flex-end;
    align-items: flex-end;
    flex-direction: row;
    gap: 0.5rem;
  }
`;

const FormButton = styled.button`
  background-color: #5b66dc;
  color: white;
  padding: 1rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #5b66ff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &[type="submit"] {
    background-color: #eeeffd;
    color: #394574;
    font-weight: bold;
  }
`;

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

interface Category {
  id: number;
  name: string;
}

const PopupForm = ({ mode, product, onClose }: PopupFormProps) => {
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axiosInstance.get("/categories");
      setCategories(response.data.data);
    };
    fetchCategories();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: product?.name ?? "",
      price: product?.price ?? "",
      category_id: product?.category_id ?? "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Wymagane"),
      price: Yup.number()
        .required("Wymagane")
        .min(0, "Musi być większa lub równa 0"),
      category_id: Yup.number()
        .required("Wymagane")
        .oneOf(
          categories.map((c) => c.id),
          "Nieprawidłowa kategoria"
        ),
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
    <PopupFormContainer className="popup">
      <form onSubmit={formik.handleSubmit}>
        <PopupFormTitle className={`${mode === 'delete' ? "delete" : ""}`}>
          {mode === "add"
            ? "Nowy produkt"
            : mode === "edit"
            ? "Edycja produktu"
            : "Czy na pewno chcesz usunąć produkt?"}
        </PopupFormTitle>
        {error && <PopupFormError className="error">{error}</PopupFormError>}
        {mode !== "delete" && (
          <>
            <FormControl className="form-control">
              <FormControlLabel htmlFor="name">
                Nazwa:
              </FormControlLabel>
              <FormControlInput
                type="text"
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name && (
                <PopupFormError className="input-error">
                  {formik.errors.name}
                </PopupFormError>
              )}
            </FormControl>
            <FormControl className="form-control">
              <FormControlLabel htmlFor="price">Cena:</FormControlLabel>
              <FormControlInput
                type="number"
                id="price"
                name="price"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
              />
              {formik.touched.price && formik.errors.price && (
                <PopupFormError className="input-error">
                  {formik.errors.price}
                </PopupFormError>
              )}
            </FormControl>
            <FormControl className="form-control">
              <FormControlLabel htmlFor="category_id">
                Kategoria:
              </FormControlLabel>
              <FormControlSelect
                id="category_id"
                name="category_id"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.category_id}
              >
                <option value="">Wybierz kategorię</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </FormControlSelect>
              {formik.touched.category_id && formik.errors.category_id && (
                <PopupFormError className="input-error">
                  {formik.errors.category_id}
                </PopupFormError>
              )}
            </FormControl>
          </>
        )}
        <FormActions className={`form-actions ${mode === 'delete' ? "delete" : ""}`}>
          <FormButton type="submit" disabled={formik.isSubmitting}>
            {mode === "delete"
              ? "Usuń produkt"
              : mode === "edit"
              ? "Edytuj produkt"
              : "Dodaj produkt"}
          </FormButton>
          <FormButton type="button" onClick={onClose}>
            {mode === "delete" ? "Oszczędź" : "Anuluj"}
          </FormButton>
        </FormActions>
      </form>
    </PopupFormContainer>
  );
};

export default PopupForm;
