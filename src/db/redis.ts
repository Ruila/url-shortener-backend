import * as redis from "redis"
import { urlsService } from "../services/urlsService"

export const redisClient = redis.createClient({ url: "redis://redis:6379" })
const subscriber = redis.createClient({ url: "redis://redis:6379" })

export const runRedis = async (): Promise<void> => {
  redisClient.on("error", err => console.log("Redis Client Error", err))

  await redisClient.connect()
  await redisClient.configSet("notify-keyspace-events", "Ex")

  await subscriber.connect()
  await subscriber.subscribe("__keyevent@0__:expired", async (key: string) => {
    console.log("=====get expired key from redis===== ", key)
    if (key.includes("url")) {
      await urlsService.handleRedisExpiredUrl(key.split(":")[1])
    }
  })

  await redisClient.setEx("test", 5, "test-value")
  const value = await redisClient.get("test")
  console.info("======successfully get value from redis=====", value)
}
