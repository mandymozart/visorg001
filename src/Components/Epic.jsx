import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Issue } from '../Components/Issue';
import { convertToPlainText } from './../utils';
// import { config } from '../config';
import './Epic.css';

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

export const Epic = (props) => {

    const epic = props.epic.data;
    // console.log(epic)

    // const open = (issue) => {
    //     console.log('create issue:',issue)
    //     return window.open(config.repoURL + '/issues/new?' + urlEncodeParams(issue).join('&'), "_blank");

    // }

    // const createEpic = () => {
    //     console.log(epic)
    //     props.epic.issues.map((issue) => {
    //         open(issue)
    //     })
    //     return 
    // }

    return (
        <div className="epic">
            {epic && (
                <>
                    <h3>{epic.titel[0].text}
                        {/* <span className="epic__id">{props.epic.id}</span> */}
                    </h3>
                    <ReactMarkdown source={convertToPlainText(epic.description)}  className="epic__description"/>
                    <div className="epic__issues">
                        {epic.issues.map((issue) =>
                            <div key={issue.issue.id} className={'epic__issue'}>
                                <Issue uid={issue.issue.uid} />
                            </div>
                        )}
                    </div>
                    <div className="epic__action">
                        {/* <button type="button" onClick={() => createEpic()}>Add to Sprint Backlog</button> */}
                    </div>
                </>
            )}
        </div>
    );
}