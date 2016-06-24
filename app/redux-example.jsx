var redux = require('redux');


var actions = require('./actions/index');
var store = require('./store/configureStore').configure();

var unsubscribe = store.subscribe( () => {
	var state = store.getState();

	if (state.map.isFetching){
		document.getElementById('app').innerHTML = 'Loading...';
	}else if(state.map.url){
		document.getElementById('app').innerHTML = '<a href="' + state.map.url + '" target="_blank">View Your Location</a>';
	}
});
// unsubscribe();


store.dispatch(actions.changeName('Meo'));
store.dispatch(actions.changeName('Sedh'));
store.dispatch(actions.changeSearchText('Orange'));
store.dispatch(actions.addHobby('basketball'));
store.dispatch(actions.addHobby('chess'));
store.dispatch(actions.addMovie('X-Men 1', 'Sci-fi'));
store.dispatch(actions.addMovie('Finding Dory', 'Fiction'));
store.dispatch(actions.removeHobby(1));
store.dispatch(actions.removeMovie(1));

store.dispatch(actions.fetchLocation());

