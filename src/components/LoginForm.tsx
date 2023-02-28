import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled(Field)`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Error = styled(ErrorMessage)`
  color: red;
`;

interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {(formik) => (
        <FormWrapper>
          <Form>
            <FormField>
              <Label htmlFor="email">Email:</Label>
              <Input type="email" name="email" id="email" />
              <Error name="email" />
            </FormField>
            <FormField>
              <Label htmlFor="password">Password:</Label>
              <Input type="password" name="password" id="password" />
              <Error name="password" />
            </FormField>
            <button type="submit" disabled={!formik.isValid || formik.isSubmitting}>
              {formik.isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        </FormWrapper>
      )}
    </Formik>
  );
};
