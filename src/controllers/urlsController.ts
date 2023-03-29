import express from "express"
import { Urls } from "../entity/Urls"
import { CreateShortenUrlRequest } from "../types/request/CreateShortenUrlRequest"
import { RedirectUrlRequest } from "../types/request/RedirectUrlRequest"
import { urlsService } from "../services/urlsService"
import { ErrorCodeMap } from "../utils/ErrorCodeMap"

export const urlsController = {
  getUrls: async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    try {
      res.status(200).send("getUrls")
    } catch (err) {
      res.status(417).send("getUrls errors")
    }
  },
  redirectUrl: async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const { shorten_url } = req.params as RedirectUrlRequest
    try {
      const existedUrl = await urlsService.findExistedOriginUrl(shorten_url)
      if (existedUrl) res.status(301).redirect(existedUrl)
      else res.status(417).send(ErrorCodeMap.URL_NOT_EXISTED)
    } catch (err) {
      res.status(417).send("getUrls errors")
    }
  },
  createUrl: async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    try {
      const { origin_url, created_by } = req.body as CreateShortenUrlRequest
      const existedUrl = await urlsService.findExistedShortenUrl(origin_url)
      if (existedUrl) {
        res.status(200).send({
          shorten_url: existedUrl,
        })
      } else {
        await Urls.create({
          origin_url,
          created_by,
          shorten_url: "123",
        }).then(response => {
          res.status(200).send(response.get({ plain: true }).shorten_url)
        })
      }
    } catch (err) {
      res.status(417).send(JSON.stringify(err))
    }
  },
}
