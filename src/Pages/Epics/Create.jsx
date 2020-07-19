import React, { useEffect, useState/*, useContext */} from 'react';
import Prismic from 'prismic-javascript'
import { client } from '../../prismic-configuration'
// import { epics } from '../../Services/EpicPresets';
import { Epic } from '../../Components/Epic';
import { project, ProjectProvider } from '../Contexts/Project';
import './Create.css';
// import { Formik, Field, ErrorMessage, Form } from 'formik';

export default (props) => {
    const [epics, setEpics] = useState(null)
    const [hasError, setHasError] = useState(false)

    // const globalState = useContext(project);
    // const { dispatch } = globalState;


    useEffect(() => {
        const fetchData = async () => {
            // We are using the function to get a document by its UID
            client.query(
                Prismic.Predicates.at('document.type', 'epic'),
                { orderings: '[my.epic.title desc]' }
            ).then(res => {
                // res is the response object, res.results holds the documents
                // console.log(res.results)
                return setEpics(res.results)
            }).catch(error => {

                console.warn('Epics not found. Make sure it exists in your Prismic repository', error)
                setHasError(true);
                return
            })

        }
        fetchData()

    }, [props])

    return (

        <div className="Create">
            <ProjectProvider>
                <div className='page__header'>
                    <h2>Browser Epics {project && (<span>{project.id}</span>)}</h2>
                    <p>
                        You can create issues of epics from these templates. To edit or add templates you have to use the <a href="https://visorg001.prismic.io/documents" rel="noopener noreferrer" target="_blank">external CMS editor</a>.
                </p>
                </div>
                {hasError && (
                    <>Has Error</>
                )}

                {epics ? (<>
                    {/* <Formik
                        initialValues={{
                            id: '',
                            lang: 'en-GB',
                            labels: '~Epic, ~Draft'
                        }}
                        validate={values => {
                            const errors = {};
                            if (!values.id) {
                                errors.id = 'Required';
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            dispatch({ type: 'update', payload: values })
                            setSubmitting(false);
                            setTimeout(() => {
                                alert(JSON.stringify(project, null, 2));
                            }, 400);
                        }}
                    >
                        {({
                            isSubmitting,
                        }) => (
                                <Form>
                                    <p>If you provide a project id (VISSTS002, VISEXT002, etc.) it will automatically tag all tickets correctly.</p>
                                    <div className="field">
                                        <label for='id'>
                                            Project Id
                                        </label>
                                        <Field
                                            type="text"
                                            name="id"
                                            placeholder='VISSTS:021'
                                        />
                                        <ErrorMessage name="id" component="p" />

                                    </div>
                                    <div className="field">
                                        <label for='labels'>
                                            Labels (ex: ~"Role: Designer" ~VISSTS ~"Role: Organ Player")
                                </label>
                                        <Field label='labels'
                                            type="text"
                                            name="labels"
                                        />
                                        <ErrorMessage name="lang" component="p" />

                                    </div>
                                    <button type="submit" disabled={isSubmitting}>Change</button>
                                </Form>
                            )}
                    </Formik> */}
                    {epics.map((epic) =>
                        // <>{epic.id}</>
                        <Epic key={epic.id} epic={epic} />
                    )}
                </>) : (
                        <small>Loading...</small>
                    )
                }
            </ProjectProvider>
        </div>
    );
}

/*

New issue via URL with prefilled fields
You can link directly to the new issue page for a given project, with prefilled field values using query string parameters in a URL. This is useful for embedding a URL in an external HTML page, and also certain scenarios where you want the user to create an issue with certain fields prefilled.

The title, description, description template, and confidential fields can be prefilled using this method. You cannot pre-fill both the description and description template fields in the same URL (since a description template also populates the description field).

Field	URL Parameter Name	Notes
title	issue[title]
description	issue[description]
description template	issuable_template
confidential	issue[confidential]	Parameter value must be true to set to confidential
Follow these examples to form your new issue URL with prefilled fields.

For a new issue in the GitLab Community Edition project with a pre-filled title and a pre-filled description, the URL would be https://gitlab.com/gitlab-org/gitlab-foss/-/issues/new?issue[title]=Validate%20new%20concept&issue[description]=Research%20idea
For a new issue in the GitLab Community Edition project with a pre-filled title and a pre-filled description template, the URL would be https://gitlab.com/gitlab-org/gitlab-foss/-/issues/new?issue[title]=Validate%20new%20concept&issuable_template=Research%20proposal
For a new issue in the GitLab Community Edition project with a pre-filled title, a pre-filled description, and the confidential flag set, the URL would be https://gitlab.com/gitlab-org/gitlab-foss/-/issues/new?issue[title]=Validate%20new%20concept&issue[description]=Research%20idea&issue[confidential]=true


*/