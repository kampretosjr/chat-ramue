const initialState = {
  ListConfig: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
};

const buku = (state = initialState, action) => {
  switch (action.type) {
/////////////////////////////////////////////////////    
  case 'GET_CONFIGS_PENDING':
    return {
      ...state,
      isLoading: true,
      isFulfilled: false,
      isRejected: false,
    };
  case 'GET_CONFIGS_REJECTED':
    return {
      ...state,
      isLoading: false,
      isRejected: true,
    };
  case 'GET_CONFIGS_FULFILLED':
    return {
      ...state,
      isLoading: false,
      isFulfilled: true,
      ListConfig: action.payload.data,
    };
///////////POST////////////////////////////////////////////
    case "POST_CONFIG_PENDING":
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFulfilled: false
        };
    case "POST_CONFIG_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true
      };
    case "POST_CONFIG_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        ListConfig: action.payload.data
      };
/////////////GET1//////////////////////////////////////////
    case 'GET_CONFIG1_PENDING': // in case when loading post data
      return {
        ...state,
        isLoading: true,
        isFulFilled: false,
        isRejected: false
        }
    case 'GET_CONFIG1_REJECTED': // in case error network/else
        return {
            ...state,
            isLoading: false,
            isRejected: true,
        }
    case 'GET_CONFIG1_FULFILLED': // in case successfuly post data
        return {
            ...state,
            isLoading: false,
            isFulFilled: true,
            ListConfig: action.payload.data,
        }
///////////////DELETE////////////////////////////////////////        
      case 'DELETE_CONFIG_PENDING': // in case when loading post data
          return {
              ...state,
              isLoading: true,
              isFulFilled: false,
              isRejected: false
          }
      case 'DELETE_CONFIG_REJECTED': // in case error network/else
          return {
              ...state,
              isLoading: false,
              isRejected: true,
          }
      case 'DELETE_CONFIG_FULFILLED': // in case successfuly post data
          return {
              ...state,
              isLoading: false,
              isFulFilled: true,
              ListConfig: [state.ListConfig, action.payload.data[0]],
          }
//////////////UPDATE/////////////////////////////////////////          
      case 'UPDATE_CONFIG_PENDING': // in case when loading post data
          return {
              ...state,
              isLoading: true,
              isFulFilled: false,
              isRejected: false
          }
      case 'UPDATE_CONFIG_REJECTED': // in case error network/else
          return {
              ...state,
              isLoading: false,
              isRejected: true,
          }
      case 'UPDATE_CONFIG_FULFILLED': // in case successfuly post data
          return {
              ...state,
              isLoading: false,
              isFulFilled: true,
              ListConfig: [state.ListConfig, action.payload.data[0]],
          }
    default:
      return state;
  }
};

export default buku;
