import React from "react";
import "./Add.css";
import { Formik, ErrorMessage, Form } from "formik";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  ticketId: Yup.number().required(),
  alias: Yup.string()
    .length(3, "Aliases are always 3 chars long")
    .matches(/^[a-z]+$/)
    .required(),
  circleWeight: Yup.number().required(),
  hours: Yup.number().required(),
});

export default () => {
  const { addToast } = useToasts();

  return (
    <div className="Add">
      <div className="page__header">
        <h3>Ticket completed</h3>
        <p>
          Tracking is done after completion of a ticket and after the completen
          of a project or PAINS cycle. (every quarter year)
        </p>
      </div>
      <Formik
        initialValues={{
          ticketId: "",
          alias: "",
          circleWeight: "",
          hours: "",
        }}
        validationSchema={Schema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          axios
            .post(
              `https://visinn001.viennastruggle.at/api/tracking-add`,
              {
                ticket_id: values.ticketId,
                alias: values.alias,
                circle_weight: values.circleWeight,
                hours: values.hours,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then((res) => {
              console.log(res);
              if (res.data.status === "error") {
                addToast("API Error: " + res.data.message, {
                  appearance: "error",
                  autoDismiss: true,
                });
              }
              if (res.data.status === "success") {
                addToast(res.data.message, {
                  appearance: "success",
                  autoDismiss: true,
                });
                resetForm();
              }
            })
            .catch((res) => {
              console.log(res);
              addToast("Unknown API Error", {
                appearance: "error",
                autoDismiss: true,
              });
            })
            .finally(setSubmitting(false));
        }}
      >
        {({ values, handleSubmit, handleChange, isSubmitting }) => (
          <>
            {isSubmitting ? (
              <>⌛ Loading ...</>
            ) : (
              <Form onSubmit={handleSubmit}>
                <div className="field">
                  <label htmlFor="ticketId">Ticket Id</label>
                  <input
                    type="text"
                    maxLength={5}
                    name="ticketId"
                    value={values.ticketId}
                    onChange={handleChange}
                  />
                  <div className="error">
                    <ErrorMessage name="ticketId" />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="alias">Alias</label>
                  <input
                    type="text"
                    maxLength={3}
                    label="alias"
                    placeholder="abc"
                    name="alias"
                    value={values.alias}
                    onChange={handleChange}
                  />
                  <div className="error">
                    <ErrorMessage name="alias" />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="circleWeight">Estimate Circle Weight (0, .5, 1, 2, 4, 8, 16, 32)</label>
                  <input
                    label="circleWeight"
                    maxLength={2}
                    type="text"
                    name="circleWeight"
                    value={values.circleWeight}
                    onChange={handleChange}
                  />
                  <div className="error">
                    <ErrorMessage name="circleWeight" />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="hours">Hours (quarter hours in decimals only 1.25h, 5.5h, 10.75 hours)</label>
                  <input
                    label="hours"
                    maxLength={5}
                    type="text"
                    name="hours"
                    value={values.hours}
                    onChange={handleChange}
                  />
                  <div className="error">
                    <ErrorMessage name="hours" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="primary"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </Form>
            )}
          </>
        )}
      </Formik>
    </div>
  );
};
