
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

export default {
    // DATABASE
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,

    // JWT SECRET
    JWT_SECRET: process.env.JWT_SECRET,

    // SENDGRID CONFIG
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    SENDGRID_SENDER_EMAIL: process.env.SENDGRID_SENDER_EMAIL,

    // CLOUDINARY CONFIGURATION
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

    // PEXELS
    PEXELS_API_KEY: process.env.PEXELS_API_KEY,
};
