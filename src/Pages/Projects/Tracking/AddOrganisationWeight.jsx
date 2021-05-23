import React from "react";
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
  organisationWeight: Yup.number().required(),
});

const AddOrganisationWeight = () => {
  const { addToast } = useToasts();

  return (
    <div className="Add">
      <div className="page__header">
        <h3>Estimate by the organisation</h3>
        <p>
          People will estimate the work of other circles.
        </p>
      </div>
      <Formik
        initialValues={{
          ticketId: "",
          alias: "",
          organisationWeight: "",
        }}
        validationSchema={Schema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          axios
            .post(
              `https://visinn001.viennastruggle.at/api/tracking-add-organisation-weight`,
              {
                ticket_id: values.ticketId,
                alias: values.alias,
                organisation_weight: values.organisationWeight,
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
                  <label htmlFor="organisationWeight">Organisation Weight</label>
                  <input
                    label="organisationWeight"
                    maxLength={2}
                    type="text"
                    name="organisationWeight"
                    value={values.organisationWeight}
                    onChange={handleChange}
                  />
                  <div className="error">
                    <ErrorMessage name="organisationWeight" />
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

export default AddOrganisationWeight;