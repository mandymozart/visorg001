import React from "react";
import { Formik, ErrorMessage, Form } from "formik";
import { useToasts } from "react-toast-notifications";
import * as Yup from "yup";
import { useAddProject } from "../../Hooks/Queries";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Schema = Yup.object().shape({
  projectId: Yup.string().min(9).length(9).required(),
  title: Yup.string().min(3).max(255).required(),
  description: Yup.string().required(),
  tags: Yup.string().max(255).required(),
});

export default () => {
  const { addToast } = useToasts();
  const { user, isAuthenticated } = useAuth0();
  const { mutate, isLoading } = useAddProject();
  const history = useHistory();

  if (!isAuthenticated) return null;
  return (
    <div className="Add">
      <div className="page__header">
        <h3>Start new project</h3>
        <p>Create a brief and invite people to join.</p>
      </div>
      <Formik
        initialValues={{
          projectId: "",
          title: "",
          description: "",
          tags: "",
          participants: "",
        }}
        validationSchema={Schema}
        onSubmit={(values) => {
          mutate(
            {
              projectId: values.projectId,
              title: values.title,
              description: values.description,
              ownerId: user.sub,
              tags: values.tags,
              participants: "",
            },
            {
              onSuccess: () => {
                addToast("Project succesfully added", {
                  appearance: "success",
                  autoDismiss: true,
                });
                history.push(`/detail/${values.projectId}`);
              },
              onError: (error) => {
                console.error(error);
                addToast("API Error: " + error, {
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
                  <label htmlFor="projectId">Project Id</label>
                  <input
                    type="text"
                    minLength={9}
                    maxLength={9}
                    label="Project Id"
                    placeholder="VISTRA000"
                    name="projectId"
                    value={values.projectId}
                    onChange={handleChange}
                  />
                  <div className="error">
                    <ErrorMessage name="projectId" />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    maxLength={255}
                    label="Title"
                    placeholder="Music Video Shooting"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                  />
                  <div className="error">
                    <ErrorMessage name="title" />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="tags">Tags</label>
                  <input
                    label="Tags"
                    maxLength={255}
                    type="text"
                    name="tags"
                    placeholder="Classical, Commission, Rave"
                    value={values.tags}
                    onChange={handleChange}
                  />
                  <div className="error">
                    <ErrorMessage name="tags" />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="description">Description</label>
                  <textarea name="description" value={values.description} onChange={handleChange}/>
                  <div className="error">
                    <ErrorMessage name="textarea" />
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
