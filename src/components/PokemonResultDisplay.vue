<template>
	<div class="pokemon-result-display">
		<div class="type-section">
			<span class="type-display" :style="{ 'background-color': type.color }">{{ type.display }}</span>
		</div>
		<div class="image-section">
			<img
				:src="require(`@/assets/images/artworks/${pokemon.id}.png`)"
				:alt="pokemon.name"
				class="artwork"
				v-if="pokemon.id > 0"
			/>
			<img
				:src="require(`@/assets/images/artworks/placeholder.png`)"
				alt="No pokemon selected"
				class="artwork"
				v-else
			/>
		</div>
		<div class="name-section">
			<span class="name">{{ pokemon.name }}</span>
		</div>
	</div>
</template>

<script>
export default {
	props: ['pokemon', 'type']
}
</script>

<style lang="scss" scoped>
.pokemon-result-display {
	width: 210px;
	height: 250px;
	// border: 2px solid #000;
	// margin: 2px 4px;
	border-radius: 2px;
	background-color: #fff;
	padding: 4px 0;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.type-section {
	height: 30px;
	border-bottom: 1px solid #000;
}

.type-display {
	color: #fff;
	padding: 4px 8px;
	border-radius: 4px;
	text-shadow: 1px 1px 2px #000;
	// box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
	font-size: 0.9rem;
	margin: auto;
	display: block;
	width: fit-content;
}

.artwork {
	max-width: 190px;
	max-height: 170px;
}

.name-section {
	height: 30px;
	border-top: 1px solid #000;
	display: flex;
	justify-content: center;
	align-items: center;
}

.name {
	display: block;
	font-size: 1.05rem;
	font-weight: 700;
}
</style>
