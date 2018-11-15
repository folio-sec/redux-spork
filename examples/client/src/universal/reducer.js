module.exports = (state = {}, action) => {
  switch (action.type) {
    case "INDEXES":
      return { ...state, indexes: action.payload };
    case "STOCKS":
      return { ...state, stocks: action.payload };
    default:
      return state;
  }
};
