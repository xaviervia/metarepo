import path from 'path'
import { readdir } from 'pifs'

export const listDirRecursively = (dir: string) => ({
  async *[Symbol.asyncIterator](): AsyncGenerator<string> {
    const list = await readdir(dir, { withFileTypes: true })

    for (const dirent of list) {
      const direntPath = path.join(dir, dirent.name)

      yield direntPath

      if (dirent.isDirectory()) {
        for await (const subDirentPath of listDirRecursively(direntPath)) {
          yield subDirentPath
        }
      }
    }
  },
})

const DIR = './packages/dleet'

export const main = async () => {
  for await (const item of listDirRecursively(DIR)) {
    console.log(item)
  }
}
