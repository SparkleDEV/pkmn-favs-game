<template>
	<div class="modal">
		<div class="modal-content">
			<div class="slot-content">
				<slot />
			</div>
			<button class="close-button" @click="closeModal()">Close</button>
		</div>
	</div>
</template>

<script>
export default {
	props: ['default_close_button'],
	methods: {
		closeModal() {
			this.$emit('close')
		}
	}
}
</script>

<style lang="scss" scoped>
@use '@/assets/sass/util' as util;

.modal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(#000, 0.5);

	.modal-content {
		background-color: #fff;
		width: fit-content;
		padding: 2rem;
		border-radius: 10px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
	}

	.close-button {
		@include util.button(#f00);
		margin-left: auto;
		display: block;
	}
}
</style>
