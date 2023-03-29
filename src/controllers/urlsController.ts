import express from "express"
import { Urls } from "../entity/Urls"
import { CreateShortenUrlRequest } from "../types/request/CreateShortenUrlRequest"
import { RedirectUrlRequest } from "../types/request/RedirectUrlRequest"
import { urlsService } from "../services/urlsService"
import { ErrorCodeMap } from "../utils/ErrorCodeMap"

const baseUrl = "http://localhost:5000/"

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
    console.info("=====redirectUrl======", shorten_url)
    try {
      const existedUrl = await urlsService.findExistedOriginUrl(
        baseUrl + shorten_url
      )
      if (existedUrl) res.status(301).redirect(existedUrl)
      else res.status(417).send(ErrorCodeMap.URL_NOT_EXISTED)
    } catch (err) {
      res.status(417).send("redirectUrl errors")
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
          shorten_url: baseUrl + urlsService.generatedShortenUrl(),
        }).then(response => {
          res.status(200).send({
            shorten_url: response.get({ plain: true }).shorten_url,
          })
        })
      }
    } catch (err) {
      res.status(417).send(JSON.stringify(err))
    }
  },
}
