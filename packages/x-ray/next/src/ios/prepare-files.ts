import path from 'path'
import { writeFile } from 'pifs'

export const prepareFiles = async (entryPointPath: string, targetFiles: string[]) => {
  let data = targetFiles.map((file, i) => `import { examples as examples${i} } from '${file}'`).join('\n')

  data += '\n'
  data += `export default [${targetFiles.map((file, i) => `{ path: '${file}', content: examples${i} }`)}]`

  const outfilePath = path.join(path.dirname(entryPointPath), 'files.js')

  await writeFile(outfilePath, data)
}
