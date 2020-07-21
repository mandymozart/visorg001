import ReactMarkdown from 'react-markdown';
import './Issue.css';
import React, { useEffect, useState } from 'react';
import { client } from '../prismic-configuration'
import { convertToPlainText, openNewGitlabIssue } from './../utils';

export const Issue = (props) => {

    const [visible, setVisible] = useState(false);

    const [issue, setIssue] = useState(null)
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            // We are using the function to get a document by its UID
            let res = await client.getByUID('issue', props.uid)
            // console.log(res)
            if (res) {
                // res is the response object, res.results holds the documents
                // console.log(res.results)
                return setIssue(res.data)
            } else {

                console.warn('Issue not found. Make sure it exists in your Prismic repository')
                setHasError(true);
                return
            }
        }
        fetchData()

    }, [props])

    const [isClicked, setIsClicked] = useState(false);

    const openIssue = (epic) => {
        setIsClicked(true);
        openNewGitlabIssue(epic);
    }


    return (
        <div className={visible ? "issue selected" : "issue"}>
            {hasError && (<>Has Error</>)}
            {issue ? (
                <>
                    <h3>{issue.titel[0].text}
                        <span>
                        <button onClick={() => openIssue(issue)} className={isClicked ? 'issue__id is-clicked' : 'issue__id primary'}>Create</button>
                            <button onClick={() => setVisible(!visible)} className="issue__id">Details</button>
                        </span>
                    </h3>
                    {issue.required && (<span className='issue__required-label'></span>)}
                    <ReactMarkdown source={convertToPlainText(issue.description)} className="issue__description" />
                </>
            ) : (
                    <>Loading ...</>
                )}
        </div>
    );
}