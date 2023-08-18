import * as yup from "yup";


export const editSchema = yup.object().shape({
    ime: yup
        .string()
        .min(3, "First name must be at least 3 characters long")
        .required("Required"),
    prezime: yup
        .string()
        .min(3, "Last name must be at least 3 characters long")
        .required("Required"),
    email: yup
        .string()
        .email()
        .required("Required"),
    grad: yup
        .string()
        .min(2, "City must be at least 2 characters long")
        .required("Required"),
});
