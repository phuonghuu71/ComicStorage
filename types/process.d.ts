declare namespace NodeJS {
  interface ProcessEnv {
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_URL_INTERNAL: string;
    NEXTAUTH_SECRET: string;
    MONGODB_URI: string;
    NEXT_PUBLIC_TINY_API_KEY: string;
  }
}
