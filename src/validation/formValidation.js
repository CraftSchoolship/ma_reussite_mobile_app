import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Email invalide").required("Email est requis"),
  password: Yup.string().required("Le mot de passe est requis"),
});

export const EditProfileValidationSchema = Yup.object({
  name: Yup.string().required("Nom est requis"),
  // email: Yup.string().email("Email invalide").required("Email est requis"),
  // phone: Yup.string().required("Téléphone est requis"),
  // address: Yup.string().required("Adresse est requise"),
});
