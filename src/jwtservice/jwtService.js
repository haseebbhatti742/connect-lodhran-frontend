import axios from 'axios';
import jwtDefaultConfig from './jwtDefaultConfig';

class JwtService {
    jwtConfig = { ...jwtDefaultConfig };

    isAlreadyFetchingAccessToken = false;

    subscribers = [];

    constructor() {
        axios.interceptors.request.use(
            (config) => {
                const accessToken = this.getToken();

                if (accessToken) {
                    config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
                }
                config.headers['Content-Type'] = 'application/json';
                config.headers['Access-Control-Allow-Origin'] = '*';
                return config;
            },
            (error) => Promise.reject(error)
        );

        axios.interceptors.response.use(
            (response) => response,
            (error) => {
                console.log(error);
                const { config, response } = error;
                const originalRequest = config;

                // ** if (status === 401) {
                if (response && response.status === 401 && !originalRequest.url.includes('/auth/refreshToken')) {
                    // ** refreshToken not needed on these urls
                    if (originalRequest.url.includes('/auth/login')) {
                        return Promise.reject(error);
                    } else if (!this.isAlreadyFetchingAccessToken) {
                        this.isAlreadyFetchingAccessToken = true;
                        this.refreshToken()
                            .then((r) => {
                                console.log(`refresh response ${r}`);
                                this.isAlreadyFetchingAccessToken = false;
                                this.setToken(r.data.accessToken);
                                this.setRefreshToken(r.data.refreshToken);
                                this.onAccessTokenFetched(r.data.accessToken);
                            })
                            .catch((e) => {
                                console.log(e);
                                this.isAlreadyFetchingAccessToken = false;
                                if (e.response.status >= 400) {
                                    console.log('logout now');
                                    this.removeIsLogin();
                                    this.removeUser();
                                    this.removeToken();
                                    this.removeRefreshtoken();
                                }
                            });
                    }
                    const retryOriginalRequest = new Promise((resolve) => {
                        this.addSubscriber((accessToken) => {
                            this.isAlreadyFetchingAccessToken = false;
                            originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
                            resolve(axios(originalRequest));
                        });
                    });
                    return retryOriginalRequest;
                }
                return Promise.reject(error);
            }
        );
    }

    onAccessTokenFetched(accessToken) {
        this.subscribers = this.subscribers.filter((callback) => callback(accessToken));
    }

    addSubscriber(callback) {
        this.subscribers.push(callback);
    }

    setIsLogin(check) {
        localStorage.setItem(this.jwtConfig.storageIsLoginKeyName, check);
    }

    getIsLogin() {
        const isLogin = localStorage.getItem(this.jwtConfig.storageIsLoginKeyName);
        if (isLogin && (isLogin === true || isLogin === 'true')) return true;
        else return false;
    }

    removeIsLogin() {
        localStorage.removeItem(this.jwtConfig.storageIsLoginKeyName);
    }

    setToken(value) {
        localStorage.setItem(this.jwtConfig.storageTokenKeyName, value);
    }

    getToken() {
        return localStorage.getItem(this.jwtConfig.storageTokenKeyName);
    }

    removeToken() {
        localStorage.removeItem(this.jwtConfig.storageTokenKeyName);
    }

    setRefreshToken(value) {
        localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value);
    }

    getRefreshToken() {
        return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName);
    }

    removeRefreshtoken() {
        localStorage.removeItem(this.jwtConfig.storageRefreshTokenKeyName);
    }

    setUser(value) {
        localStorage.setItem(this.jwtConfig.storageUserKeyName, value);
    }

    getUser() {
        return localStorage.getItem(this.jwtConfig.storageUserKeyName);
    }

    removeUser() {
        localStorage.removeItem(this.jwtConfig.storageUserKeyName);
    }

    login(args) {
        return axios.post(this.jwtConfig.loginEndpoint, args);
    }

    logout() {
        return axios.post(this.jwtConfig.logoutEndpoint, {
            refreshToken: this.getRefreshToken()
        });
    }

    refreshToken() {
        return axios.post(this.jwtConfig.refreshEndpoint, {
            refreshToken: this.getRefreshToken()
        });
    }
}

const jwt = new JwtService();
export default jwt;
