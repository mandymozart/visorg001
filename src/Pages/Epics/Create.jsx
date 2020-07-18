import React, { useEffect, useState } from 'react';
import Prismic from 'prismic-javascript'
import { client } from '../../prismic-configuration'
// import { epics } from '../../Services/EpicPresets';
import { Epic } from '../../Components/Epic';
import { Navigation } from '../../Components/Navigation';

export default (props) => {
    const [epics, setEpics] = useState(null)
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            // We are using the function to get a document by its UID
            client.query(
                Prismic.Predicates.at('document.type', 'epic'),
                { orderings: '[my.epic.title desc]' }
            ).then(res => {
                // res is the response object, res.results holds the documents
                console.log(res.results)
                return setEpics(res.results)
            }).catch(error => {

                console.warn('Epics not found. Make sure it exists in your Prismic repository',error)
                setHasError(true);
                return
            })

        }
        fetchData()

    }, [props])
    return (
        <div className="create-page">
            <h2>Create Template</h2>
            {hasError && (
                <>Has Error</>
            )}
            {epics && (<>
                {epics.map((epic) => 
                // <>{epic.id}</>
                <Epic key={epic.id} epic={epic} />
                )}
            </>)}
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