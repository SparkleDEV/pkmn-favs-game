<template>
	<div class="share-view">
		<router-link class="home-btn" :to="{ name: 'home' }">Create my own!</router-link>
		<h2 class="title">{{ generateTitleMessage() }}</h2>
		<div class="results-table-wrapper">
			<ResultsTable :results="results" />
		</div>
	</div>
</template>

<script>
import ResultsTable from '@/components/ResultsTable.vue'
import pokemon from '@/assets/data/pokemon.json'
import types from '@/assets/data/types.json'

export default {
	components: { ResultsTable },
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
		this.getPokemonList()
		this.setPageTitle()
	},
	methods: {
		setPageTitle() {
			if (!this.$route.query.name) {
				document.title = 'Share | Pokémon Favs Game'
				return
			}
			document.title = `${this.$route.query.name}'s favourite Pokémon | Pokémon Favs Game`
		},
		generateTitleMessage() {
			if (!this.$route.query.name) {
				return 'Those are my favorite Pokémon of each type'
			}
			return `Those are ${this.$route.query.name}'s favorite Pokémon of each type`
		},
		getPokemonFromId(pkmnid) {
			return pokemon.data.filter((p) => p.id == pkmnid)[0]
		},
		getPokemonList() {
			types.forEach((type) => {
				if (!Object.keys(this.$route.query).includes(type.id)) {
					this.results[type.id] = this.placeholder
					return
				}
				this.results[type.id] = this.getPokemonFromId(this.$route.query[type.id])
			})
		}
	}
}
</script>

<style lang="scss" scoped>
@use '@/assets/sass/util' as util;

.results-table-wrapper {
	width: fit-content;
	margin: 0 auto;
}

.home-btn {
	@include util.button(#0055ff);
}
</style>
