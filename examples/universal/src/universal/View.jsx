import React, { Fragment } from "react";
import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";

const Li = ({ change, children }) => (
  <li className={change > 0 ? "up" : change < 0 ? "down" : ""}>{children}</li>
);

const Price = ({ price }) => (
  <p className="price">
    {price}
    <span className="unit">USD</span>
  </p>
);

const Change = ({ change }) => (
  <p className="change">{change > 0 ? `+${change}` : change}</p>
);

const ChangePercent = ({ percent }) => (
  <p className="changePercent">
    ({percent > 0 ? `+${percent}` : percent}
    <span className="unit">%</span>)
  </p>
);

const Arrow = ({ change }) => (
  <p className="arrow">{change > 0 ? "↑" : change < 0 ? "↓" : null}</p>
);

const View = compose(
  connect(
    state => state,
    dispatch => ({
      fetchIndexes: () => dispatch({ type: "FETCH_INDEXES" }),
      fetchStocks: () => dispatch({ type: "FETCH_STOCKS" }),
    }),
  ),
  lifecycle({
    componentWillMount() {
      this.props.fetchIndexes();
    },
  }),
)(({ indexes, stocks, fetchStocks }) => (
  <Fragment>
    <h1>
      Example for{" "}
      <a href="https://github.com/folio-sec/redux-spork">redux-spork</a>
    </h1>
    {indexes ? (
      <section>
        <h2>Indexes</h2>
        <ul>
          {indexes.map(({ ticker, price, changes, name }) => (
            <Li key={ticker} change={changes}>
              <p>{name}</p>
              <Price price={price} />
              <Change change={changes} />
              <Arrow change={changes} />
            </Li>
          ))}
        </ul>
      </section>
    ) : null}
    {stocks ? (
      <section>
        <h2>Stocks</h2>
        <ul>
          {stocks.map(
            ({ symbol, companyName, price, change, changePercent }) => (
              <Li key={symbol} change={change}>
                <p>{companyName}</p>
                <Price price={price} />
                <Change change={change} />
                <ChangePercent percent={changePercent} />
                <Arrow change={change} />
              </Li>
            ),
          )}
        </ul>
      </section>
    ) : (
      <button onClick={fetchStocks}>fetch stocks</button>
    )}
    <p className="disclaimer">
      The index and stock prices provided on this page is dummy data and should
      not be relied upon for trading.
    </p>
  </Fragment>
));

export default View;
