import { outPut } from '../../../utils/index.js'
import { Bundle } from '../../../utils/index.js'

export default (template, item) => {
  const functionalTag = template.match(/<template[\s]*functional?>/g)
  const bundles = []
  let temp = item.value
  if (functionalTag) {
    temp = temp.replace(/<template[\s]*functional?>/, '<template>')
    temp =
      `
<script setup>
  const props = defineProps()
</script>
<script>
  export default {
    name: "${item.name.split('.')[0]}"
  }
</script>
` + temp
    console.log(outPut('已替换为普通组件--  ', temp))
    item.bundle.push(new Bundle(item.value, temp))
  }
}