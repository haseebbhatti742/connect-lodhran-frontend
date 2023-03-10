import axios from 'axios';
import config from 'config';
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
            (error) => {
                console.log('jwt error');
                console.log(error);
                Promise.reject(error);
            }
        );

        // axios.interceptors.response.use(config, (error) => {
        //     console.log('jwt error');
        //     console.log(error);
        //     if (error?.code === 'ERR_NETWORK') {
        //         this.setIsLogin(false);
        //         this.removeToken();
        //         this.removeRefreshtoken();
        //         this.removeUser();
        //         window.location.replace('/api-error');
        //     }
        //     Promise.reject(error);
        // });
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
        localStorage.setItem(this.jwtConfig.storageUserKeyName, JSON.stringify(value));
    }

    getUser() {
        return JSON.parse(localStorage.getItem(this.jwtConfig.storageUserKeyName));
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

    createIsp(payload) {
        return axios.post(this.jwtConfig.ispEndpoint, payload);
    }

    getAllIsps() {
        return axios.get(this.jwtConfig.ispEndpoint);
    }

    getIspById(id) {
        return axios.get(`${this.jwtConfig.ispEndpoint}/${id}`);
    }

    createPackage(payload) {
        return axios.post(this.jwtConfig.packageEndpoint, payload);
    }

    getAllPackages(isp) {
        return axios.get(`${this.jwtConfig.packageEndpoint}/by-isp/${isp}`);
    }

    updatePackage(id, payload) {
        return axios.patch(`${this.jwtConfig.packageEndpoint}/${id}`, payload);
    }

    deletePackage(id) {
        return axios.delete(`${this.jwtConfig.packageEndpoint}/${isp}`);
    }

    createUser(payload) {
        return axios.post(this.jwtConfig.userEndpoint, payload);
    }

    getAllUsers() {
        return axios.get(this.jwtConfig.userEndpoint);
    }

    createEntry(payload) {
        return axios.post(this.jwtConfig.entryEndpoint, payload);
    }

    updateEntry(id, payload) {
        return axios.patch(`${this.jwtConfig.entryEndpoint}/${id}`, payload);
    }

    getEntryById(id) {
        return axios.get(`${this.jwtConfig.entryEndpoint}/${id}`);
    }

    getAllCompletedEntries(payload) {
        return axios.post(`${this.jwtConfig.entryEndpoint}/completed`, payload);
    }

    getAllPendingEntries() {
        return axios.get(`${this.jwtConfig.entryEndpoint}/pending`);
    }

    addStaff(payload) {
        return axios.post(this.jwtConfig.staffEndpoint, payload);
    }

    getAllStaffs() {
        return axios.get(this.jwtConfig.staffEndpoint);
    }

    getAllPartners() {
        return axios.get(`${this.jwtConfig.staffEndpoint}/getAllPartners`);
    }

    createInvoice(payload) {
        return axios.post(this.jwtConfig.invoiceEndpoint, payload);
    }

    createExpense(payload) {
        return axios.post(this.jwtConfig.expenseEndpoint, payload);
    }

    getCompletedExpenses(payload) {
        return axios.post(`${this.jwtConfig.expenseEndpoint}/completed`, payload);
    }

    getPendingExpenses() {
        return axios.get(`${this.jwtConfig.expenseEndpoint}/pending`);
    }

    approveExpense(id) {
        return axios.get(`${this.jwtConfig.expenseEndpoint}/approve/${id}`);
    }

    deleteExpense(id) {
        return axios.delete(`${this.jwtConfig.expenseEndpoint}/${id}`);
    }

    getSummary(payload) {
        return axios.post(this.jwtConfig.summaryEndpoint, payload);
    }
}

const jwt = new JwtService();
export default jwt;
