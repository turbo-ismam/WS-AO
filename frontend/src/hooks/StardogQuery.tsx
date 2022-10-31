import { Connection, query } from "stardog"
import { defaultOptions, StardogQueryOptions, StardogQueryResult } from "../models/Stardog"

export const conn = new Connection({
  username: "batikus@gmail.com",
  password: "****",
  endpoint: "https://sd-9bccc1ca.stardog.cloud:5820"
})

export const database = "ao"
export const mimeType = "application/sparql-results+json"

const createStardogQuery = (queryCode: string, options: Partial<StardogQueryOptions> = {}) => {
  const allOptions = { ...defaultOptions, ...options }
  const execute = async () => {
    const { body } = await query.execute(conn, database, queryCode, mimeType, allOptions)
    console.log(body)
    return body as StardogQueryResult
  }
  return { execute }
}


export default createStardogQuery 