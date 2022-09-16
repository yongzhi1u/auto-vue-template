import path from 'path'
import { fileReader, fileWriter } from './utils/fileTools.js'

const componentName = process.argv[2]
const src = path.resolve('./', '.template/components/', 'template.vue')
const dest = path.resolve('./', 'src/components/', `${componentName}.vue`)

const generateFiles = async (src, dest, componentName) => {
  const content = await fileReader(src, componentName)
  const flag = await fileWriter(content, dest)
}

generateFiles(src, dest, componentName)
.catch(err => {
  console.log(err);
})

