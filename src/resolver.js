import gql from "graphql-tag";
import moment from "moment";
import "moment/locale/ko";

export const THEME = { LIGHT: "#6dbad8", DARK: "#053F5C" };

// DEV
export const API_URL = "http://localhost:8000/graphql/";
export const DOMAIN_MEDIA = "http://localhost:8000/media";
export const DOMAIN_STATIC = "http://localhost:8000/static";

// DEV in VM
// export const API_URL = "http://10.0.2.2:8000/graphql/";
// export const DOMAIN_MEDIA = "http://10.0.2.2:8000/media";
// export const DOMAIN_STATIC = "http://10.0.2.2:8000/static";

export const GET_ME = gql`
  query getMe($uid: Int) {
    me(userId: $uid) {
      id
      nickname
      profile {
        profileName
      }
    }
  }
`;

export const GET_MODE = gql`
  query {
    mode @client
  }
`;

export const SET_MODE = gql`
  mutation setMode($mode: String) {
    setMode(mode: $mode) @client
  }
`;

export const GET_QUERYPARAMS = gql`
  query {
    queryParams @client
  }
`;

export const SET_QUERYPARAMS = gql`
  mutation setQP($queryParams: String) {
    setQueryParams(queryParams: $queryParams) @client
  }
`;

export const GET_RATES = gql`
  query getRates($uid: Int, $queryParams: String, $cursor: Int) {
    rates(userId: $uid, queryParams: $queryParams, cursor: $cursor) {
      id
      inputperson {
        id
        profile {
          profileName
        }
      }
      account {
        id
        name
      }
      liner {
        id
        name
        label
      }
      pol {
        id
        name
      }
      pod {
        id
        name
      }
      type {
        id
        name
      }
      buying20
      buying40
      buying4H
      selling20
      selling40
      selling4H
      loadingFT
      dischargingFT
      offeredDate
      effectiveDate
      recordedDate
      remark
      deleted
    }
  }
`;

export const SET_RATE = gql`
  mutation setRate($newRate: String, $handler: String, $rid: Int, $uid: Int) {
    cudRate(newRate: $newRate, handler: $handler, rateId: $rid, userId: $uid) {
      rate {
        id
        inputperson {
          id
          profile {
            profileName
          }
        }
        account {
          id
          name
        }
        liner {
          id
          name
        }
        pol {
          id
          name
        }
        pod {
          id
          name
        }
        type {
          id
          name
        }
        buying20
        buying40
        buying4H
        selling20
        selling40
        selling4H
        loadingFT
        dischargingFT
        offeredDate
        effectiveDate
        recordedDate
        remark
        deleted
      }
    }
  }
`;

export const GET_INPUTPERSONS = gql`
  query getIps($uid: Int, $search: String) {
    inputpersons(userId: $uid, search: $search) {
      id
      nickname
      profile {
        profileName
      }
    }
  }
`;

export const GET_CLIENTS = gql`
  query getCts($uid: Int, $search: String, $handler: String) {
    clients(userId: $uid, search: $search, handler: $handler) {
      id
      name
    }
  }
`;

export const GET_LINERS = gql`
  query getLns($uid: Int, $search: String) {
    liners(userId: $uid, search: $search) {
      id
      name
      label
    }
  }
`;

export const GET_LOCATIONS = gql`
  query getLos($uid: Int, $search: String, $handler: String) {
    locations(userId: $uid, search: $search, handler: $handler) {
      id
      name
    }
  }
`;

export const GET_CNTRTYPES = gql`
  query getCNTRTypes($uid: Int, $search: String) {
    cntrtypes(userId: $uid, search: $search) {
      id
      name
    }
  }
`;

export const defaults = {
  mode: {
    isAdd: false,
    isModify: false
  },
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

export const resolvers = {
  Mutation: {
    setQueryParams: (_, variables, { cache }) => {
      cache.writeQuery({
        query: GET_QUERYPARAMS,
        data: {
          queryParams: variables.queryParams
        }
      });
      return null;
    },
    setMode: (_, variables, { cache }) => {
      cache.writeQuery({
        query: GET_MODE,
        data: {
          mode: variables.mode
        }
      });
      return null;
    }
  }
};
