var redux = require('redux');
var axios = require('axios');

// Name reducer and action generators
// ----------------------------------
var nameReducer = (state = 'Anonymous', action) => {

	switch (action.type){
		case 'CHANGE_NAME':
			return action.name;
		default: 
			return state;
	}
};
var changeName = (name) => {
	return {
		type: 'CHANGE_NAME',
		name
	}
};

// Map reducer and action generators
// ----------------------------------
var mapReducer = (state = {isFetching: false, url: undefined}, action) => {

	switch (action.type){
		case 'START_LOCATION_FETCH':
			return {
				isFetching: true, 
				url: undefined
			};
		case 'COMPLETE_LOCATION_FETCH':
			return {
				isFetching: false, 
				url: action.url
			};
		default: 
			return state;
	}
};
var startLocationFetch = () => {
	return {
		type: 'START_LOCATION_FETCH',
	};
};

var completeLocationFetch = (url) => {
	return {
		type: 'COMPLETE_LOCATION_FETCH',
		url
	};
};

var fetchLocation = () => {
	store.dispatch(startLocationFetch());

	axios.get('http://ipinfo.io').then(function(res){
		var loc = res.data.loc;
		var baseUrl = 'http://maps.google.com?q='

		store.dispatch(completeLocationFetch(baseUrl + loc));
	});
}

// Hobbies reducer and action generators
// ----------------------------------
var nextHobbyId = 1;
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

var addHobby = (hobby) => {
	return {
		type: 'ADD_HOBBY',
		hobby
	}
};

var removeHobby = (id) => {
	return {
		type: 'REMOVE_HOBBY',
		id
	}
};


// Movies reducer and action generators
// ----------------------------------
var nextMovieId = 1;
var moviesReducer = (state = [], action) => {
	switch (action.type){
		case 'ADD_MOVIE':
			return [...state, {
				id: nextMovieId++,
				title: action.title,
				genre: action.genre
			}]
		case 'REMOVE_MOVIE':
			return state.filter( (movie) => movie.id !== action.id);
		default: 
			return state;
	}
};

var addMovie = (title, genre) => {
	return {
		type: 'ADD_MOVIE',
		title, 
		genre
	}
};

var removeMovie = (id) => {
	return {
		type: 'REMOVE_MOVIE',
		id
	}
};

// Search reducer and action generators
// ----------------------------------
var searchReducer = (state = '', action) => {
	switch (action.type){
		case 'CHANGE_SEARCH_TEXT':
			return action.searchText
		default: 
			return state;
	}
};
var changeSearchText = (searchText) => {
	return {
		type: 'CHANGE_SEARCH_TEXT',
		searchText
	}
};

var reducer = redux.combineReducers({
	name: nameReducer,
	searchText: searchReducer,
	hobbies: hobbiesReducer,
	movies: moviesReducer,
	map: mapReducer
});

var store = redux.createStore(reducer, redux.compose(
	window.devToolsExtension ? window.devToolsExtension() : f => f
));

var unsubscribe = store.subscribe( () => {
	var state = store.getState();

	if (state.map.isFetching){
		document.getElementById('app').innerHTML = 'Loading...';
	}else if(state.map.url){
		document.getElementById('app').innerHTML = '<a href="' + state.map.url + '" target="_blank">View Your Location</a>';
	}
});
// unsubscribe();
/*

var action = {
	type: 'CHANGE_SEARCH_TEXT',
	searchText: 'Apple'
}

store.dispatch(action);
*/

store.dispatch(changeName('Meo'));
store.dispatch(changeName('Sedh'));
store.dispatch(changeSearchText('Orange'));
store.dispatch(addHobby('basketball'));
store.dispatch(addHobby('chess'));
store.dispatch(addMovie('X-Men 1', 'Sci-fi'));
store.dispatch(addMovie('Finding Dory', 'Fiction'));
store.dispatch(removeHobby(1));
store.dispatch(removeMovie(1));

fetchLocation();

