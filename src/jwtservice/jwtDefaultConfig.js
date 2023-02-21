const BASE_URL = 'http://localhost:3000/api/v1';

export default {
    tokenType: 'Bearer',

    storageTokenKeyName: 'accessToken',
    storageRefreshTokenKeyName: 'refreshToken',
    storageUserKeyName: 'user',
    storageIsLoginKeyName: 'isLogin',

    //auth endpoints
    loginEndpoint: `${BASE_URL}/auth/login`,
    refreshEndpoint: `${BASE_URL}/auth/refreshToken`,
    logoutEndpoint: `${BASE_URL}/auth/logout`
};
