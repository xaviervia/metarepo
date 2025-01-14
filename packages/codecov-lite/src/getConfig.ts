import services from './services'
import { TConfig } from './types'

export default (): TConfig => {
  let config = null

  for (const service of services) {
    const result = service(process.env)

    if (result !== null) {
      config = result

      break
    }
  }

  if (config === null) {
    throw new Error('No CI service was found')
  }

  return {
    ...config,
    package: 'codecov-node-lite',
    token: process.env.CODECOV_TOKEN,
  }
}
