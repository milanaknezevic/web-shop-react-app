import base from './base.service';

const token = sessionStorage.getItem('access');
const instance = base.service(true);

export const insertMessage = (messageData) => {
    return instance
        .post('messages/', messageData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((results) => {
            return results.data;
        })
        .catch((err) => Promise.reject(err.response.status));
}

const messageService = {
    insertMessage
};
export default messageService;