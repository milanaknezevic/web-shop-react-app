import base from "./base.service"

const instance = base.service();
export const getAllCategories = () => {
    return instance
        .post('categories/')
        .then((results) => {
            return results.data;
        })
        .catch((err) => Promise.reject(err.response.status));
};

export const getCategoryByID = (id) => {
    return instance
        .get(`categories/${id}`)
        .then((result)=>result.data)
};

export const getAllProductsInCategory = (id, page) => {
    return instance
        .get(`categories/${id}/products?page=${page}`)
        .then((result) => result.data);
};


const categoryService = {
    getAllCategories,
    getCategoryByID,
    getAllProductsInCategory
};
export default categoryService;