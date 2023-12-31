import base from './base.service';

const token = sessionStorage.getItem('access');
const authenticatedInstance = base.service(true);
const unauthenticatedInstance = base.service();
export const getProductByID = (id) => {
    console.log("u servisuu " +id);

    return unauthenticatedInstance
        .get(`products/${id}`)
        .then((result) => result.data)
};
export const getAllProducts = (pageNumber, pageSize,naslov) => {
   return unauthenticatedInstance
        .get(`products`, {
            params: {
                page: pageNumber,
                size: pageSize,
                naslov:naslov
            }
        })
        .then((result) => result.data);
};
export const searchProducts = (pageNumber, pageSize,searchData) => {
    return unauthenticatedInstance
        .post(`products/searchProducts`, searchData, {
            params: {
                page: pageNumber,
                size: pageSize,
            },
        })
        .then((results) => {
            return results.data;
        })
        .catch((err) => Promise.reject(err.response.status));
}
export const insertProduct = (productData) => {
    return authenticatedInstance
        .post('products/', productData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((results) => {
            return results.data;
        })
        .catch((err) => Promise.reject(err.response.status));
}
export const sendQuestion = (id,questionData) => {
    return authenticatedInstance
        .post(`products/${id}/question/`, questionData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((results) => {
            return results.data;
        })
        .catch((err) => Promise.reject(err.response.status));
}
export const sendAnswer = (id, answerData) => {
    return authenticatedInstance
        .put(`products/${id}/answer`, answerData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((result) => result.data);
};
export const deleteProduct = (id) => {
    return unauthenticatedInstance
        .delete(`products/${id}`)
        .then((result) => result.data)
};


export const purchaseProduct = (id) => {
    return authenticatedInstance
        .put(`products/${id}/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((result) => result.data);
};
const messageService = {
    getAllProducts,
    getProductByID,
    insertProduct,
    sendQuestion,
    sendAnswer,
    deleteProduct,
    purchaseProduct,
    searchProducts
};
export default messageService;