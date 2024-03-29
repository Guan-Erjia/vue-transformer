export default {
  base: 'D:/workplace1/ssr/mobile',
  exclude: ['node_modules'],
  alias: {
    '@assets': './assets',
    '@scss': './assets/scss',
    '@pages': './pages',
    '@img': './assets/img',
    '@commonImg': './assets/img/common',
    '@js': './assets/js',
    '@commonJs': './assets/js/common',
    '@comp': './components',
    '@commonComp': './components/common',
  },
}

const dynamicImport = (url) => {     //请在app内全局注入改方法
  new URL(url, import.meta.url).href
}