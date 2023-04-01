import { Urls } from "../entity/Urls"
import crypto from "crypto"
import { FindExistedOriginUrlResponse } from "../types/response/FindExistedOriginUrlResponse"
import { UrlEntity } from "../types/entity/UrlEntity"
import { redisClient } from "../db/redis"

export const urlsService = {
  findExistedShortenUrl: async (
    originUrl: string
  ): Promise<string | undefined> => {
    try {
      const findUrl = (await Urls.findOne({
        where: { origin_url: originUrl },
        raw: true,
      })) as UrlEntity | null
      if (findUrl) {
        return findUrl.shorten_url
      } else return undefined
    } catch (err) {
      console.info("findExistedShortenUrl Error", JSON.stringify(err))
    }
  },
  findExistedOriginUrl: async (
    shortenUrl: string
  ): Promise<FindExistedOriginUrlResponse | undefined> => {
    try {
      const findUrl = (await Urls.findOne({
        where: { shorten_url: shortenUrl },
        raw: true,
      })) as UrlEntity | null
      if (findUrl) {
        return {
          origin_url: findUrl.origin_url,
          viewed: findUrl.viewed,
        }
      } else return undefined
    } catch (err) {
      console.info("findExistedShortenUrl Error", JSON.stringify(err))
    }
  },
  generatedShortenUrl: (): string => {
    return crypto.randomBytes(5).toString("hex")
  },
  updateViewedCount: async (
    originUrl: string,
    viewedCount: number
  ): Promise<void> => {
    try {
      await Urls.update(
        {
          viewed: viewedCount,
        },
        {
          where: { origin_url: originUrl },
        }
      )
    } catch (e) {
      console.log("updateViewedCount Failed")
    }
  },
  handleRedisExpiredUrl: async (shortenUrl: string): Promise<void> => {
    const originUrl = (await redisClient.get(`shadow:${shortenUrl}`)) as string
    const viewedCount = Number(
      await redisClient.get(`url:${shortenUrl}:viewed`)
    )
    await urlsService.updateViewedCount(originUrl, viewedCount)
  },
}
