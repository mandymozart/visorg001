import React from 'react';

export const Issue = (props) => {

    return (
       <div class="issue">
           <h3>#{props.issue.id}: {props.issue.title}</h3>
           <code>{props.issue.description}</code>
           <div class="issue__actions">
               <input type="checkbox" name={props.issue.id}/>
           </div>
       </div>
    );
}