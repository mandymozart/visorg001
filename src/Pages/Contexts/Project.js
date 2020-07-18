import React, {createContext, useReducer} from 'react';

const initialState = { id: '', lang: 'en-GB', labels: '~Epic, ~"Sprint Backlog" ~"Draft"'};
const project = createContext(initialState);
const { Provider } = project;

const ProjectProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'set':
        const newState = action.payload;
        return newState;
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { project, ProjectProvider }