import 'assets/styles/tailwind.css'

const App = (() => {
	const initVueApp = () => {
		import('@/src/App.vue').then(function (data) {
			if (!data || !data.default) return
			createApp(data.default).mount('#root')
		})
	} // initVueApp()

	return {
		init() {
			initVueApp()
		},
	}
})()
App.init()
