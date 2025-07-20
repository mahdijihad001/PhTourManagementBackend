import dotenv from "dotenv";

dotenv.config();

interface EnvInterfaces {
    port: string,
    mongo_url: string,
    node_env: string
};

const loadEnvVariables = (): EnvInterfaces => {
    const requiredEnvVariables: string[] = ["PORT", "MONGO_URI", "NODE_ENVIRONMENT"];

    requiredEnvVariables.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing required environment variabl ${key}`)
        }
    });

    return {
        port: process.env.PORT as string,
        mongo_url: process.env.MONGO_URI as string,
        node_env: process.env.NODE_ENVIRONMENT as string
    }
}

export const envVar = loadEnvVariables();