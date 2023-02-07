<template>
	<div class="results-view">
		<p>Click on any card to replay the game for that specific type</p>
		<div class="buttons-region">
			<button class="save-button" @click="screenshot()">Save image</button>
			<ResetButton prompt_text="Are you sure you wanna delete all your results and start over again?" />
		</div>
		<div class="results-table-wrapper" id="screenshot-region">
			<h2 class="title">Those are my favorite Pokémon of each type</h2>
			<div class="results-table">
				<PkmnResultDisplay
					v-for="typeid in Object.keys(results)"
					:key="typeid"
					:pokemon="results[typeid]"
					:type="getTypeObject(typeid)"
					@click="replayForType(typeid)"
				/>
			</div>
			<span class="subtext">Created with <span class="fakelink">https://pkmngame.sparkle.gay</span></span>
		</div>
	</div>
</template>

<script>
import types from '@/assets/data/types.json'
import pokemon from '@/assets/data/pokemon.json'
import html2canvas from '@/scripts/html2canvas.min.js'
import filesaver from '@/scripts/FileSaver.js' // Wird actually genutzt, auch wenns ausgegraut ist
import PkmnResultDisplay from '@/components/PokemonResultDisplay.vue'
import ResetButton from '@/components/ResetButton.vue'

export default {
	components: { PkmnResultDisplay, ResetButton },
	data() {
		return {
			results: {},
			placeholder: {
				id: 0,
				name: 'No Pokémon was chosen',
				types: []
			}
		}
	},
	mounted() {
		if (!this.$store.state.game_ended) {
			if (this.$store.state.game_running) {
				this.$router.push({ name: 'game' })
				return
			}
			this.$router.push({ name: 'home' })
			return
		}

		this.listToResults()
	},
	methods: {
		listToResults() {
			var lists = this.$store.state.pokemon_lists
			Object.keys(lists).forEach((index) => {
				this.results[index] = lists[index].length >= 1 ? lists[index][0] : this.placeholder
			})
		},
		getTypeObject(typeid) {
			return types.filter((t) => t.id == typeid)[0]
		},
		screenshot() {
			html2canvas(document.getElementById('screenshot-region'), {
				allowTaint: true,
				useCORS: true
			}).then((canvas) => {
				canvas.toBlob((blob) => {
					window.saveAs(blob, 'pkmngame.png')
				})
			})
		},
		replayForType(typeid) {
			if (!confirm(`Do you wanna replay the game for ${this.getTypeObject(typeid).display}-pokémon?`)) {
				return
			}
			var active_gens = []
			this.$store.state.selected_generations.forEach((gen) => {
				if (gen.check) active_gens.push(gen.id)
			})

			var lists = this.$store.state.pokemon_lists
			lists[typeid] = pokemon.data.filter((p) => active_gens.includes(p.gen) && p.types.includes(typeid))

			this.$store.commit('setPokemonLists', lists)
			this.$store.commit('setGameEnded', false)
			this.$router.push({ name: 'game' })
		}
	}
}
</script>

<style lang="scss" scoped>
.title {
	background-color: #fff;
	padding: 16px 0;
	margin-bottom: 0;
}

.results-table-wrapper {
	width: fit-content;
	margin: 0 auto;
}

.results-table {
	display: grid;
	grid-template-columns: min-content min-content min-content min-content min-content min-content;
	gap: 3px;
	background-color: #000;
	border: 3px solid #000;
	border-radius: 4px;
}

.subtext {
	display: block;
	padding: 8px 0;
	font-weight: 700;
	font-size: 1.25rem;

	.fakelink {
		text-decoration: underline;
		color: #2e1a7f;
	}
}

.buttons-region {
	display: flex;
	justify-content: center;
}

.save-button {
	padding: 6px 10px;
	color: #fff;
	background-color: #29bf29;
	border: none;
	border-radius: 4px;
	font-size: 1.05rem;
	transition: background-color 0.3s;
	margin: 0 2px;

	&:hover {
		background-color: mix(#29bf29, #fff, 70);
	}
}
</style>
