//Validation data file .env
import { z } from "zod";

const configSchema = z.object({
    NEXT_PUBLIC_API_ENDPOINT: z.string(),
    NEXT_PUBLIC_URL: z.string(),
});

//safeParse validation những giá trị trong object so với configSchema
const configProject = configSchema.safeParse({
    NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
});

if (!configProject.success) {
    console.error(configProject.error.errors);
    throw new Error("Các khai báo biến trong môi trường không được hợp lệ");
}

const envConfig = configProject.data;

export default envConfig;
