<template>
	<div class="home-view">
		<div class="description">
			Create an image of all your favourite Pokémon from each type by just selecting which one you like most from two
			Pokémon at a time. This might take a while, but don't worry, the website saves your progress automatically and
			restores it when you come back.
		</div>
		<h2>Select generations to be included</h2>
		<form class="gen-chooser">
			<div class="gen-entry" v-for="gen in gen_select" :key="gen.id">
				<input type="checkbox" v-model="gen.check" />
				<span>{{ gen.name }} (Gen {{ gen.id }})</span>
			</div>
		</form>
		<div class="start-buttons">
			<button class="start-button new" @click="startGame">Start game</button>
		</div>
	</div>
</template>

<script>
import generations from '@/assets/data/generations.json'

export default {
	data() {
		return {
			gen_select: []
		}
	},
	mounted() {
		if (this.$store.state.game_ended) {
			this.$router.push({ name: 'results' })
			return
		}
		if (this.$store.state.game_running) {
			this.$router.push({ name: 'game' })
			return
		}
		document.title = 'Home | Pokémon Favs Game'
		generations.forEach((g) => {
			var x = {
				name: g.name,
				id: g.id,
				check: true
			}
			this.gen_select.push(x)
		})
	},
	methods: {
		startGame() {
			this.$store.commit('setSelectedGenerations', this.gen_select)
			this.$store.commit('setGameRunning', true)
			this.$router.push({ name: 'game' })
		}
	}
}
</script>

<style lang="scss" scoped>
@use '@/assets/sass/util' as util;

.description {
	max-width: 100%;
	width: 80ch;
	margin: 0 auto;
}

.start-button {
	@include util.button(#0055ff);
	margin-top: 8px;
}
</style>
