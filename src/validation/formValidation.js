import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Email invalide").required("Email est requis"),
  password: Yup.string().required("Le mot de passe est requis"),
});
