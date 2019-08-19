import React, { useState } from "react";

import RichTextEditor from 'react-rte';

const Editor = (props: any) => {
  
  const [ state, setState ] = useState({
    value: RichTextEditor.createEmptyValue()
  })


  const onChange = (value: any) => {
    setState({value});
    if (props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      props.onChange(
        value.toString('html')
      );
    }
  };

    return (
      <RichTextEditor
        value={state.value}
        onChange={onChange}
      />
    );
}

const Notes = () => {
    return (
        <> Notes

        <Editor />

        <ul>
            <li> All </li>
        </ul>
        
         </>
    )
}

export default Notes