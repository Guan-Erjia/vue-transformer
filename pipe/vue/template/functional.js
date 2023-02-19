import { outPut } from '../../../utils/index.js'

export default (template, item) => {
  const functionalTag = template.match(/<template[\s]*functional?>/g)
  if (functionalTag) {
    item.value = item.value.replace(/<template[\s]*functional?>/, '<template>')
    item.value = item.value.replace('</template>',
      `</template>
<script setup>
  const props = defineProps()
</script>
<script>
  export default {
    name: "${item.name.split('.')[0]}"
  }
</script>`
    )
    console.log(outPut('已替换为普通组件--  ', item))
  }
}