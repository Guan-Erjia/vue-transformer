import { getOptionString } from "../../../utils/index.js";
export default (script, item) => {
  const props = getOptionString(script, 'props')
  if (props) {
    const valueProp = props.match(/value\s*:\s*.*?,/g)
    if (valueProp) {
      valueProp.forEach(each => {
        const rep = each.replace('value', 'modelValue')
        item.value = item.value.replace(each, rep)
      })
      console.log(item.value)
    }
  }
}