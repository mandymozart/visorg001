import ReactMarkdown from 'react-markdown';
import './Issue.css';
import { config } from '../config';
import React, { useEffect, useState } from 'react';
import { client } from '../prismic-configuration'
import { convertToPlainText } from './../utils';


export const urlEncodeParams = (data) => {
    let out = [];

    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            out.push(`issue[${key}]=${encodeURIComponent(data[key])}`);
        }
    }
    out.join('&');
    console.log(out)
    return out;
}


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

    const open = (issue) => {
        // console.log('create issue:', issue)
        let issueMap = {
            title:  convertToPlainText(issue.titel),
            description: convertToPlainText(issue.description)
        }

        return window.open(config.repoURL + '/issues/new?' + urlEncodeParams(issueMap).join('&'), "_blank");

    }



    return (
        <div className={visible ? "issue selected" : "issue"}>
            {hasError && (<>Has Error</>)}
            {issue ? (
                <>
                    <h3>{issue.titel[0].text}
                        <span>
                            <button onClick={() => setVisible(!visible)} className="issue__id">Expand</button><button onClick={() => open(issue)} className="issue__id primary">Create</button>
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