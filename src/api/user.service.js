import base from "./base.service"

const token = sessionStorage.getItem('access');
const instance = base.service(true);

export const getUserByID = (id) => {
    console.log("id u slice  " + id);
    console.log("token " + token);
    return instance
        .get(`users/${id}`)
        .then((results) => results.data);
};

export const getAllProductsForBuyer = (page) => {
    return instance
        .get(`users/purchases`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                page: page.pageNumber,
                size: page.pageSize
            }
        })
        .then((result) => result.data);
};

export const getAllProductsForSeller = (page, finished) => {
    return instance
        .get(`users/products`, {
            headers: {
                Authorization: `Bearer ${token}`
            }, params: {
                page: page.pageNumber,
                size: page.pageSize,
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