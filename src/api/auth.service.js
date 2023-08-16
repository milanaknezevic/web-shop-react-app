import base from './base.service';

const instance = base.service();

export const login = (korisnickoIme, lozinka) => {
    console.log("loginujem se");
    return instance
        .post('login', {korisnickoIme, lozinka})
        .then((results) => {
            const {token} = results.data;
            sessionStorage.setItem('access', token);
            console.log("token  " +  sessionStorage.getItem('access'));
            return results.data;
        })
        .catch((err) => Promise.reject(err.response.status));
}

export const insertImage = (imageData) => {
    const file = imageData.get("file");
    return instance
        .post('insertImage', {file}, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((results) => results);
}

export const signUp = (signupData) => {
    return instance
        .post('sign-up', signupData)
        .then((results) => results);
}
export const activateAccount = (activationData) => {
    console.log("activation data" +activationData);
    return instance
        .post('activeAccount', activationData)
        .then((results) => results);
}

export const logout = () => sessionStorage.removeItem('access');

const authService = {
    login,
    signUp,
    activateAccount,
    logout
};
export default authService;