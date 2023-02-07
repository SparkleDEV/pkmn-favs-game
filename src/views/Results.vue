<template>
	<div class="results-view">
		<p>Click on any card to replay the game for that specific type</p>
		<div class="buttons-region">
			<button class="save-button" @click="screenshot()">Save image</button>
			<button class="share-button" @click="modal_open = true">Share</button>
			<ResetButton prompt_text="Are you sure you wanna delete all your results and start over again?" />
		</div>
		<div class="results-table-wrapper" id="screenshot-region">
			<h2 class="title">Those are my favorite Pokémon of each type</h2>
			<ResultsTable :results="results" @cardClickEvent="replayForType" />
			<span class="subtext">Created with <span class="fakelink">https://pkmngame.sparkle.gay</span></span>
		</div>
	</div>
	<Modal @close="modal_open = false" v-if="modal_open" default_close_button="true">
		<div class="share-link-modal">
			<label class="name-label">Enter your name:</label>
			<input type="text" class="name-input" v-model="name" />
			<div class="share-link">
				<input class="share-link-text" type="text" readonly :value="getShareUrl()" id="share-link" />
				<button class="share-link-copy" @click="copyToClipboard('share-link')">Copy</button>
			</div>
		</div>
	</Modal>
</template>

<script>
import types from '@/assets/data/types.json'
import pokemon from '@/assets/data/pokemon.json'
import html2canvas from '@/scripts/html2canvas.min.js'
import filesaver from '@/scripts/FileSaver.js' // Wird actually genutzt, auch wenns ausgegraut ist
import ResetButton from '@/components/ResetButton.vue'
import ResultsTable from '@/components/ResultsTable.vue'
import Modal from '@/components/Modal.vue'

export default {
	components: { ResetButton, ResultsTable, Modal },
	data() {
		return {
			results: {},
			placeholder: {
				id: 0,
				name: 'No Pokémon was chosen',
				types: []
			},
			modal_open: false,
			name: ''
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
		document.title = 'Results | Pokémon Favs Game'

		this.listToResults()
	},
	methods: {
		listToResults() {
			var lists = this.$store.state.pokemon_lists
			Object.keys(lists).forEach((index) => {
				this.results[index] = lists[index].length >= 1 ? lists[index][0] : this.placeholder
			})
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
		getTypeObject(typeid) {
			return types.filter((t) => t.id == typeid)[0]
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
		},
		getShareUrl() {
			var url = `${window.location.origin}/share`
			var params = ''
			if (this.name != '') {
				params += `?name=${this.name}`
			}
			Object.keys(this.results).forEach((r) => {
				if (this.results[r].id == 0) return
				if (params.length <= 0) {
					params += '?'
				} else {
					params += '&'
				}
				params += `${r}=${this.results[r].id}`
			})
			return url + params
		},
		copyToClipboard: async (id) => {
			var value = document.getElementById(id).value
			await navigator.clipboard.writeText(value)
			alert('Copied!')
		}
	}
}
</script>

<style lang="scss" scoped>
@use '@/assets/sass/util' as util;

.title {
	background-color: #fff;
	padding: 16px 0;
	margin-bottom: 0;
}

.results-table-wrapper {
	width: fit-content;
	margin: 0 auto;
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
	@include util.button(#29bf29);
}

.share-button {
	@include util.button(#0055ff);
}

.share-link-modal {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	font-size: 1.2rem;
}

.name-input,
.share-link-text {
	font-size: 1.2rem;
	border: none;
	border-bottom: 1px solid #000;
	border-radius: 0;
	width: 100%;
}

.share-link {
	margin: 1ch 0;
}

.share-link-text {
	width: auto;
	background-color: #d4d4d4;
	color: #1e1e1e;
	font-style: italic;
}

.share-link-copy {
	@include util.button(#29bf29);
}
</style>
