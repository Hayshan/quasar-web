/**
 * Vue 全局混入
 */
const SocketMixin = {
  beforeCreate () {
    if (!this.sockets) this.sockets = {}

    this.sockets.subscribe = (event, callback) => {
      this.$socket.events.addListener(event, callback, this)
    }
    this.sockets.unsubscribe = (event) => {
      this.$socket.events.removeListener(event, this)
    }
  },
  mounted () {
    if (this.$options.sockets) {
      Object.keys(this.$options.sockets).forEach(event => {
        if (event !== 'subscribe' && event !== 'unsubscribe') {
          this.$socket.events.addListener(event, this.$options.sockets[event], this)
        }
      })
    }
  },
  beforeDestroy () {
    if (this.$options.sockets) {
      Object.keys(this.$options.sockets).forEach(event => {
        this.$socket.events.removeListener(event, this)
      })
    }
  }
}

/**
 * 事件处理与消息分发
 */
class SocketEvent {
  constructor () {
    this.listeners = new Map()
  }
  addListener (event, callback, component) {
    if (typeof callback === 'function') {
      if (!this.listeners.has(event)) this.listeners.set(event, [])
      this.listeners.get(event).push({ callback, component })
    } else {
      throw new Error('事件回调必须是 function 类型')
    }
  }
  removeListener (event, component) {
    if (this.listeners.has(event)) {
      const listeners = this.listeners.get(event).filter(listener => (
        listener.component !== component
      ))

      if (listeners.length > 0) {
        this.listeners.set(event, listeners)
      } else {
        this.listeners.delete(event)
      }
    }
  }
  deliver (event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach((listener) => {
        listener.callback.call(listener.component, data)
      })
    }
  }
}

/**
 * Webscoekt 连接
 */
class SocketIO {
  constructor (url) {
    if (!url) {
      throw new Error('请设置 websocket 的连接地址！')
    }

    this.url = url
    this.timer = null
    this.isconnect = false
  }
  init () {
    this.socket = new WebSocket(this.url)
    this.handler()
  }
  handler () {
    this.socket.onopen = () => {
      console.log('websocket 连接成功！')
      this.isconnect = true
      this.clean()
    }
    this.socket.onclose = (e) => {
      console.log('断开连接！')
      this.isconnect = false
      this.clean()
    }
    this.socket.onerror = () => {
      this.isconnect = false
      this.clean()
      this.reconnect()
    }
  }
  close () {
    if (this.socket) {
      this.socket.close()
      this.socket = null
    }
  }
  clean () {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }
  reconnect () {
    if (!this.timer) {
      this.timer = setTimeout(() => {
        this.init()
      }, 1000)
    }
  }
  emit (data) {
    if (this.isconnect) {
      this.socket.send(JSON.stringify(data))
    } else {
      console.error('websocket 尚未连接成功，请稍后再试！')
    }
  }
  onmessage (events) {
    this.socket.onmessage = (e) => {
      let json = JSON.parse(e.data)
      let event = json.event
      let data = json.data
      events.deliver(event, data)
    }
  }
}

class VueSocket {
  constructor ({ url }) {
    this.url = url
    this.io = new SocketIO(url)
    this.events = new SocketEvent()
  }
  connect () {
    if (this.io) {
      this.io.close()
    }

    this.io.init()
    this.io.onmessage(this.events)
  }
  close () {
    if (this.io) {
      this.io.close()
    }
  }
  emit (data) {
    if (this.io) {
      this.io.emit(data)
    }
  }
  install (Vue) {
    Vue.prototype.$socket = this
    Vue.mixin(SocketMixin)
  }
}

export default VueSocket
