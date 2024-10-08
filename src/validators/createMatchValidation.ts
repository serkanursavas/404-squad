import * as Yup from "yup";

export const createMatchValidationSchema = Yup.object().shape({
  location: Yup.string().required("Match place is required"),
  matchDate: Yup.string().required("Match date is required"),
  teamSize: Yup.number()
    .min(6, "Team size must be at least 6")
    .max(11, "Team size can be at most 11")
    .required("Team size is required"),
  whiteTeam: Yup.array()
    .of(Yup.string())
    .min(Yup.ref("teamSize"), "The number of selected players must be exactly the same as the team size")
    .max(Yup.ref("teamSize"), "The number of selected players must be exactly the same as the team size"),
  blackTeam: Yup.array()
    .of(Yup.string())
    .min(Yup.ref("teamSize"), "The number of selected players must be exactly the same as the team size")
    .max(Yup.ref("teamSize"), "The number of selected players must be exactly the same as the team size"),
});
