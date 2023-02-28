import parseHTML from '../../../utils/parse-html.js'

export default (template, item) => {
  let plate = template
  const target = plate.match(/<.+v-for.+?>/gm)
  while (target?.length) {
    const resolved = parseHTML(plate, target[0])
    const directive = resolved.targetInner[0].match(/v-for=".+?"/)[0]
    if (resolved.targetInner[0].match(/v-if/)) {
      console.log(resolved.targetInner)
      resolved.targetInner[0] = resolved.targetInner[0].replace(directive, '')
      resolved.targetInner.unshift(`<template ${directive}>\n`)
      resolved.targetInner.push('</template>\n')
      const result = resolved.beforeInner.join('') + resolved.targetInner.join('') + resolved.lastsInner.join('')
      item.value = result.replace(plate, result)
      plate = item.value
    }
    target.pop()
  }
}