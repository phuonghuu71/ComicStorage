declare namespace NodeJS {
  interface ProcessEnv {
    URL: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_URL_INTERNAL: string;
    NEXTAUTH_SECRET: string;
    MONGODB_URI: string;
    NEXT_PUBLIC_TINY_API_KEY: string;
    CLOUDINARY_URL_IMG: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
    CLOUDINARY_CLOUD_NAME: string;
  }
}
