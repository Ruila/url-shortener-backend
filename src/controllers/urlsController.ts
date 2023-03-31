import express from "express"
import { Urls } from "../entity/Urls"
import { CreateShortenUrlRequest } from "../types/request/CreateShortenUrlRequest"
import { RedirectUrlRequest } from "../types/request/RedirectUrlRequest"
import { urlsService } from "../services/urlsService"
import { ErrorCodeMap } from "../utils/ErrorCodeMap"
import { GetUrlsRequest } from "../types/request/GetUrlsRequest"
import { DeleteShortenUrlRequest } from "../types/request/DeleteShortenUrlRequest"
import { verifyUrl } from "../utils/verifyUrl"

const baseUrl = "http://localhost:5000/"

export const urlsController = {
  getUrls: async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const { userId } = req.body as GetUrlsRequest
    try {
      const getUrls = await Urls.findAll({
        where: { created_by: userId },
        raw: true,
      })
      if (getUrls) {
        res.status(200).send(getUrls)
      } else {
        res.status(200).send([])
      }
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
      if (existedUrl) {
        await Urls.update(
          {
            viewed: existedUrl.viewed + 1,
          },
          {
            where: { origin_url: existedUrl.origin_url },
          }
        )
        res.status(301).redirect(existedUrl.origin_url)
      } else res.status(417).send(ErrorCodeMap.URL_NOT_EXISTED)
    } catch (err) {
      res.status(417).send("redirectUrl errors")
    }
  },
  createUrl: async (
    req: express.Request,
    res: express.Response
  ): Promise<void | express.Response> => {
    try {
      const { originUrl, createdBy } = req.body as CreateShortenUrlRequest
      if (!verifyUrl(originUrl)) {
        return res.status(417).send(ErrorCodeMap.INVALID_URL)
      }
      const existedUrl = await urlsService.findExistedShortenUrl(originUrl)
      if (existedUrl) {
        res.status(200).send({
          shortenUrl: existedUrl,
        })
      } else {
        await Urls.create({
          origin_url: originUrl,
          created_by: createdBy,
          shorten_url: baseUrl + urlsService.generatedShortenUrl(),
        }).then(response => {
          res.status(200).send({
            shortenUrl: response.get({ plain: true }).shorten_url,
          })
        })
      }
    } catch (err) {
      res.status(417).send(JSON.stringify(err))
    }
  },
  deleteUrl: async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    try {
      const { urlId } = req.params as DeleteShortenUrlRequest
      await Urls.destroy({
        where: { id: urlId },
      }).then(response => {
        console.info("delete", response)
        res.status(200).send({
          msg: "delete successfully",
        })
      })
    } catch (err) {
      res.status(417).send(JSON.stringify(err))
    }
  },
}
