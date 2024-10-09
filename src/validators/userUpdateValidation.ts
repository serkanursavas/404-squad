import * as Yup from "yup";

export const userUpdateValidationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required").min(3, "Username must be at least 3 characters long"),
  role: Yup.string().required("Role is required"),
});
