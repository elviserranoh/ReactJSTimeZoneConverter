
// Acion Types
const CONVERTER = "[Converter] Time UTC";
const ERROR = "[Converter] Time UTC Error";

//Reducer
export const timeReducer = (state = {}, action) => {
  switch (action.type) {
    case CONVERTER:
      return { ...action.response };
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

export const setErrorConverter = (response) => ({
  type: ERROR,
  response,
});

// Middleware

export const convertTimeMiddleware = (formValues) => {
  return (dispatch) => {
    fetch("http://localhost:8080/api", {
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
