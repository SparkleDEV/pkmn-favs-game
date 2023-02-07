<template>
	<div class="pokemon-choice-display">
		<img :src="require(`@/assets/images/artworks/${pokemon.id}.png`)" :alt="pokemon.name" class="artwork" />
		<span class="name">#{{ pokemon.id }}: {{ pokemon.name }}</span>
		<div class="type-displays">
			<span
				class="type-display"
				v-for="type in pokemon.types"
				:key="type"
				:style="{ 'background-color': getTypeObject(type).color }"
			>
				{{ getTypeObject(type).display }}
			</span>
		</div>
	</div>
</template>

<script>
import types from '@/assets/data/types.json'

export default {
	props: ['pokemon'],
	methods: {
		getTypeObject(typeid) {
			return types.filter((t) => t.id == typeid)[0]
		}
	}
}
</script>

<style lang="scss" scoped>
.pokemon-choice-display {
	display: flex;
	flex-direction: column;
	width: fit-content;
	cursor: pointer;
	transition: transform 0.3s;
	border: 1px solid #000;
	padding: 16px 8px;
	border-radius: 16px;
	background-color: #fff;

	&:hover {
		transform: scale(1.2);
	}
}

.artwork {
	max-width: 200px;
	max-height: 300px;
}

.name {
	font-weight: 700;
	font-size: 1.5rem;
}

.type-displays {
	padding: 4px 0;
}

.type-display {
	color: #fff;
	padding: 4px 8px;
	border-radius: 4px;
	text-shadow: 1px 1px 2px #000;
	box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
	font-size: 0.9rem;
	margin: 0 2px;
}
</style>
