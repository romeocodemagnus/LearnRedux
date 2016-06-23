var redux = require('redux');


var stateDefault = {
	name: 'Anonymous',
	searchText: '',
	showCompleted: false,
	hobbies: [],
	movies:[],
	todos: []
}
var nextHobbyId = 1;
var nextMovieId = 1;
var reducer = (state = stateDefault, action) => {
	switch (action.type){
		case 'CHANGE_SEARCH_TEXT':
			return {
				...state,
				searchText: action.searchText
			};
		case 'CHANGE_NAME':
			return {
				...state,
				name: action.name
			};
		case 'ADD_HOBBY':
			return {
				...state,
				hobbies: [
				...state.hobbies, 
				{
					id: nextHobbyId++,
					hobby: action.hobby
				}
				]
			};
		case 'ADD_MOVIE':
			return {
				...state,
				movies: [
				...state.movies, 
				{
					id: nextMovieId++,
					title: action.title,
					genre: action.genre
				}
				]
			};
		case 'REMOVE_HOBBY':
			return {
				...state,
				hobbies: state.hobbies.filter( (hobby) => hobby.id !== action.id)
			};
		case 'REMOVE_MOVIE':
			return {
				...state,
				movies: state.movies.filter( (movie) => movie.id !== action.id)
			};
		default: 
			return state;
	}
};

var store = redux.createStore(reducer, redux.compose(
	window.devToolsExtension ? window.devToolsExtension() : f => f
));

var unsubscribe = store.subscribe( () => {
	var state = store.getState();
	console.log('current state: ', state);

	document.getElementById('app').innerHTML = state.name;
});


/*
var action = {
	type: 'CHANGE_SEARCH_TEXT',
	searchText: 'Apple'
}

store.dispatch(action);
*/

var action = {
	type: 'CHANGE_NAME',
	name: 'Meo'
}
store.dispatch(action);

// unsubscribe();

var action = {
	type: 'CHANGE_NAME',
	name: 'Sedh'
}
store.dispatch(action);

var action = {
	type: 'ADD_HOBBY',
	hobby: 'chess'
}
store.dispatch(action);

var action = {
	type: 'ADD_HOBBY',
	hobby: 'basketball'
}
store.dispatch(action);

var action = {
	type: 'ADD_MOVIE',
	title: 'X-Men 1',
	genre: 'Sci-fi'
}
store.dispatch(action);

var action = {
	type: 'ADD_MOVIE',
	title: 'Finding Dory',
	genre: 'Fiction'
}
store.dispatch(action);

var action = {
	type: 'REMOVE_MOVIE',
	id: 1
}
store.dispatch(action);

var action = {
	type: 'REMOVE_HOBBY',
	id: 1
}
store.dispatch(action);