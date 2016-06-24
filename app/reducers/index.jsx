// Name reducer 
// ----------------------------------
export var nameReducer = (state = 'Anonymous', action) => {

	switch (action.type){
		case 'CHANGE_NAME':
			return action.name;
		default: 
			return state;
	}
};

// Map reducer 
// ----------------------------------
export var mapReducer = (state = {isFetching: false, url: undefined}, action) => {

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

// Hobbies reducer 
// ----------------------------------
var nextHobbyId = 1;
export var hobbiesReducer = (state = [], action) => {
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

// Movies reducer 
// ----------------------------------
var nextMovieId = 1;
export var moviesReducer = (state = [], action) => {
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

// Search reducer 
// ----------------------------------
export var searchReducer = (state = '', action) => {
	switch (action.type){
		case 'CHANGE_SEARCH_TEXT':
			return action.searchText
		default: 
			return state;
	}
};