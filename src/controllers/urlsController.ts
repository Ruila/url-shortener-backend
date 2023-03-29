import express from "express"
import { Urls } from "../entity/Urls"
import { CreateShortenUrlRequest } from "../types/request/CreateShortenUrlRequest"

export const urlsController = {
  getUrls: async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    try {
      res.status(200).send("getUrls")
    } catch (err) {
      res.status(400).send("getUrls errors")
    }
  },
  createUrl: async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    try {
      const { origin_url, shorten_url, created_by } =
        req.body as CreateShortenUrlRequest
      await Urls.create({
        origin_url,
        shorten_url,
        created_by,
      }).then(response => {
        res.status(200).send(response.get({ plain: true }))
      })
    } catch (err) {
      res.status(417).send(JSON.stringify(err))
    }
  },
}
