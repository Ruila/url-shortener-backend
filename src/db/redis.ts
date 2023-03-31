import * as redis from "redis"

export const redisClient = redis.createClient({ url: "redis://redis:6379" })

export const runRedis = async () => {
  redisClient.on("error", err => console.log("Redis Client Error", err))

  await redisClient.connect()

  await redisClient.setEx("test", 1500, "test-value")
  const value = await redisClient.get("test")
  console.info("======successfully get value from redis=====", value)
}
