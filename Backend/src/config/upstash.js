
import { Ratelimit } from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";
import dotenv from  "dotenv";
dotenv.config();
// const { Ratelimit } = pkg;
//creating a rate limiter that allow 10 request per 20 secods;
const rateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
   limiter: Ratelimit.slidingWindow(5, "10 s"),

})
export default rateLimit;