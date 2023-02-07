<template>
	<div class="reset-button">
		<button class="reset" @click="resetGame()">Reset game</button>
	</div>
</template>

<script>
export default {
	props: ['prompt_text'],
	methods: {
		resetGame() {
			if (!confirm(this.prompt_text)) {
				return
			}
			this.$store.commit('clearSelectedGenerations')
			this.$store.commit('clearPokemonLists')
			this.$store.commit('setGameRunning', false)
			this.$store.commit('setGameEnded', false)
			this.$router.push({ name: 'home' })
		}
	}
}
</script>

<style lang="scss" scoped>
.reset {
	padding: 6px 10px;
	color: #fff;
	background-color: #f00;
	border: none;
	border-radius: 4px;
	font-size: 1.05rem;
	transition: background-color 0.3s;
	margin: 0 2px;

	&:hover {
		background-color: mix(#f00, #fff, 70);
	}
}
</style>
