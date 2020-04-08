import http from 'http'
import { Worker } from 'worker_threads'
import url, { UrlWithParsedQuery } from 'url'
import { runIosApp } from '@rebox/ios'
import { rsolve } from 'rsolve'
import { unchunkBuffer } from 'unchunk'
import { TResults } from '../types'
import { prepareFiles } from './prepare-files'
import { TMessage } from './types'

const SERVER_HOST = 'localhost'
const SERVER_PORT = 3003
const WORKER_PATH = require.resolve('./worker-setup')

export const getResults = async (files: string[], fontsDir?: string) => {
  const entryPointPath = await rsolve('@x-ray/native-screenshots-app', 'react-native')

  await prepareFiles(entryPointPath, files)

  const closeIosApp = await runIosApp({
    appName: 'X-Ray',
    appId: 'org.nextools.x-ray',
    iPhoneVersion: 8,
    iOSVersion: '13.2',
    entryPointPath,
    fontsDir,
    dependencyNames: [
      'react-native-svg',
      'react-native-view-shot',
    ],
    isHeadless: false,
    logMessage: console.log,
  })

  const workers = Array.from({ length: 2 }, () => new Worker(WORKER_PATH))
  const results: TResults = new Map()
  const busyWorkerIds = new Set<number>()
  const pathWorkers = new Map<string, number>()
  const status = {
    ok: 0,
    new: 0,
    diff: 0,
    deleted: 0,
  }

  Buffer.poolSize = 0

  await new Promise<void>((serverResolve, serverReject) => {
    const server = http.createServer(async (req, res) => {
      try {
        const urlData = url.parse(req.url!, true) as UrlWithParsedQuery & {
          query: {
            path: string,
          },
        }

        if (urlData.pathname === '/upload') {
          const path = urlData.query.path as string

          const body = await unchunkBuffer(req)
          let worker: Worker

          // no worker for path, assign new
          if (!pathWorkers.has(path)) {
            worker = workers.find(({ threadId }) => !busyWorkerIds.has(threadId))!

            busyWorkerIds.add(worker.threadId)
            pathWorkers.set(path, worker.threadId)
          // reuse worker
          } else {
            const pathThreadId = pathWorkers.get(path)!

            worker = workers.find(({ threadId }) => threadId === pathThreadId)!

            worker.removeAllListeners('error')
            worker.removeAllListeners('message')
          }

          await new Promise<void>((reqResolve, reqReject) => {
            worker
              .once('error', reqReject)
              .on('message', (message: TMessage) => {
                switch (message.type) {
                  case 'EXAMPLE': {
                    reqResolve()

                    break
                  }
                  case 'DONE': {
                    // release worker
                    busyWorkerIds.delete(pathWorkers.get(path)!)
                    pathWorkers.delete(path)

                    const result = message.value

                    results.set(result.filePath, result.results)

                    status.ok += result.status.ok
                    status.new += result.status.new
                    status.diff += result.status.diff
                    status.deleted += result.status.deleted

                    console.log(path)

                    reqResolve()

                    break
                  }
                  case 'ERROR': {
                    reqReject(message.value)
                  }
                }
              })
              .postMessage(body, [body.buffer])
          })
        } else if (urlData.pathname === '/done') {
          server.close(async () => {
            await Promise.all(
              workers.map((worker) => worker.terminate())
            )

            closeIosApp()
            serverResolve()
          })
        }
      } catch (error) {
        serverReject(error)
      }

      res.end()
    })

    server.once('error', serverReject)
    server.listen(SERVER_PORT, SERVER_HOST)
  })

  return { status, results }
}
