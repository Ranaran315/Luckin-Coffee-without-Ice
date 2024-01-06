class Bus {
	constructor() {
		// 订阅消息队列
		this.queue = {},
			// 缓存队列
			this.cache = {}
	}

	// 订阅者
	$on(fnName, callback) {
		let queue = this.queue[fnName]
		if (!queue) {
			queue = []
		}
		// 订阅需要把回调添加到队列里
		queue.push(callback)

		// 检查缓存队列时是否有订阅者的消息
		let cache = this.cache[fnName]
		if (cache) {
			// 处理每一个数据
			cache.forEach(data => {
				queue[0](data)
			})
			// 置空表示此时的订阅者处理完了缓存事件
			queue = []
		}
	}

	// 发布者
	$emit(fnName, data = null) {
		let queue = this.queue[fnName]
		// 如果订阅消息队列还没有订阅者
		if (!queue || !queue.length) {
			// 放入缓存队列
			if (!this.cache[fnName]) {
				this.cache[fnName] = []
			}
			// 存入数据
			this.cache[fnName].push(data)
			return false
		}
		// 遍历发布消息
		queue.forEach(fn => fn(data))
	}
}

export default new Bus();