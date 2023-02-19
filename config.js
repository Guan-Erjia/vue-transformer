import path from 'path'
export default {
  exclude: ['node_modules'],
  alias: {
    '@assets': './assets', // scss中需使用@起头的别名以避免webstorm引用地址报错
    '@scss': './assets/scss',
    '@pages': './pages',
    '@img': './assets/img',
    '@commonImg': './assets/img/common',
    '@js': './assets/js',
    '@commonJs': './assets/js/common',
    '@comp': './components',
    '@commonComp': './components/common',
  }
}