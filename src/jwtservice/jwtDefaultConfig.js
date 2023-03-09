const BASE_URL = 'http://127.0.0.1:4000/api/v1';

export default {
    tokenType: 'Bearer',

    storageTokenKeyName: 'accessToken',
    storageRefreshTokenKeyName: 'refreshToken',
    storageUserKeyName: 'user',
    storageIsLoginKeyName: 'isLogin',

    //auth endpoints
    loginEndpoint: `${BASE_URL}/auth/login`,
    refreshEndpoint: `${BASE_URL}/auth/refreshToken`,
    logoutEndpoint: `${BASE_URL}/auth/logout`,

    //isp endpoint
    ispEndpoint: `${BASE_URL}/isp`,

    //package endpoint
    packageEndpoint: `${BASE_URL}/package`,

    //staff endpoint
    staffEndpoint: `${BASE_URL}/staff`,

    //user endpoint
    userEndpoint: `${BASE_URL}/user`,

    //entry endpoint
    entryEndpoint: `${BASE_URL}/entry`,

    //invoice endpoint
    invoiceEndpoint: `${BASE_URL}/invoice`,

    //expense endpoint
    expenseEndpoint: `${BASE_URL}/expense`,

    //summary endpoint
    summaryEndpoint: `${BASE_URL}/summary`
};
