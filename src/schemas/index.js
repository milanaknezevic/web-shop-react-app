import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const changePasswordSchema = yup.object().shape({
    lozinka: yup
        .string()
        .min(8)
        .matches(passwordRules, { message: "Please create a stronger password" })
        .required("Required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("lozinka"), null], "Passwords must match")
        .required("Required"),
});
export const formaSchemaTMP = yup.object().shape({
    password: yup
        .string()
        .min(8)
        .matches(passwordRules, { message: "Please create a stronger password" })
        .required("Required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Required"),
});
export const formaSchema = yup.object().shape({
    username: yup
        .string()
        .min(3, "Username must be at least 3 characters long")
        .required("Required"),
    password: yup
        .string()
        .required("Required"),
});


export const editSchema = yup.object().shape({
    ime: yup
        .string()
        .min(3, "First name must be at least 3 characters long")
        .required("Required"),
    prezime: yup
        .string()
        .min(3, "Last name must be at least 3 characters long")
        .required("Required"),
    korisnickoIme: yup
        .string()
        .min(5, "Username must be at least 5 characters long")
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
