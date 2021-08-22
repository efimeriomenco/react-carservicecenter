import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import "./css/styles.css";
import { Animated } from "react-animated-css";

const postData = async (data) => {
  const url = process.env.REACT_APP_API + "Enquiries";
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, requestOptions);
  const result = await response.json();
  debugger;
  return {
    isError: response.status >= 400,
    data: result,
  };
};

function AddEnquiry() {
  const { id } = useParams();
  const [errors, setErrors] = useState([]);
  const [state, setEnquiries] = useState(
    id == 0
      ? {
          firstName: "efim",
          lastName: "eriomenco",
          emailAddress: "efim.eriomenco@adsfasdf.com",
          phoneNumber: 43534534,
          model: "BMW",
          year: 2015,
          descriptionOfTheProblem: "suspesion broked",
        }
      : {}
  );
  const onSubmit = async (state, setErrorsCallback) => {
    const result = await postData({
      carDetails: {
        model: state.model,
        year: state.year,
        descriptionOfTheProblem: state.descriptionOfTheProblem,
      },
      customerDetails: {
        firstName: state.firstName,
        lastName: state.lastName,
        emailAddress: state.emailAddress,
        phoneNumber: state.phoneNumber,
      },
    });
    if (result.isError) {
      debugger;
      setErrorsCallback(result.data);
    } else {
      console.log(result);
    }
  };
  return (
    <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={true}>
      <div className="container">
        <div className="page-content page-container mt-4" id="page-content">
          <div className="padding">
            <div className="row container d-flex justify-content-center">
              <div className="col-lg-5 grid-margin stretch-card ">
                <div className="card">
                  <div className="card-body bg-dark rounded border border-5 border-white">
                    <h4 className="card-title text-white d-flex justify-content-center border border-white mb-3 p-3 bg-dark rounded rounded-pill">
                      Add new Enquiry
                    </h4>
                    <Form className="forms-sample form-add-enquiry">
                      <div className="form-group row">
                      <FormComponent
                        label="First Name:"
                        errors={errors}
                        state={state}
                        handleChange={setEnquiries}
                        propertyName="firstName"
                        propertyValue={state.firstName}
                      />
                         <FormComponent
                        label="Last Name:"
                        errors={errors}
                        state={state}
                        handleChange={setEnquiries}
                        propertyName="lastName"
                        propertyValue={state.lastName}
                      />
                      </div>
                      <FormComponent
                        label="Email Address:"
                        errors={errors}
                        state={state}
                        handleChange={setEnquiries}
                        propertyName="emailAddress"
                        propertyValue={state.emailAddress}
                      />
                        <FormComponent
                        label="Phone Number:"
                        errors={errors}
                        state={state}
                        handleChange={setEnquiries}
                        propertyName="phoneNumber"
                        propertyValue={state.phoneNumber}
                      />
                        <FormComponent
                        label="Model:"
                        errors={errors}
                        state={state}
                        handleChange={setEnquiries}
                        propertyName="model"
                        propertyValue={state.model}
                      />
                       <FormComponent
                        label="Year:"
                        errors={errors}
                        state={state}
                        handleChange={setEnquiries}
                        propertyName="year"
                        propertyValue={state.year}
                      />
                      <div className="form-group row">
                        <div className="col">
                          {" "}
                          <label className="fw-light text-white h4">
                            Description of the problem:
                            <Textarea
                              className="w-100 bg-light mt-2"
                              rows="4"
                              cols="70"
                              value={state.descriptionOfTheProblem}
                              onChange={(e) =>
                                setEnquiries({
                                  ...state,
                                  descriptionOfTheProblem: e.target.value,
                                })
                              }
                            ></Textarea>
                          </label>{" "}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary mt-4 d-flex justify-content-center w-100 text-white"
                        onClick={() => onSubmit(state, setErrors)}
                      >
                        Add Enquiry
                      </button>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Animated>
  );
}

const FormComponent = ({
  label,
  propertyValue,
  propertyName,
  state,
  errors,
  handleChange,
}) => {
  return (
    <div className="form-group m-2">
      <label className="fw-light text-white h4">{label}</label>
      <input
        className="form-control bg-light"
        value={propertyValue}
        defaultValue={propertyValue || ""}
        onChange={(e) =>
          handleChange({
            ...state,
            [propertyName]: e.target.value,
          })
        }
      />
      <p class="text-danger">
      {errors && errors[propertyName] && errors[propertyName][0]}
      </p>

      </div>
  );
};

export default AddEnquiry;
