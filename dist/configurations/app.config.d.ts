export declare const AppConfig: {
    name: string;
    env: import("./env.config").NODE_ENV;
    port: number;
    host: string;
    key: string;
    environment: string;
    redis: {
        host: string;
        port: number;
        username: string;
        password: string;
    };
    database: string;
};
