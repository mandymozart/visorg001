import React, {useState} from 'react';
import { Issue } from '../Components/Issue';

export const Epic = (props) => {

    const [selected, setSelected] = useState([]);

    const addSelected = () => {
        alert('selected')
        selected.map((issueNumber) =>{
            // TODO URL 
        })
    }

    const addAll = () => {
        alert('all')
    }

    return (
        <div class="epic">
            <h3>§{props.epic.id}: {props.epic.title}</h3>
            <p>{props.epic.description}</p>
            <div class="epic__issues">
                {props.epic.issues.map((issue) => <Issue issue={issue} />)}
            </div>
            <div class="epic__action">
                <button type="button" onClick={() => addAll()}>Add all</button>
                <button type="button" onClick={() => addSelected()}>Add selected</button>
            </div>
        </div>
    );
}