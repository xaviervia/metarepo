import { promisify } from 'util'
import test from 'tape'
import { mock, deleteFromCache } from 'mocku'
import { createFsFromVolume, Volume } from 'memfs'

const rootDir = process.cwd()
const vol = Volume.fromJSON({
  [`${rootDir}/package.json`]: JSON.stringify({
    name: '@ns/a',
    version: '1.0.0',
  }),
})
const fs = createFsFromVolume(vol)

test('fs:readPackage', async (t) => {
  const unmock = mock('../../src/fs/read-package', {
    pifs: {
      readFile: promisify(fs.readFile),
    },
  })

  deleteFromCache('pifs')

  const { readPackage } = await import('../../src/fs/read-package')

  t.deepEquals(
    await readPackage(rootDir),
    {
      name: '@ns/a',
      version: '1.0.0',
    },
    'should get package content'
  )

  unmock()
})
