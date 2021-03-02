import styled from "styled-components";
import colors from "../../styles/colors";
import { useState, useRef, useEffect } from "react";
import React from "react";
import Fuse from "fuse.js";
import { Col } from "react-grid-system";
import { WithError } from "../../pages/students/new";

export const DropdownInput = (props: any) => {
  const [selectedOption, setSelectedOption] = useState(props.initalValue);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const { options } = props;

  const [op, setOps] = useState(options);

  useEffect(() => {
    setOps(options);
  }, [options]);

  const handleChange = (e: any) => {
    setSelectedOption(e.target.value);

    const confoptions: Fuse.IFuseOptions<any> = {
      keys: [],
      // tokenize: true,
      // matchAllTokens: true,
      // findAllMatches: true,
    };

    console.log(e.target.value.length, "ok");

    if (e.target.value.length === 1 || e.target.value.length === 0) {
      setOps(options);

      return;
    }

    const fuse = new Fuse(options, confoptions);

    const keys = fuse.search(selectedOption);

    let op = keys.map(function (key: any) {
      return options[key];
    });

    setOps(op);
  };

  const handleOnFocus = (e: any) => {
    setIsOpen(true);
  };

  const handleClickOutside = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref]);

  return (
    <StyledDropdown ref={ref}>
      <StyledInput
        onFocus={handleOnFocus}
        value={selectedOption}
        onChange={handleChange}
        ref={props.register}
        {...props}
      />
      <span></span>
      {isOpen ? (
        <Dropdown>
          {op
            ? op.map((option: any) => {
                return (
                  <li
                    key={option}
                    onClick={(e) => {
                      setSelectedOption(option);
                      setIsOpen(false);
                    }}
                  >
                    {" "}
                    {option}
                  </li>
                );
              })
            : ""}
        </Dropdown>
      ) : (
        ""
      )}
    </StyledDropdown>
  );
};

const StyledTip = styled.span`
  font-size: 14px;
  line-height: 20px;
  background-color: #ffffff;
  position: absolute;

  right: 0;
  top: 0;
  left: 10px;

  z-index: 10;

  color: #6c6c72;
  padding-left: 24px;

  text-align: left;
`;

const Tip = ({ tip }: any) => {
  if (!tip) return null;
  return (
    <StyledTip>
      <i className="fas fa-info-circle"></i>
      <span> {tip}</span>
    </StyledTip>
  );
};

export const InputStyle = styled.div`
  .tip {
    display: none;
  }
  &:hover {
    .tip {
      display: block;
    }
  }
` as React.FC<any>;

export const TextArea = (props: any) => {
  return (
    <>
      <Col sm={2}>
        <label> {props.label} </label>
      </Col>
      <Col sm={6}>
        <WithError>
          {props.dropdown ? (
            <DropdownInput {...props} register={props.register} />
          ) : (
            <StyledTextArea {...props} ref={props.register} />
          )}
          {props.error && (
            <span>
              <i className="fas fa-info-circle"></i>
              Field is required
            </span>
          )}
        </WithError>
      </Col>
      <Col sm={4} className="tip">
        {" "}
        <Tip tip={props.tip} />{" "}
      </Col>
    </>
  );
};

const StyledTextArea = styled.textarea`
  background-color: ${colors.white};
  border: none;

  box-shadow: 0 0 0 1.5px
    ${(props: any) => (props.error ? "#d5351f" : "#919197")} inset;
  border-radius: 4px;
  color: ${(props: any) => (props.error ? "#d5351f" : "##919197")};
  font-size: 1em;
  font-weight: 400;
  line-height: 22px;

  padding: 10px 10px 3px;
  transition: border 0.2s linear 0s;

  width: 100%;

  ::placeholder {
    color: ${(props: any) => (props.error ? "#d5351f" : "##1c1c1c")};
  }
  box-sizing: content-box;

  &:focus {
    box-shadow: 0 0 0 2px
      ${(props: any) => (props.error ? "#d5351f" : colors.primary)} inset;

    outline: none;
  }
`;

const StyledDropdown = styled.div`
  position: relative;
  min-height: 1px;

  span {
    content: " ";
    border-color: #919197 transparent transparent;
    border-style: solid;
    border-width: 5px 5px 0;
    display: block;
    height: 0;
    position: absolute !important;
    right: 10px;
    top: 14px;
    width: 0;
    cursor: pointer;

    top: 20px;
    border-color: #0a8080 transparent transparent;
    border-width: 4px 4px 0;
  }
`;

const Dropdown = styled.ul`
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  background-color: #ffffff;
  border: 1px solid #dcdcdc;
  border-top-color: #f4f4f3;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  margin-top: -1px;
  max-height: 200px;
  position: absolute;
  top: 100%;

  z-index: 1000;

  max-height: 198px;
  overflow-y: auto;

  border: none;
  left: 0;
  right: -20px;
  top: 48px;
  margin-top: 0px;

  padding: 4px;
  box-shadow: 0px 0px 0px 2px #0a8080 inset;

  text-align: left;

  li {
    font-size: 14px;
    line-height: 20px;
    box-sizing: border-box;
    color: #525257;
    cursor: pointer;
    display: block;
    padding: 12px;
    border-top: 1px solid #eaeaea;

    &:hover {
      background-color: ${colors.primaryLight};
    }
  }
`;

const StyledInput = styled.input`
  background-color: ${colors.white};
  border: none;

  box-shadow: 0 0 0 1.5px
    ${(props: any) => (props.error ? "#d5351f" : "#919197")} inset;
  border-radius: 4px;
  color: ${(props: any) => (props.error ? "#d5351f" : "##919197")};
  font-size: 1em;
  font-weight: 400;
  line-height: 22px;
  height: 44px;
  padding: 3px 10px 3px;
  transition: border 0.2s linear 0s;

  width: 100%;

  ::placeholder {
    color: ${(props: any) => (props.error ? "#d5351f" : "##1c1c1c")};
  }
  box-sizing: content-box;

  &:focus {
    box-shadow: 0 0 0 2px
      ${(props: any) => (props.error ? "#d5351f" : colors.primary)} inset;

    outline: none;
  }
` as React.FC<any>;

export const StyledSelect = styled.select`
  background: ${colors.white};
  border: none;

  box-shadow: 0 0 0 1.5px
    ${(props: any) => (props.error ? "#d5351f" : "#919197")} inset;
  border-radius: 4px;
  color: ${(props: any) => (props.error ? "#d5351f" : "##919197")};
  font-size: 1em;
  font-weight: 400;
  line-height: 22px;
  height: 44px;
  padding: 3px 10px 3px;
  transition: border 0.2s linear 0s;

  box-sizing: content-box;
  width: 100%;

  ::placeholder {
    color: ${(props: any) => (props.error ? "#d5351f" : "##1c1c1c")};
  }

  &:focus {
    box-shadow: 0 0 0 2px
      ${(props: any) => (props.error ? "#d5351f" : colors.primary)} inset;

    outline: none;
  }
` as React.FC<any>;

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;
// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
// const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
//   border: 0;

// //   clip: rect(0 0 0 0);
//   clip-path: inset(50%);
// //   height: 1px;

//   background: blue;
//   margin: -1px;
//   overflow: hidden;
//   padding: 0;
//   position: absolute;
//   white-space: nowrap;
//   width: 10px;

//   z-index: 100;
// `

const StyledCheckbox = styled.div`
  display: block;
  width: 16px;
  height: 16px;
  background: ${(props: any) =>
    props.checked ? colors.primary : colors.white};
  border-radius: 4px;
  transition: all 150ms;

  border: 1px solid ${colors.primary};

  position: relative;

  &:hover {
    box-shadow: 0 0 0 4px #f3fafb;
  }

  ${Icon} {
    visibility: ${(props: any) => (props.checked ? "visible" : "hidden")};
  }
` as React.FC<any>;

export const Checkbox = ({ className, checked, ...props }: any) => {
  console.log({ ...props }, checked);

  return (
    <CheckboxContainer className={className}>
      {/* <HiddenCheckbox checked={checked} {...props} /> */}
      <StyledCheckbox checked={checked} {...props}>
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
  );
};
export default StyledInput;
