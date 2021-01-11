import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { convertTimeMiddleware } from "./duck/time";

export const TimeZoneConverterApp = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.time);

  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: {
      time: "5:34:23",
      timezone: "-4:00",
    },

    onSubmit: (values) => {
      dispatch(convertTimeMiddleware(values));
    },
  });

  return (
    <div className="container-fluid">
      <div className="row" style={{ height: "100vh" }}>
        <div
          className="col-md-6"
          style={{
            backgroundColor: "#252121",
            padding: "50px",
          }}
        >
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100%" }}
          >
            <div className="container">
              <h1
                style={{
                  textAlign: "center",
                  color: "#FFF",
                  fontWeight: "bold",
                  fontSize: "28px",
                  marginBottom: "40px",
                }}
              >
                Convert your time to UTC
              </h1>
              {state.errors && (
                <div className="alert alert-danger">
                  {state.errors.map((err) => (
                    <p key={err}>{err}</p>
                  ))}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="row g-3 needs-validation"
                noValidate
              >
                <div className="col-md-12">
                  <label htmlFor="time" className="form-label text-white">
                    Time
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="time"
                    name="time"
                    placeholder="Ej. 18:23:21"
                    onChange={handleChange}
                    value={values.time}
                  />
                  {touched.time && errors.time && (
                    <div className="text-danger">{errors.time}</div>
                  )}
                </div>
                <div className="col-md-12">
                  <label htmlFor="timezone" className="form-label text-white">
                    Time Zone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="timezone"
                    name="timezone"
                    placeholder="Ej. -4:30"
                    value={values.timezone}
                    onChange={handleChange}
                  />

                  {touched.timezone && errors.timezone && (
                    <div className="text-danger">{errors.timezone}</div>
                  )}
                </div>

                <div className="col-12">
                  <button className="btn btn-primary w-100" type="submit">
                    Convert Time Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6" style={{ backgroundColor: "#FFFFFF" }}>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100%" }}
          >
            <div style={{ textAlign: "center" }}>
              <h1 style={{ fontSize: "40px" }}>Time Zone Converter</h1>
              {state.time && (
                <div>
                  <h1 style={{ fontSize: "30px" }}>Converter Results:</h1>
                  <p style={{ fontSize: "30px" }}>
                    {state.time} {state.timezone.toUpperCase()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
