export interface SignUserToken {
    id: string;
    email?: string;
    phone?: string;
}

export interface UserLogIn {
    email?: string;
    countryCode?: string;
    phone?: string;
    password: string;
}
