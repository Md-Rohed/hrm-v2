import { jwtDecode } from "jwt-decode";

const isAuth = () => {
    //it will check is any token stored in local storage
    //is the token valid
    //if all login credential matches then return true else false

    if (JSON.parse(localStorage.getItem('w_auth')) !== null) {
        const token = JSON.parse(localStorage.getItem('w_auth')).accessToken;

        const exp = jwtDecode(JSON.stringify(token)).exp * 1000;
        if (Date.now() >= exp) {
            return { isValid: false, accessToken: null };
        }
        return { isValid: true, accessToken: token };
    }
    return { isValid: false, accessToken: null };
}
export default isAuth;