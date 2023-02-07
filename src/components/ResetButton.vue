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
@use '@/assets/sass/util' as util;

.reset {
	@include util.button(#f00);
}
</style>
