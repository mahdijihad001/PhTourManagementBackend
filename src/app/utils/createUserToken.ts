import { IUser } from "../modules/users/user.interface";
import { generateJwtToken, refreshToken } from "./jwt";

export const createUserTokens = async (user: Partial<IUser>) => {
    const jwtPayload = { userID: user._id, email: user.email, role: user.role };

    const accessTok = generateJwtToken(jwtPayload);
    const refreshTok = refreshToken(jwtPayload);

    return {
        accessTok,
        refreshTok
    }

};

