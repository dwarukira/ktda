import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import colors from "../../../../styles/colors";

const DND = (props: any) => {
  const ref = useRef(null);
  const [drag, setDrag] = useState(false);

  const handleDrag = (e: any) => {
    e.preventDefault();

    e.stopPropagation();
  };

  const handleDragIn = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    setDrag(true);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();

    e.stopPropagation();

    props.handleDrag(e.dataTransfer.files);

    e.dataTransfer.clearData();
  };

  const handleDragOut = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    setDrag(false);
  };

  useEffect(() => {
    if (!ref) {
      return;
    }

    const div = (ref.current as unknown) as HTMLElement;

    if (!div) {
      return;
    }
    div.addEventListener("dragenter", handleDragIn);
    div.addEventListener("dragleave", handleDragOut);
    div.addEventListener("dragover", handleDrag);
    div.addEventListener("drop", handleDrop);

    return () => {
      div.removeEventListener("dragenter", handleDragIn);
      div.removeEventListener("dragleave", handleDragOut);
      div.removeEventListener("dragover", handleDrag);
      div.removeEventListener("drop", handleDrop);
    };
  }, [ref]);

  return (
    <Drop ref={ref} draging={drag}>
      <div>
        {!props.file ? (
          <>
            <a>Select</a>
            <p> or drop your file here </p>{" "}
          </>
        ) : (
          props.file.name
        )}
      </div>
    </Drop>
  );
};

const Drop = styled.div`
  color: #bababc;
  position: relative;
  text-align: center;
  -webkit-transition: ease 0.3s;
  transition: ease 0.3s;

  height: 160px;
  -webkit-transition: -webkit-transform 0.3s ease;
  transition: -webkit-transform 0.3s ease;
  transition: transform 0.3s ease;
  transition: transform 0.3s ease, -webkit-transform 0.3s ease;
  cursor: pointer;
  border: 4px dashed ${(props: any) => (props.draging ? colors.primary : "#bababc")};
  border-radius: 4px;

  display: grid;

  place-items: center;

  padding: 20px;
` as React.FC<any>;

export default DND;
