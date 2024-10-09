import * as Yup from "yup";

export const playerUpdateValidationSchema = Yup.object().shape({
  name: Yup.string().required("Username is required").min(3, "Username must be at least 3 characters long"),
  age: Yup.number().required("Age is required").min(18, "Age must be at least 18"),
  position: Yup.string().required("Position is required"),
  foot: Yup.string().required("Foot is required"),
  photo: Yup.string().required("Photo is required"),
});
