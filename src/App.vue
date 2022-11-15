<script setup lang="ts">
	let greetingContent = ''

	// NOTE - Detect if current router is HomePage router then print Welcome to HomePage
	greetingContent = `Welcome to ${import.meta.env.ROUTER_NAME_HOME_PAGE}`
</script>

<template>
	<div class="app text-primary">{{ greetingContent }}</div>
</template>

<style lang="scss">
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	.app {
		display: flex;
		height: 100vh;
		width: 100vw;
		align-items: center;
		justify-content: center;
		background: $main-color;
		font-size: 32px;
		font-weight: bold;
	}
</style>
