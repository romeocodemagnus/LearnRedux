var redux = require('redux');


var stateDefault = {
	name: 'Anonymous',
	searchText: '',
	hobbies: [],
	movies:[]
}
var nextHobbyId = 1;
var nextMovieId = 1;
var oldReducer = (state = stateDefault, action) => {
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


var nameReducer = (state = 'Anonymous', action) => {
	switch (action.type){
		case 'CHANGE_NAME':
			return action.name;
		default: 
			return state;
	}
};

var hobbiesReducer = (state = [], action) => {
	switch (action.type){
		case 'ADD_HOBBY':
			return [...state, {
				id: nextHobbyId++,
				hobby: action.hobby
			}]
		case 'REMOVE_HOBBY':
			return state.filter( (hobby) => hobby.id !== action.id);
		default: 
			return state;
	}
};

var moviesReducer = (state = [], action) => {
	switch (action.type){
		case 'ADD_MOVIE':
			return [...state, {
				id: nextMovieId++,
				hobby: action.movie
			}]
		case 'REMOVE_MOVIE':
			return state.filter( (movie) => movie.id !== action.id);
		default: 
			return state;
	}
};

var searchReducer = (state = '', action) => {
	switch (action.type){
		case 'CHANGE_SEARCH_TEXT':
			return action.searchText
		default: 
			return state;
	}
};


var reducer = redux.combineReducers({
	name: nameReducer,
	searchText: searchReducer,
	hobbies: hobbiesReducer,
	movies: moviesReducer
});

var store = redux.createStore(reducer, redux.compose(
	window.devToolsExtension ? window.devToolsExtension() : f => f
));

var unsubscribe = store.subscribe( () => {
	var state = store.getState();
	console.log('current state: ', state);

	document.getElementById('app').innerHTML = state.name;
});



var action = {
	type: 'CHANGE_SEARCH_TEXT',
	searchText: 'Apple'
}

store.dispatch(action);


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