import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Game from '../views/Game.vue'
import Results from '../views/Results.vue'
import Share from '../views/Share.vue'

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/game',
		name: 'game',
		component: Game
	},
	{
		path: '/results',
		name: 'results',
		component: Results
	},
	{
		path: '/share',
		name: 'share',
		component: Share
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
