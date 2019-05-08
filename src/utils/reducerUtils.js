export const updateObject = (oldObject, newValues) => ({
  ...oldObject,
  ...newValues
});

export const updateItemInArray = (array, itemId, callback) =>
  array.map(item => (item.id !== itemId ? item : callback(item)));

export const createReducer = (initialState, handlers) =>
  function reducer(state = initialState, action) {
    return Object.prototype.hasOwnProperty.call(handlers, action.type)
      ? handlers[action.type](state, action)
      : state;
  };
