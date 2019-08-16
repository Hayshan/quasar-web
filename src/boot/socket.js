import VueSocket from '@/plugins/vuesocket'

// "async" is optional
export default async ({ Vue }) => {
  // websocket的连接地址，可以通过接口获取，也可以设成固定值
  let wsurl = ''
  Vue.use(new VueSocket({ url: wsurl }))
}
