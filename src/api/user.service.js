import base from "./base.service"

const token = sessionStorage.getItem('access');
const instance = base.service(true);

export const getUserByID = (id) => {
    console.log("id u slice  " + id);
    return instance
        .get(`users/${id}`)
        .then((results) => results.data);
};

export const getAllProductsForBuyer = (pageNumber, pageSize) => {
    return instance
        .get(`users/purchases`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                page: pageNumber,
                size: pageSize
            }
        })
        .then((result) => result.data);
};

export const getAllProductsForSeller = (pageNumber, pageSize,finished) => {
    return instance
        .get(`users/products`, {
            headers: {
                Authorization: `Bearer ${token}`
            }, params: {
                page: pageNumber,
                size: pageSize,
                finished: finished,

            },
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
        .put(`users/${id}/change-password/`, changePasswordData, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
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