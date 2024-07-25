<script setup lang="ts">
	const count = ref(0)

	setInterval(function () {
		count.value++
	}, 1000)

	// NOTE - Detect if current router is HomePage router then print Welcome to HomePage
</script>

<template>
	<div class="app">
		<img src="/images/logo.svg" alt="Vue Logo" width="256" height="256" />
		<div class="text-primary greeting-label">
			{{ ROUTER_NAME_HOME_PAGE }}
		</div>
		<p className="text-blue counter-label">
			Page has been open for <code>{{ count }}</code> seconds.
		</p>
	</div>
	<!-- .app -->
</template>

<style lang="scss">
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	.app {
		display: flex;
		flex-direction: column;
		height: 100vh;
		width: 100vw;
		align-items: center;
		justify-content: center;
		background-color: $main-color;

		.greeting-label {
			font-size: 32px;
			font-weight: bold;
		}

		.counter-label {
			font-size: 24px;
			margin-top: 24px;
		}
	}
</style>
