const URL_API = "https://time-zone-converter-api.herokuapp.com/api";

// Acion Types
const CONVERTER = "[Converter] Time UTC";
const LOADING = "[Loading] Loading";
const ERROR = "[Converter] Time UTC Error";

//Reducer
export const timeReducer = (state = {}, action) => {
  switch (action.type) {
    case CONVERTER:
      return { ...action.response };
    case LOADING:
      return { loading: true };
    case ERROR:
      return { ...action.response };
    default:
      return state;
  }
};

//Action Creators
export const convertTime = (response) => ({
  type: CONVERTER,
  response,
});

export const setLoading = () => ({
  type: LOADING,
});

export const setErrorConverter = (response) => ({
  type: ERROR,
  response,
});

// Middleware

export const convertTimeMiddleware = (formValues) => {
  return (dispatch) => {
    dispatch(setLoading());
    fetch(URL_API, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((data) => data.json())
      .then(({ response }) => {
        if (response.status) {
          dispatch(convertTime(response));
        } else {
          dispatch(setErrorConverter(response));
        }
      })
      .catch((err) => console.log("err", err));
  };
};
