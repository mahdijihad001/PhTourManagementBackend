import { Response } from "express";

interface authToken {
    refreshToken?: string,
    accessToken?: string
}

export const setAuthCookie = (res: Response, tokenInfo: authToken) => {
    if (tokenInfo.accessToken) {
        res.cookie("accessToken", tokenInfo.accessToken, {
            httpOnly: true,
            secure: false
        })
    }
    if (tokenInfo.refreshToken) {
        res.cookie("refreshToken", tokenInfo.refreshToken, {
            httpOnly: true,
            secure: false,
        });
    }
}