export interface AuthResponseData {
    idToken: string;
    email: string;
    password: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}