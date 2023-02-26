const BASE_URL = 'http://localhost:4000/api/v1';

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

    //user endpoint
    userEndpoint: `${BASE_URL}/user`,

    //entry endpoint
    entryEndpoint: `${BASE_URL}/entry`,

    //staff endpoint
    staffEndpoint: `${BASE_URL}/staff`
};
