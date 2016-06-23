var redux = require('redux');


var stateDefault = {
	name: '',
	searchText: '',
	showCompleted: false,
	todos: []
}

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

