const incrementCountType = 'INCREMENT_COUNT';
const decrementCountType = 'DECREMENT_COUNT';
const initialState = { count: 0 };

const counterReducer = (state, action) => {
    state = state || initialState;

    if (action.type === incrementCountType) {
        return { ...state, count: state.count + 1 };
    }

    if (action.type === decrementCountType) {
        return { ...state, count: state.count - 1 };
    }

    return state;
};

export default counterReducer;