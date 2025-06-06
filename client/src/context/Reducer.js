const Reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: false,
            }
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            }
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: true,
            }
        case "UPDATE_START":
            return {
                ...state,
                isFetching: true, // Cambia isFetching a true para indicar que se está actualizando
            }
        case "UPDATE_SUCCESS":
            return {
                //...state, // Mantiene isFetching y error como estaban
                user: action.payload, // Reemplaza el objeto 'user' con el nuevo
                isFetching: false,
                error: false
            };
        case "UPDATE_FAILURE":
            return {
                user: state.user,
                isFetching: false,
                error: true,
            }
        case "LOGOUT":
            return {
                user: null,
                isFetching: false,
                error: false,
            }

        default:
            return state;

    }
}

export default Reducer;