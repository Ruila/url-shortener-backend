import { Urls } from "../entity/Urls"

export const urlsService = {
  findExistedShortenUrl: async (
    originUrl: string
  ): Promise<string | undefined> => {
    try {
      const findUrl = await Urls.findOne({ where: { origin_url: originUrl } })
      if (findUrl) {
        const parseData = findUrl.get({ plain: true })
        return parseData.shorten_url
      } else return undefined
    } catch (err) {
      console.info("findExistedShortenUrl Error", JSON.stringify(err))
    }
  },
  findExistedOriginUrl: async (
    shortenUrl: string
  ): Promise<string | undefined> => {
    try {
      const findUrl = await Urls.findOne({ where: { shorten_url: shortenUrl } })
      if (findUrl) {
        const parseData = findUrl.get({ plain: true })
        return parseData.origin_url
      } else return undefined
    } catch (err) {
      console.info("findExistedShortenUrl Error", JSON.stringify(err))
    }
  },
}
