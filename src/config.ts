import dotenv from 'dotenv';

dotenv.config({});

class Config {
  public DATABASE_HOST: string | undefined;
  public DATABASE_USER: string | undefined;
  public DATABASE_PASSWORD: string | undefined;
  public DATBASE_NAME: string | undefined;
  public SERVER_PORT: string | undefined;
  public NODE_ENV: string | undefined;
  public RABBITMQ_ENDPOINT: string | undefined;
  public JWT_TOKEN: string | undefined;
  public GATEWAY_JWT_TOKEN: string | undefined;
  public API_GATEWAY_URL: string | undefined;
  public ELASTIC_SEARCH_URL: string | undefined;
  public CLIENT_URL: string | undefined;
  public STRIPE_API_KEY: string | undefined;

  constructor() {
    this.DATABASE_HOST = process.env.DATABASE_HOST || '';
    this.DATABASE_USER = process.env.DATABASE_USER || '';
    this.DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || '';
    this.DATBASE_NAME = process.env.DATBASE_NAME || '';
    this.SERVER_PORT = process.env.SERVER_PORT || '';
    this.NODE_ENV = process.env.NODE_ENV || '';
    this.JWT_TOKEN = process.env.JWT_TOKEN || '';
    this.GATEWAY_JWT_TOKEN = process.env.GATEWAY_JWT_TOKEN || '';
    this.RABBITMQ_ENDPOINT = process.env.RABBITMQ_ENDPOINT || '';
    this.API_GATEWAY_URL = process.env.API_GATEWAY_URL || '';
    this.ELASTIC_SEARCH_URL = process.env.ELASTIC_SEARCH_URL || '';
    this.CLIENT_URL = process.env.CLIENT_URL || '';
    this.STRIPE_API_KEY = process.env.STRIPE_API_KEY || '';
  }
}

export const config: Config = new Config();
