import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { Query, Mutation } from "react-apollo";
import { ToastContainer, toast } from "react-toastify";
import RateCard from "./RateCard";
import RateAddCard from "./RateAddCard";
import Readmore from "./Readmore";
import { GET_MODE, SET_MODE, GET_RATES, GET_QUERYPARAMS } from "../resolver";

const RateAddButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 20;
  color: white;
  padding: 10px;
  background-color: ${props =>
    props.isAdd
      ? "rgba(231, 76, 60, 1.0)"
      : props.isModify
        ? "rgba(231, 76, 60, 1.0)"
        : "rgba(52, 152, 219, 1)"};
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;
  &:hover {
    background-color: ${props =>
      props.isAdd
        ? "rgba(192, 57, 43, 1.0)"
        : props.isModify
          ? "rgba(192, 57, 43, 1.0)"
          : "rgba(41, 128, 185, 1)"};
  }
`;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._notify = this._notify.bind(this);
    this._handleTZ = this._handleTZ.bind(this);
  }
  _notify = (text, handler) => {
    switch (handler) {
      case "success":
        toast.success(text, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        break;
      case "warning":
        toast.warn(text, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        break;
      case "error":
        toast.error(text, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        break;
      case "info":
        toast.info(text, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        break;
      default:
        toast(text, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        break;
    }
  };
  _handleTZ = prevQP => {
    let newQP = {
      ...prevQP,
      initialSF: prevQP.initialSF.toString(),
      initialST: prevQP.initialST.toString()
    };
    return newQP;
  };
  render() {
    return (
      <Query query={GET_MODE}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return <span>Error :(</span>;

          const isAdd = data.mode.isAdd;
          const isModify = data.mode.isModify;
          return (
            <Fragment>
              <ToastContainer />
              {isAdd ? (
                <RateAddCard USER_ID={this.props.USER_ID} isModify={false} />
              ) : null}
              <Query query={GET_QUERYPARAMS}>
                {({ loading, error, data }) => {
                  if (loading) return null;
                  if (error) return <span>Error :(</span>;

                  const queryParams = data.queryParams;

                  return (
                    <Query
                      query={GET_RATES}
                      variables={{
                        uid: this.props.USER_ID,
                        queryParams: JSON.stringify(this._handleTZ(queryParams))
                      }}
                    >
                      {({ loading, error, data, fetchMore }) => {
                        if (loading) return <span>Loading</span>;
                        if (error) return <span>Error</span>;

                        const rates = data.rates;
                        const cursor = Math.min(...rates.map(rate => rate.id));

                        return (
                          <Fragment>
                            <Query query={GET_MODE}>
                              {({ loading, error, data }) => {
                                if (loading) return null;
                                if (error) return <span>Error :(</span>;

                                return (
                                  <Fragment>
                                    {rates.map(rate => (
                                      <RateCard
                                        key={rate.id}
                                        USER_ID={this.props.USER_ID}
                                        rate={rate}
                                        isModify={data.mode.isModify}
                                      />
                                    ))}
                                  </Fragment>
                                );
                              }}
                            </Query>
                            {/* READMORE BUTTON */}
                            <Readmore
                              onLoadMore={() =>
                                fetchMore({
                                  query: GET_RATES,
                                  variables: {
                                    uid: this.props.USER_ID,
                                    queryParams: queryParams,
                                    cursor: cursor
                                  },
                                  updateQuery: (
                                    previousResult,
                                    { fetchMoreResult }
                                  ) => {
                                    if (fetchMoreResult.rates.length === 0)
                                      this._notify(
                                        "마지막 페이지 입니다!",
                                        "info"
                                      );
                                    return {
                                      rates: [
                                        ...previousResult.rates,
                                        ...fetchMoreResult.rates
                                      ]
                                    };
                                  }
                                })
                              }
                            />
                          </Fragment>
                        );
                      }}
                    </Query>
                  );
                }}
              </Query>
              <Mutation
                mutation={SET_MODE}
                variables={{
                  mode: {
                    isAdd: isModify ? false : !isAdd,
                    isModify: false
                  }
                }}
              >
                {setMode => (
                  <RateAddButton
                    isAdd={isAdd}
                    isModify={isModify}
                    onClick={() => setMode()}
                  >
                    {!isAdd ? (!isModify ? "추가" : "취소") : "취소"}
                  </RateAddButton>
                )}
              </Mutation>
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export default Main;
