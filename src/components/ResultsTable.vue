<template>
	<div class="results-table">
		<PkmnResultDisplay
			v-for="typeid in Object.keys(results)"
			:key="typeid"
			:pokemon="results[typeid]"
			:type="getTypeObject(typeid)"
			@click="onCardClick(typeid)"
		/>
	</div>
</template>

<script>
import PkmnResultDisplay from '@/components/PokemonResultDisplay.vue'
import types from '@/assets/data/types.json'

export default {
	components: { PkmnResultDisplay },
	props: ['results'],
	emits: ['cardClickEvent'],
	methods: {
		getTypeObject(typeid) {
			return types.filter((t) => t.id == typeid)[0]
		},
		onCardClick(typeid) {
			this.$emit('cardClickEvent', typeid)
		}
	}
}
</script>

<style lang="scss" scoped>
.results-table {
	display: grid;
	grid-template-columns: min-content min-content min-content min-content min-content min-content;
	gap: 3px;
	background-color: #000;
	border: 3px solid #000;
	border-radius: 4px;
}
</style>
