import * as yup from "yup";


export const buyProductByCash = yup.object().shape({
    adresa: yup
        .string()
        .min(5, "Address must be at least 5 characters long")
        .required("Required"),
});
export const buyProductByCard = yup.object().shape({
    kartica: yup
        .string()
        .length(16, "Address must be exactly 16 characters long")
        .test('is-16-digits', 'Address must be exactly 16 digits', value => /^\d{16}$/.test(value))
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
    email: yup
        .string()
        .email()
        .required("Required"),
    grad: yup
        .string()
        .min(2, "City must be at least 2 characters long")
        .required("Required"),
});
