import { fork } from "redux-spork";

const sporks = ({ fetch }) => [
  fork("FETCH_INDEXES", async ({ dispatch }) => {
    const data = await fetch("indexes.json");
    dispatch({ type: "INDEXES", payload: data });
  }),
  fork("FETCH_STOCKS", async ({ dispatch }) => {
    const data = await fetch("stocks.json");
    dispatch({ type: "STOCKS", payload: data });
  }),
];

export default sporks;
