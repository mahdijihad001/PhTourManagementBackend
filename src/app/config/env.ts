import dotenv from "dotenv";

dotenv.config();

interface EnvInterfaces {
    port: string,
    mongo_url: string,
    node_env: string,
    ACCESS_SECRATE : string,
    SUPER_ADMIN_EMAIL : string,
    SUPER_ADMIN_PASSWORD : string
};

const loadEnvVariables = (): EnvInterfaces => {
    const requiredEnvVariables: string[] = ["PORT", "MONGO_URI", "NODE_ENVIRONMENT" , "ACCESS_SECRATE" , "SUPER_ADMIN_PASSWORD" , "SUPER_ADMIN_EMAIL"];

    requiredEnvVariables.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing required environment variabl ${key}`)
        }
    });

    return {
        port: process.env.PORT as string,
        mongo_url: process.env.MONGO_URI as string,
        node_env: process.env.NODE_ENVIRONMENT as string,
        ACCESS_SECRATE : process.env.ACCESS_SECRATE as string,
        SUPER_ADMIN_EMAIL : process.env.SUPER_ADMIN_EMAIL as string,
        SUPER_ADMIN_PASSWORD : process.env.SUPER_ADMIN_PASSWORD as string
    }
}

export const envVar = loadEnvVariables();