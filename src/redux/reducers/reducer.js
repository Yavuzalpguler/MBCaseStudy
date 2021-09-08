import {
  ADD_TO_BOOKMARK_LIST,
  REMOVE_FROM_BOOKMARK_LIST,
} from '../actions/action';

const initialState = {
  bookmarks: [],
};

function movieReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_BOOKMARK_LIST:
      return {...state, bookmarks: [...state.bookmarks, action.payload]};
    case REMOVE_FROM_BOOKMARK_LIST:
      return {
        ...state,
        bookmarks: state.bookmarks.filter(
          movie => movie.id !== action.payload.id,
        ),
      };
    default:
      return state;
  }
}

export default movieReducer;
