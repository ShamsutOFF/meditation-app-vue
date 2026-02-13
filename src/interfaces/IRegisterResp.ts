export interface IRegisterResponse {
    data: {
        email: string;
        id: number;
        username: string;
    };
    message: string;
    status: string;
}
