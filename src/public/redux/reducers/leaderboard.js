const initialState = {
  ListLeaderboard: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
};

const buku = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_LEADERBOARD_PENDING':
      return {
        ...state,
        isLoading: true,
        isFulfilled: false,
        isRejected: false,
      };
    case 'GET_LEADERBOARD_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'GET_LEADERBOARD_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        ListLeaderboard: action.payload.data,
      };
////////////////////////////////////////////////////////
case 'GET_SCORE_PENDING':
      return {
        ...state,
        isLoading: true,
        isFulfilled: false,
        isRejected: false,
      };
    case 'GET_SCORE_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'GET_SCORE_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        ListLeaderboard: action.payload.data,
      };
///////////////////////////////////////////////////////
    case "POST_LEADERBOARD_PENDING":
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFulfilled: false
        };
      case "POST_LEADERBOARD_REJECTED":
        return {
          ...state,
          isLoading: false,
          isRejected: true
        };
      case "POST_LEADERBOARD_FULFILLED":
        return {
          ...state,
          isLoading: false,
          isFulfilled: true,
          ListLeaderboard: action.payload.data
        };
/////////////GET1//////////////////////////////////////////
    case 'GET_LEADERBOARD1_PENDING': // in case when loading post data
    return {
      ...state,
      isLoading: true,
      isFulFilled: false,
      isRejected: false
      }
  case 'GET_LEADERBOARD1_REJECTED': // in case error network/else
      return {
          ...state,
          isLoading: false,
          isRejected: true,
      }
  case 'GET_LEADERBOARD1_FULFILLED': // in case successfuly post data
      return {
          ...state,
          isLoading: false,
          isFulFilled: true,
          ListLeaderboard: action.payload.data,
      }

///////////////DELETE////////////////////////////////////////        
    case 'DELETE_LEADERBOARD_PENDING': // in case when loading post data
        return {
            ...state,
            isLoading: true,
            isFulFilled: false,
            isRejected: false
        }
    case 'DELETE_LEADERBOARD_REJECTED': // in case error network/else
        return {
            ...state,
            isLoading: false,
            isRejected: true,
        }
    case 'DELETE_LEADERBOARD_FULFILLED': // in case successfuly post data
        return {
            ...state,
            isLoading: false,
            isFulFilled: true,
            ListLeaderboard: [state.ListLeaderboard, action.payload.data[0]],
        }
//////////////UPDATE/////////////////////////////////////////          
    case 'UPDATE_LEADERBOARD_PENDING': // in case when loading post data
        return {
            ...state,
            isLoading: true,
            isFulFilled: false,
            isRejected: false
        }
    case 'UPDATE_LEADERBOARD_REJECTED': // in case error network/else
        return {
            ...state,
            isLoading: false,
            isRejected: true,
        }
    case 'UPDATE_LEADERBOARD_FULFILLED': // in case successfuly post data
        return {
            ...state,
            isLoading: false,
            isFulFilled: true,
            ListLeaderboard: [state.ListLeaderboard, action.payload.data[0]],
        }
    default:
      return state;
  }
};

export default buku;
