import React, {useState} from 'react';
import ReactMarkdown from 'react-markdown';
import { Issue } from '../Components/Issue';
import { convertToPlainText, openNewGitlabIssue } from './../utils';
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
    const [visible, setVisible] = useState(false);
    const epic = props.epic.data;

    const [isClicked, setIsClicked] = useState(false);

    const openEpic = (epic) => {
        setIsClicked(true);
        openNewGitlabIssue(epic);
    }

    return (
        <div className="epic">
            {epic && (
                <>
                    <h3>{epic.titel[0].text}
                    </h3>
                    <div class="epic__actions">
                        <button onClick={() => openEpic(epic)} className={isClicked ? 'issue__id is-clicked' : 'issue__id primary'}>Create</button>
                        <button className="epic__id" onClick={() => setVisible(!visible)}>Details</button>
                    </div>
                    {visible && (
                        <>
                            <ReactMarkdown source={convertToPlainText(epic.description)} className="epic__description" />
                            <div className="epic__issues">
                                {epic.issues.map((issue) =>
                                    <div key={issue.issue.id} className={'epic__issue'}>
                                        <Issue uid={issue.issue.uid} />
                                    </div>
                                )}
                            </div>
                            {/* <div className="epic__action">
                                <button type="button" onClick={() => createEpic()}>Add to Sprint Backlog</button>
                            </div>  */}
                        </>
                    )}
                </>
            )}
        </div>
    );
}