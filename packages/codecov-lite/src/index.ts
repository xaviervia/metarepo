import querystring from 'querystring'
import got from 'got'
import getConfig from './getConfig'
import { TConfig } from './types'

const ENDPOINT = 'https://codecov.io/upload/v2'
const TIMEOUT = 10000
const RETRIES = 3

export type TResult = {
  reportURL: string,
  config: TConfig,
}

export default async (data: string): Promise<TResult> => {
  const config = getConfig()
  const queryString = querystring.stringify(config)
  const postURL = `${ENDPOINT}?${queryString}`
  const { body } = await got.post(postURL, {
    headers: {
      'Content-Type': 'text/plain',
      Accept: 'text/plain',
    },
    timeout: TIMEOUT,
    retry: {
      limit: RETRIES,
      calculateDelay: ({ attemptCount }) => attemptCount * 3000,
    },
    body: data,
  })

  return {
    reportURL: body.split('\n')[1],
    config,
  }
}
