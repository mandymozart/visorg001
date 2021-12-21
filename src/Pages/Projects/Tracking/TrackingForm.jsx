import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import { ErrorMessage, Form, Formik } from "formik";
import React from "react";
import { useToasts } from "react-toast-notifications";
import * as Yup from "yup";
import useProjectStore from "../../../Hooks/ProjectStore";
import { useAddTracking } from "../../../Hooks/Queries";

const Container = styled.section``;

const Schema = Yup.object().shape({
  tracking: Yup.string().required(),
  hours: Yup.number(),
});

const TrackingForm = () => {
  const { addToast } = useToasts();
  const { user, isAuthenticated } = useAuth0();
  const { mutate, isLoading } = useAddTracking();
  const { project, setTracking } = useProjectStore();
  // setTracking?

  if (!isAuthenticated) return null;
  return (
    <Container>
      <Formik
        initialValues={{
          comment: "",
          hours: 0,
        }}
        validationSchema={Schema}
        onSubmit={(values, { resetForm }) => {
          mutate(
            {
              projectId: project.id,
              userId: user.sub,
              ...values,
            },
            {
              onSuccess: (res) => {
                if (res.data.status === "success") {
                  addToast("Tracking tracking has been succesfully added.", {
                    appearance: "success",
                    autoDismiss: true,
                  });
                  setTracking(res.data.message);
                  resetForm();
                }
                if (res.data.status === "error") {
                  addToast("API Error: " + res.data.message, {
                    appearance: "error",
                    autoDismiss: true,
                  });
                }
              },
              // TODO rework HTTP error responses in api
              onError: (error) => {
                console.error(error);
                addToast("API Error: " + error.message, {
                  appearance: "error",
                  autoDismiss: true,
                });
              },
            }
          );
        }}
      >
        {({ values, handleSubmit, handleChange, isSubmitting }) => (
          <>
            {isLoading ? (
              <>⌛ Loading ...</>
            ) : (
              <Form onSubmit={handleSubmit}>
                <div className="field">
                  <label htmlFor="comment">Add a comment</label>
                  <textarea
                    name="comment"
                    value={values.comment}
                    onChange={handleChange}
                  />
                  <small>Markdown is enabled</small>
                  <div className="error">
                    <ErrorMessage name="comment" />
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
    </Container>
  );
};

export default TrackingForm;
