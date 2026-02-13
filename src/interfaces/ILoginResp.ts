export interface ILoginResponse {
    data: {
        token: string;
        user: {
            email: string;
            id: number;
            username: string;
        };
    };
    message: string;
    status: string;
}
