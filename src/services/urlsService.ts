import { Urls } from "../entity/Urls"
import crypto from "crypto"
import { FindExistedOriginUrlResponse } from "../types/response/FindExistedOriginUrlResponse"
import { UrlEntity } from "../types/entity/UrlEntity"

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
}
