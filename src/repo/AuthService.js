
export const AuthService = {

    isAuthenticated: () => {
        if (window.localStorage.getItem('auth')) {
            return true;
        } return false;
    },

    getAccessToken: () => {
        let isAuthenticated = false;
        if (window.localStorage.getItem('auth')) {
            isAuthenticated = true;
        } else {
            isAuthenticated = false;
        }
        if (isAuthenticated) {
            return JSON.parse(window.localStorage.getItem('auth')).access_token
        }
        return null;
    },

    storeToken: (data) => {
        window.localStorage.setItem('auth', JSON.stringify(data));
        window.location = "/tickets";
    },

    logout: () => {
        window.localStorage.removeItem('auth');
        window.location = "/login";
    }
};