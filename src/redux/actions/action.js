export const ADD_TO_BOOKMARK_LIST = 'ADD_TO_BOOKMARK_LIST';
export const REMOVE_FROM_BOOKMARK_LIST = 'REMOVE_FROM_BOOKMARK_LIST';

export const addBookmark = movie => dispatch => {
  dispatch({
    type: ADD_TO_BOOKMARK_LIST,
    payload: movie,
  });
};

export const removeBookmark = movie => dispatch => {
  dispatch({
    type: REMOVE_FROM_BOOKMARK_LIST,
    payload: movie,
  });
};
