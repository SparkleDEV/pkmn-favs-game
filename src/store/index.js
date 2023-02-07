import { createStore } from 'vuex'

export default createStore({
	state: {
		selected_generations: JSON.parse(localStorage.getItem('selected_generations')) || [],
		game_running: JSON.parse(localStorage.getItem('game_running')) || false,
		pokemon_lists: JSON.parse(localStorage.getItem('pokemon_lists')) || {},
		game_ended: JSON.parse(localStorage.getItem('game_ended')) || false
	},
	getters: {},
	mutations: {
		setSelectedGenerations(state, gens) {
			state.selected_generations = gens
			localStorage.setItem('selected_generations', JSON.stringify(gens))
		},
		clearSelectedGenerations(state) {
			state.selected_generations = []
			localStorage.setItem('selected_generations', JSON.stringify([]))
		},
		setPokemonLists(state, list) {
			state.pokemon_lists = list
			localStorage.setItem('pokemon_lists', JSON.stringify(list))
		},
		clearPokemonLists(state) {
			state.pokemon_lists = {}
			localStorage.setItem('pokemon_lists', JSON.stringify({}))
		},
		setGameRunning(state, value) {
			state.game_running = value
			localStorage.setItem('game_running', value)
		},
		setGameEnded(state, value) {
			state.game_ended = value
			localStorage.setItem('game_ended', value)
		}
	},
	actions: {},
	modules: {}
})
