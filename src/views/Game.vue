<template>
	<div class="game-view">
		<h2 class="title">Which of those two Pokémon do you prefer?</h2>
		<div class="pokemon-displays">
			<div class="left-display pkmn-display">
				<PkmnChoiceDisplay :pokemon="leftPkmn" v-if="leftPkmn != null" @click="dropPokemon(rightPkmn)" />
			</div>
			<span class="vs-text">vs.</span>
			<div class="right-display pkmn-display">
				<PkmnChoiceDisplay :pokemon="rightPkmn" v-if="rightPkmn != null" @click="dropPokemon(leftPkmn)" />
			</div>
		</div>
		<ResetButton prompt_text="Are you sure you wanna delete everything you've done so far and start over again?" />
		<!-- <button @click="setDebugList">Debug</button> -->
	</div>
</template>

<script>
import types from '@/assets/data/types.json'
import pokemon from '@/assets/data/pokemon.json'

import PkmnChoiceDisplay from '@/components/PokemonChoiceDisplay.vue'
import ResetButton from '@/components/ResetButton.vue'

export default {
	components: { PkmnChoiceDisplay, ResetButton },
	data() {
		return {
			pkmn_list: {},
			currentType: {},
			leftPkmn: null,
			rightPkmn: null
		}
	},
	async mounted() {
		if (this.$store.state.game_ended) {
			this.$router.push({ name: 'results' })
			return
		}
		if (!this.$store.state.game_running) {
			this.$router.push({ name: 'home' })
			return
		}

		await this.createPokemonLists()
		this.selectType()
		this.selectPokemon()
	},
	methods: {
		async createPokemonLists() {
			if (Object.keys(this.$store.state.pokemon_lists).length > 0) {
				this.pkmn_list = this.$store.state.pokemon_lists
				return
			}

			var active_gens = []
			this.$store.state.selected_generations.forEach((gen) => {
				if (gen.check) active_gens.push(gen.id)
			})

			var filteredPokemon = pokemon.data.filter((p) => active_gens.includes(p.gen))

			var lists = {}
			types.forEach((type) => {
				lists[type.id] = filteredPokemon.filter((p) => p.types.includes(type.id))
			})
			this.pkmn_list = lists
			this.$store.commit('setPokemonLists', lists)
		},
		selectType() {
			for (var type of types) {
				if (this.pkmn_list[type.id].length <= 1) continue
				this.currentType = type.id
				return
			}

			this.$store.commit('setGameEnded', true)
			this.$router.push({ name: 'results' })
		},
		selectPokemon() {
			var chosen = this.pkmn_list[this.currentType].sort(() => 0.5 - Math.random()).slice(0, 2)
			this.leftPkmn = chosen[0]
			this.rightPkmn = chosen[1]
		},
		dropPokemon(pkmn) {
			this.pkmn_list[this.currentType] = this.pkmn_list[this.currentType].filter((p) => p != pkmn)
			this.$store.commit('setPokemonLists', this.pkmn_list)
			this.selectType()
			this.selectPokemon()
		},
		setDebugList() {
			types.forEach((type) => {
				this.pkmn_list[type.id] = []
			})
			this.pkmn_list['normal'] = [
				{ id: 133, name: 'Eevee', gen: 1, types: ['normal'] },
				{ id: 133, name: 'Eevee', gen: 1, types: ['normal'] }
			]
			this.$store.commit('setPokemonLists', this.pkmn_list)
			this.selectType()
			this.selectPokemon()
		}
	}
}
</script>

<style lang="scss" scoped>
.pokemon-displays {
	display: flex;
	align-items: center;
	justify-content: center;
}

.vs-text {
	font-size: 5rem;
	font-weight: 700;
	margin: 0 2rem;
}
</style>
