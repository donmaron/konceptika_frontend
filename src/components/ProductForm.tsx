import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const initialValues = {
    name: product.name,
    price: product.price,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    price: Yup.number().required("Required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="name">Name</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <Field type="number" name="price" />
            <ErrorMessage name="price" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Save
          </button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </Form>
      )}
    </Formik>
  );
};
export default ProductForm;