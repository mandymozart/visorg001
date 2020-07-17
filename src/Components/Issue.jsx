import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './Issue.css';
import { config } from '../config';

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

    const issue = props.issue;
    const [visible, setVisible] = useState(false);

    const open = (issue) => {
        console.log('create issue:', issue)
        return window.open(config.repoURL + '/issues/new?' + urlEncodeParams(issue).join('&'), "_blank");

    }

    return (
        <div className={visible ? "issue selected" : "issue"}>
            <h3>{issue.title}
                <span>
                    <button onClick={() => setVisible(!visible)} className="issue__id">Expand</button><button onClick={() => open(issue)} className="issue__id">Create</button>
                </span>
            </h3>
            <ReactMarkdown source={issue.description} className="issue__description" />
        </div>
    );
}