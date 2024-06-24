<script lang="ts">
	export let size: 'small' | 'medium' | 'large' = 'medium';

	const sizeMap = {
		small: '2rem',
		medium: '5rem',
		large: '8rem'
	};
</script>

<div class="loading-spinner" style="width: {sizeMap[size]}; height: {sizeMap[size]};">
	<div></div>
	<div></div>
	<div></div>
	<div></div>
</div>

<style lang="scss">
	.loading-spinner,
	.loading-spinner div {
		box-sizing: border-box;
	}
	.loading-spinner {
		display: inline-block;
		position: relative;
	}

	.loading-spinner div {
		box-sizing: border-box;
		display: block;
		position: absolute;
		width: 80%;
		height: 80%;
		margin: 10%;
		border: 0.4rem solid $light-purple;
		border-radius: 50%;
		animation: loading-spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
		border-color: $light-purple transparent transparent transparent;
	}
	.loading-spinner div:nth-child(1) {
		animation-delay: -0.45s;
	}
	.loading-spinner div:nth-child(2) {
		animation-delay: -0.3s;
	}
	.loading-spinner div:nth-child(3) {
		animation-delay: -0.15s;
	}
	@keyframes loading-spinner {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
