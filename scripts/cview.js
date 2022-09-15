import path from 'path'
import { fileReader, fileWriter, makeDir } from './utils/fileTools.js'

const componentName = process.argv[2]
const src_vue = path.resolve('./', '.template/views/', 'template.vue')
const src_route = path.resolve('./', '.template/views/', 'route.js')
const dir = path.resolve('./', `src/views/${componentName}`)
const dest_vue = path.resolve('./', `src/views/${componentName}/`, `${componentName}.vue`)
const dest_route = path.resolve('./', `src/views/${componentName}/`, 'route.js')

const generateDir = async (dir) => {
  const flat = await makeDir(dir)
}

const generateFiles = async (src, dest, componentName) => {
  const content = await fileReader(src, componentName)
  const flag = await fileWriter(content, dest)
}

generateDir(dir)

generateFiles(src_vue, dest_vue, componentName)
.catch(err => {
  console.log(err);
})

generateFiles(src_route, dest_route, componentName)
.catch(err => {
  console.log(err);
})


