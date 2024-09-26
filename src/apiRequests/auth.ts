import http from "@/lib/http";
import { LoginBodyType, LoginResType } from "@/schemaValidations/auth.schema";
const authApiRequest = {
    //Gọi phía server
    sLogin: (body: LoginBodyType) =>
        http.post<LoginResType>("/auth/login", body),
    //Gọi phía client
    login: (body: LoginBodyType) =>
        http.post<LoginResType>("/api/auth/login", body, {
            baseUrl: "",
        }),
};
export default authApiRequest;
