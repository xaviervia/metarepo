import path from 'path'
import { cpus } from 'os'
import { run } from '@rebox/web'
import { broResolve } from 'bro-resolve'
import { runSnapshots } from './run-snapshots'
import { runServer } from './run-server'

const CONCURRENCY = Math.max(cpus().length - 1, 1)
const childFile = require.resolve('./child')

export const runFiles = async (targetFiles: string[]) => {
  const { result, resultData, hasBeenChanged } = await runSnapshots(childFile, targetFiles, CONCURRENCY)

  if (hasBeenChanged) {
    const entryPointPath = await broResolve('@x-ray/ui')
    const htmlTemplatePath = path.join(path.dirname(entryPointPath), 'index.html')
    const closeReboxServer = await run({
      htmlTemplatePath,
      entryPointPath,
      isQuiet: true,
    })

    console.log('open http://localhost:3000/ to approve or discard changes')

    await runServer({
      result,
      resultData,
    })

    await closeReboxServer()
  }
}
