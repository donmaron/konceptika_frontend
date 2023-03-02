import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  > form {
    width:100%;
  }
`;

const FormField = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 14px;
  color: #3D4975;
  margin-bottom: 0.5rem;
`;

const Input = styled(Field)`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Error = styled(ErrorMessage)`
  color: #CF4544;
`;

const Button = styled.button`
  margin: 0.5rem 0;
  padding: 14px;
  background-color: #5B66DC;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width:100%;

  &:hover {
  background-color: #5B66FF;
  }
`;

const ErrorStyling = styled.p`
  color: #CF4544;
  position: absolute;
  right: 0;
  bottom: 25px;
  font-size: 14px;
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
  email: Yup.string().email("Podaj prawidłowy Email").required("Wymagane"),
  password: Yup.string().required("Wymagane"),
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
              <Label htmlFor="email">Login</Label>
              <Input type="email" name="email" id="email" />
              <ErrorStyling><Error name="email" /></ErrorStyling>
            </FormField>
            <FormField>
              <Label htmlFor="password">Hasło</Label>
              <Input type="password" name="password" id="password" />
              <ErrorStyling><Error name="password" /></ErrorStyling>
            </FormField>
            <Button type="submit" disabled={!formik.isValid || formik.isSubmitting}>
              {formik.isSubmitting ? "Loguję..." : "Zaloguj się"}
            </Button>
          </Form>
        </FormWrapper>
      )}
    </Formik>
  );
};
