import base from "./base.service"

const token = sessionStorage.getItem('access');
const instance = base.service(true);
export const getUserByID = (id) => {
    return instance
        .get(`users/${id}`)
        .then((result) => result.data)
};

export const getAllProductsForBuyer = (page) => {
    return instance
        .get(`users/purchases?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((result) => result.data);
};

export const getAllProductsForSeller = (page, finished) => {
    return instance
        .get(`users/products?page=${page}&finished=${finished}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((result) => result.data);
};

export const updateUser = (id, userDataToUpdate) => {
    return instance
        .put(`users/${id}`, userDataToUpdate, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((result) => result.data);
};
export const changePassword = (id, changePasswordData) => {
    return instance
        .put(`users/${id}/change-password/`, changePasswordData)
        .then((results) => results);
}
const userService = {
    getUserByID,
    getAllProductsForSeller,
    getAllProductsForBuyer,
    updateUser,
    changePassword
};
export default userService;