import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { expressTracker } from "./tracking/snowplow";
import {
  buildAdConversion,
  buildEcommerceTransaction,
  buildPageView,
} from "@snowplow/node-tracker";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  expressTracker.track(
    buildPageView({
      pageUrl: "http://www.example.com",
    })
  );
  res.send("Home");
});

app.get("/order/complete/:transactionId", (req: Request, res: Response) => {
  const { transactionId } = req.params;

  const adConversionPayload = expressTracker.track(
    buildAdConversion({
      campaignId: "Transactional",
      conversionId: transactionId,
    })
  );

  const adConversionEid = adConversionPayload ? adConversionPayload.eid : "undefined";

  const ecomTransactionPayload = expressTracker.track(
    buildEcommerceTransaction({
      orderId: transactionId,
      total: 10,
      affiliation: "test store",
    })
  );

  const ecomTransactionEid = ecomTransactionPayload ? ecomTransactionPayload.eid : "undefined";

  res.send(
    `Transaction ${transactionId} successful! Conversion Event Id: ${adConversionEid}. Transaction Event Id: ${ecomTransactionEid}`
  );
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
