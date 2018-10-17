import React, { Component } from "react";
import styled from "styled-components";
import AsyncSelect from "react-select/lib/Async";
// import "react-select/dist/react-select.css";
import moment from "moment";
import "moment/locale/ko";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Query } from "react-apollo";

import {
  THEME,
  GET_MODE,
  GET_INPUTPERSONS,
  GET_CLIENTS,
  GET_LINERS,
  GET_CNTRTYPES,
  GET_LOCATIONS,
  SET_QUERYPARAMS
} from "../resolver";

const DivContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const DivHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-left: 20px;
  margin-right: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: ${props => props.theme};
`;

const DivHeaderInputperson = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-width: 120px;
  padding-left: 1rem;
  padding-right: 0.3rem;
`;

const DivHeaderAccount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-width: 120px;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
`;

const DivHeaderLiner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 120px;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
`;

const DivHeaderPol = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-width: 120px;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
`;

const DivHeaderPod = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-width: 120px;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
`;

const DivHeaderType = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  max-width: 120px;
  min-width: 120px;
  padding-left: 0.3rem;
  padding-right: 1rem;
`;

const DivHeaderBS = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 200px;
  min-width: 200px;
  border-left: 1px solid #eee;
  background-color: ${props => props.theme};
  color: white;
`;

const DivHeaderBSTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  border-bottom: 1px solid #eee;
  background-color: ${props => props.theme};
`;

const DivHeaderBSType = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  background-color: ${props => props.theme};
`;

const DivHeaderBSType20 = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme};
`;

const DivHeaderBSType40 = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme};
`;

const DivHeaderBSType4H = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme};
`;

const DivHeaderLF = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 70px;
  min-width: 70px;
  border-left: 1px solid #eee;
  color: white;
  background-color: ${props => props.theme};
`;

const DivHeaderDF = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 70px;
  min-width: 70px;
  color: white;
  background-color: ${props => props.theme};
`;

const DivHeaderED = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 70px;
  min-width: 70px;
  color: white;
  background-color: ${props => props.theme};
`;

const DivHeaderOD = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 70px;
  min-width: 70px;
  color: white;
  background-color: ${props => props.theme};
`;

const DivHeaderRMK = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 40px;
  min-width: 40px;
  color: white;
  background-color: ${props => props.theme};
`;

const DivHeaderButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 40px;
  min-width: 40px;
  color: white;
  background-color: ${props => props.theme};
`;

class CustomInputDatePickerSF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="d-flex flex-column text-center">
        <button
          id="headersf"
          className="btn btn-primary btn-sm"
          onClick={this.props.onClick}
          style={{ backgroundColor: "#053F5C", borderColor: "#053F5C" }}
          tabIndex="-1"
        >
          {this.props.value}
        </button>
        견적일
      </div>
    );
  }
}

class CustomInputDatePickerST extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="d-flex flex-column text-center">
        <button
          id="headerst"
          className="btn btn-primary btn-sm"
          onClick={this.props.onClick}
          style={{ backgroundColor: "#053F5C", borderColor: "#053F5C" }}
          tabIndex="-1"
        >
          {this.props.value}
        </button>
        유효일
      </div>
    );
  }
}

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryParams: {
        selectedIp: [],
        selectedCt: [],
        selectedLn: [],
        selectedPl: [],
        selectedPd: [],
        selectedTy: [],
        initialSF: moment()
          .subtract(1, "months")
          .startOf("month"),
        initialST: moment()
          .add(1, "months")
          .endOf("month")
      }
    };
    this._handleChange = this._handleChange.bind(this);
    this._loadInputpersons = this._loadInputpersons.bind(this);
    this._loadClients = this._loadClients.bind(this);
    this._loadLiners = this._loadLiners.bind(this);
    this._loadPols = this._loadPols.bind(this);
    this._loadPods = this._loadPods.bind(this);
    this._loadTypes = this._loadTypes.bind(this);
    this._handleTZ = this._handleTZ.bind(this);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.queryParams !== this.state.queryParams) {
      console.log("state!");
      this._query.mutate({
        mutation: SET_QUERYPARAMS,
        variables: {
          queryParams: this.state.queryParams
        }
      });
    }
    if (prevProps.queryParams !== this.props.queryParams) {
      console.log("props!");
      this.setState({
        queryParams: this.props.queryParams
      });
    }
  }
  _handleTZ = prevQP => {
    let newQP = {
      ...prevQP,
      initialSF: prevQP.initialSF.toString(),
      initialST: prevQP.initialST.toString()
    };
    return newQP;
  };
  _loadInputpersons = inputValue => {
    return this._query
      .query({
        query: GET_INPUTPERSONS,
        variables: {
          uid: this.props.USER_ID,
          search: inputValue
        }
      })
      .then(response => {
        let results = [];
        response.data.inputpersons.map(ip =>
          results.push({ label: ip.profile.profileName, value: ip.id })
        );
        return results;
      });
  };
  _loadClients = inputValue => {
    return this._query
      .query({
        query: GET_CLIENTS,
        variables: {
          uid: this.props.USER_ID,
          search: inputValue
        }
      })
      .then(response => {
        let results = [];
        response.data.clients.map(ct =>
          results.push({ label: ct.name, value: ct.id })
        );
        return results;
      });
  };
  _loadLiners = inputValue => {
    return this._query
      .query({
        query: GET_LINERS,
        variables: {
          uid: this.props.USER_ID,
          search: inputValue
        }
      })
      .then(response => {
        let results = [];
        response.data.liners.map(ln =>
          results.push({ label: ln.label, value: ln.id })
        );
        return results;
      });
  };
  _loadPols = inputValue => {
    return this._query
      .query({
        query: GET_LOCATIONS,
        variables: {
          uid: this.props.USER_ID,
          search: inputValue,
          handler: "pol"
        }
      })
      .then(response => {
        let results = [];
        response.data.locations.map(lo =>
          results.push({ label: lo.name, value: lo.id })
        );
        return results;
      });
  };
  _loadPods = inputValue => {
    return this._query
      .query({
        query: GET_LOCATIONS,
        variables: {
          uid: this.props.USER_ID,
          search: inputValue,
          handler: "pod"
        }
      })
      .then(response => {
        let results = [];
        response.data.locations.map(lo =>
          results.push({ label: lo.name, value: lo.id })
        );
        return results;
      });
  };
  _loadTypes = inputValue => {
    return this._query
      .query({
        query: GET_CNTRTYPES,
        variables: {
          uid: this.props.USER_ID,
          search: inputValue
        }
      })
      .then(response => {
        let results = [];
        response.data.cntrtypes.map(ty =>
          results.push({ label: ty.name, value: ty.id })
        );
        return results;
      });
  };
  _handleChange = (data, target) => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        [target]: data
      }
    });
  };
  render() {
    const { queryParams } = this.state;
    return (
      <Query query={GET_MODE}>
        {({ loading, error, data, client }) => {
          this._query = client;
          if (loading) return null;
          if (error) return <span>Error :(</span>;

          const isAdd = data.mode.isAdd;
          const isModify = data.mode.isModify;
          return (
            <DivContainer>
              <DivHeader theme={THEME.DARK}>
                <DivHeaderInputperson theme={THEME}>
                  <div
                    style={{
                      width: "100%",
                      paddingTop: "0.5rem",
                      paddingBottom: "0.5rem"
                    }}
                  >
                    <AsyncSelect
                      name="headerInputperson"
                      isDisabled={isAdd || isModify}
                      isMulti
                      cacheOptions
                      defaultOptions
                      loadOptions={this._loadInputpersons}
                      openOnFocus={true}
                      placeholder="입력자"
                      onChange={data => this._handleChange(data, "selectedIp")}
                      value={queryParams.selectedIp}
                      isClearable={false}
                    />
                  </div>
                </DivHeaderInputperson>
                <DivHeaderAccount theme={THEME}>
                  <div
                    style={{
                      width: "100%",
                      paddingTop: "0.5rem",
                      paddingBottom: "0.5rem"
                    }}
                  >
                    <AsyncSelect
                      name="headerClient"
                      isDisabled={isAdd || isModify}
                      isMulti
                      cacheOptions
                      defaultOptions
                      loadOptions={this._loadClients}
                      openOnFocus={true}
                      placeholder="화주"
                      onChange={data => this._handleChange(data, "selectedCt")}
                      value={queryParams.selectedCt}
                      isClearable={false}
                    />
                  </div>
                </DivHeaderAccount>
                <DivHeaderLiner theme={THEME}>
                  <div
                    style={{
                      width: "100%",
                      paddingTop: "0.5rem",
                      paddingBottom: "0.5rem"
                    }}
                  >
                    <AsyncSelect
                      name="headerLiner"
                      isDisabled={isAdd || isModify}
                      isMulti
                      cacheOptions
                      defaultOptions
                      loadOptions={this._loadLiners}
                      openOnFocus={true}
                      placeholder="선사"
                      onChange={data => this._handleChange(data, "selectedLn")}
                      value={queryParams.selectedLn}
                      isClearable={false}
                    />
                  </div>
                </DivHeaderLiner>
                <DivHeaderPol theme={THEME}>
                  <div
                    style={{
                      width: "100%",
                      paddingTop: "0.5rem",
                      paddingBottom: "0.5rem"
                    }}
                  >
                    <AsyncSelect
                      name="headerPol"
                      isDisabled={isAdd || isModify}
                      isMulti
                      cacheOptions
                      defaultOptions
                      loadOptions={this._loadPols}
                      openOnFocus={true}
                      placeholder="POL"
                      onChange={data => this._handleChange(data, "selectedPl")}
                      value={queryParams.selectedPl}
                      isClearable={false}
                    />
                  </div>
                </DivHeaderPol>
                <DivHeaderPod theme={THEME}>
                  <div
                    style={{
                      width: "100%",
                      paddingTop: "0.5rem",
                      paddingBottom: "0.5rem"
                    }}
                  >
                    <AsyncSelect
                      name="headerPod"
                      isDisabled={isAdd || isModify}
                      isMulti
                      cacheOptions
                      defaultOptions
                      loadOptions={this._loadPods}
                      openOnFocus={true}
                      placeholder="POD"
                      onChange={data => this._handleChange(data, "selectedPd")}
                      value={queryParams.selectedPd}
                      isClearable={false}
                    />
                  </div>
                </DivHeaderPod>
                <DivHeaderType theme={THEME}>
                  <div
                    style={{
                      width: "100%",
                      paddingTop: "0.5rem",
                      paddingBottom: "0.5rem"
                    }}
                  >
                    <AsyncSelect
                      name="headerType"
                      isDisabled={isAdd || isModify}
                      isMulti
                      cacheOptions
                      defaultOptions
                      loadOptions={this._loadTypes}
                      openOnFocus={true}
                      placeholder="TYPE"
                      onChange={data => this._handleChange(data, "selectedTy")}
                      value={queryParams.selectedTy}
                      isClearable={false}
                    />
                  </div>
                </DivHeaderType>
                <DivHeaderBS>
                  <DivHeaderBSTitle theme={THEME.DARK}>BUY</DivHeaderBSTitle>
                  <DivHeaderBSType>
                    <DivHeaderBSType20 theme={THEME.DARK}>
                      20'
                    </DivHeaderBSType20>
                    <DivHeaderBSType40 theme={THEME.DARK}>
                      40'
                    </DivHeaderBSType40>
                    <DivHeaderBSType4H theme={THEME.DARK}>
                      40'HC
                    </DivHeaderBSType4H>
                  </DivHeaderBSType>
                </DivHeaderBS>
                <DivHeaderBS>
                  <DivHeaderBSTitle theme={THEME.DARK}>SELL</DivHeaderBSTitle>
                  <DivHeaderBSType>
                    <DivHeaderBSType20 theme={THEME.DARK}>
                      20'
                    </DivHeaderBSType20>
                    <DivHeaderBSType40 theme={THEME.DARK}>
                      40'
                    </DivHeaderBSType40>
                    <DivHeaderBSType4H theme={THEME.DARK}>
                      40'HC
                    </DivHeaderBSType4H>
                  </DivHeaderBSType>
                </DivHeaderBS>
                <DivHeaderLF theme={THEME.DARK}>L.F/T</DivHeaderLF>
                <DivHeaderDF theme={THEME.DARK}>D.F/T</DivHeaderDF>
                <DivHeaderOD theme={THEME.DARK}>
                  <DatePicker
                    customInput={<CustomInputDatePickerSF />}
                    selected={queryParams.initialSF}
                    onChange={value => this._handleChange(value, "initialSF")}
                    locale="ko"
                    dateFormat="MM-DD"
                    popperModifiers={{
                      offset: {
                        enabled: true,
                        offset: "-150px, 0px"
                      },
                      preventOverflow: {
                        enabled: true,
                        escapeWithReference: false,
                        boundariesElement: "viewport"
                      }
                    }}
                  />
                </DivHeaderOD>
                <DivHeaderED theme={THEME.DARK}>
                  <DatePicker
                    customInput={<CustomInputDatePickerST />}
                    selected={queryParams.initialST}
                    onChange={value => this._handleChange(value, "initialST")}
                    locale="ko"
                    dateFormat="MM-DD"
                    popperModifiers={{
                      offset: {
                        enabled: true,
                        offset: "-150px, 0px"
                      },
                      preventOverflow: {
                        enabled: true,
                        escapeWithReference: false,
                        boundariesElement: "viewport"
                      }
                    }}
                  />
                </DivHeaderED>
                <DivHeaderRMK theme={THEME.DARK}>
                  <i className="fas fa-comment" />
                </DivHeaderRMK>
                <DivHeaderButtons theme={THEME.DARK}>
                  <i className="fas fa-plus" />
                </DivHeaderButtons>
              </DivHeader>
            </DivContainer>
          );
        }}
      </Query>
    );
  }
}

export default Header;
