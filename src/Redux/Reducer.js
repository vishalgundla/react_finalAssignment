// Always initialize state
const initialState = {
    loggedInStatus: localStorage[('isLogged')] === 'true'
};

// then push the state that is initialized int o the reducer for action
// 
const Reducer = (currentState = initialState, action) => {

    switch(action.type) {
        case 'USER_LOGIN':
            localStorage.setItem('isLogged', true);
            return {...currentState, loggedInStatus: true};
        case 'USER_LOGOUT':
                localStorage.setItem('isLogged', false);
                return {...currentState, loggedInStatus: false};
        default:
            return {...currentState};
    }
}

export default Reducer;