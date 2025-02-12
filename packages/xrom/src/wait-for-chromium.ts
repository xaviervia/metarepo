import fetch from 'node-fetch'

const TIMEOUT = 200

const wait = async (): Promise<boolean> => {
  try {
    await fetch(
      'http://localhost:9222/json',
      { timeout: TIMEOUT }
    )

    return true
  } catch (e) {
    return false
  }
}

const sleep = (timeout: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, timeout))

export const waitForChromium = async (): Promise<void> => {
  while (!(await wait())) {
    await sleep(TIMEOUT)
  }
}
