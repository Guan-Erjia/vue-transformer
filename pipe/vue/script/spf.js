import fs from 'fs'
import { outPut } from '../../../utils/index.js'
export default (script, item) => {
  const multiFile = script.match(/export\s+{ default }\s+from\s+['|"].+['|"]/)
  if (multiFile) {
    let prePath = item.path.split('/')
    let path = multiFile[0].split('from ').pop()
    path = path.slice(1, path.length - 1).split('/')
    path.forEach(each => {
      if (each === '..') {
        prePath.pop()
      } else if (each === '.') {
        prePath.pop()
      } else {
        prePath.push(each.endsWith('.js') ? each : each + '.js')
      }
    })
    const result = fs.readFileSync(prePath.join('/'), { encoding: 'utf-8' })
    item.value =
      `${item.value}
<script>
${result}
<script>
`
    console.log(outPut(`SPF已应用-`, item))
  }
}