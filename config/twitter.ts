import { Client, auth } from "twitter-api-sdk";


const authClient = new auth.OAuth2Bearer(process.env.TWITTER_BEARER!);
export const twitterClient = new Client(authClient);