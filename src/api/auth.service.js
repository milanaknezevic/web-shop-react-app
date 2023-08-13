import base from './base.service';

const instance = base.service();

export const login = (korisnickoIme, lozinka) => {
    return instance
        .post('login', {korisnickoIme, lozinka})
        .then((results) => {
            const {token} = results.data;
            sessionStorage.setItem('access', token);
            return results.data;
        })
        .catch((err) => Promise.reject(err.response.status));
}
export const signUp = (signupData) => {
    return instance
        .post('sign-up', signupData)
        .then((results) => results);
}
export const activateAccount = (activationData) => {
    return instance
        .post('activeAccount/', activationData)
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