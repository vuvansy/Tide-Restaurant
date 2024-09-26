import authApiRequest from "@/apiRequests/auth";
import { LoginBodyType } from "@/schemaValidations/auth.schema";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { HttpError } from "@/lib/http";

export async function POST(request: Request) {
    const body = (await request.json()) as LoginBodyType; //Nhận body người dùng gửi lên
    const cookieStore = cookies(); //Thư viện của next/headers
    try {
        const { payload } = await authApiRequest.sLogin(body); //Gọi API BE
        const { accessToken, refreshToken } = payload.data; //Nhận về dữ liệu

        //decode để lấy ra thời điểm hết hạn(EXP) của accessToken, refreshToken
        const decodedAccessToken = jwt.decode(accessToken) as { exp: number };
        const decodedRefreshToken = jwt.decode(refreshToken) as { exp: number };

        //Set accessToken,refreshToken vào cookies
        cookieStore.set("accessToken", accessToken, {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            secure: true,
            expires: decodedAccessToken.exp * 1000,
        });
        cookieStore.set("refreshToken", refreshToken, {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            secure: true,
            expires: decodedRefreshToken.exp * 1000,
        });

        return Response.json(payload); //API từ phía server BE trả về gì thì trả về toàn bộ dữ liệu
    } catch (error) {
        if (error instanceof HttpError) {
            return Response.json(error.payload, {
                status: error.status,
            });
        } else {
            return Response.json(
                {
                    message: "Có lỗi xảy ra",
                },
                {
                    status: 500,
                }
            );
        }
    }
}
