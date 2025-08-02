import dotenv from "dotenv";

dotenv.config();

interface EnvInterfaces {
    port: string,
    mongo_url: string,
    node_env: string,
    ACCESS_SECRATE: string,
    ACCESS_EXPIERS: string,
    REFRESH_SECRATE: string,
    REFRESH_EXPIRED: string,
    SUPER_ADMIN_EMAIL: string,
    SUPER_ADMIN_PASSWORD: string
};

const loadEnvVariables = (): EnvInterfaces => {
    const requiredEnvVariables: string[] = ["PORT", "MONGO_URI", "NODE_ENVIRONMENT", "ACCESS_SECRATE", "SUPER_ADMIN_PASSWORD", "SUPER_ADMIN_EMAIL", "ACCESS_EXPIERS", "REFRESH_SECRATE", "REFRESH_EXPIRED"];

    requiredEnvVariables.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing required environment variabl ${key}`)
        }
    });

    return {
        port: process.env.PORT as string,
        mongo_url: process.env.MONGO_URI as string,
        node_env: process.env.NODE_ENVIRONMENT as string,
        ACCESS_SECRATE: process.env.ACCESS_SECRATE as string,
        SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
        SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
        ACCESS_EXPIERS: process.env.ACCESS_EXPIERS as string,
        REFRESH_EXPIRED: process.env.REFRESH_EXPIRED as string,
        REFRESH_SECRATE: process.env.REFRESH_SECRATE as string,
    }
}

export const envVar = loadEnvVariables();