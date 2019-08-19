import styled from "@emotion/styled";
import colors from "../../styles/colors";
import { useState, useRef, useEffect } from "react";
import React from "react";
import Fuse from "fuse.js";

export const DropdownInput = (props: any) => {
    const [selectedOption, setSelectedOption] = useState(props.initalValue)
    const [isOpen, setIsOpen] = useState(false)
    const ref = useRef<HTMLInputElement>(null)

    const { options } = props

    
    const [ op, setOps ] = useState(options)

    useEffect(() => {
        setOps(options)
    }, [options])

   
    const handleChange = (e: any) => {
        setSelectedOption(e.target.value)

        const confoptions: Fuse.FuseOptions<any> = {
            keys: [],
            tokenize: true,
            matchAllTokens: true,
            findAllMatches: true,
          };

          console.log(e.target.value.length, "ok");
          
        if(e.target.value.length === 1 || e.target.value.length === 0) {
            setOps(options);

            return;
        }

        const fuse = new Fuse(options, confoptions)

        const keys = fuse.search(selectedOption)

        let op = keys.map(function(key: any) {
            return options[key];
          })

        setOps(op);
       


    }

    const handleOnFocus = (e: any) => {
        setIsOpen(true)
    }

    const handleClickOutside = (e: any) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [ref])

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
            {isOpen ? <Dropdown>
                {op ? op.map((option: any) => {
                    return <li key={option} onClick={e => {
                        setSelectedOption(option)
                        setIsOpen(false)

                    }}> {option}</li>
                }) : '' }


            </Dropdown> : ''}
        </StyledDropdown>
    )
}


const StyledDropdown = styled.div`

    position: relative;
    min-height: 1px;

   
    span {
        content: ' ';
        border-color: #919197 transparent transparent;
        border-style: solid;
        border-width: 5px 5px 0;
        display: block;
        height: 0;
        position: absolute;
        right: 10px;
        top: 14px;
        width: 0;
        cursor: pointer;

        top: 20px;
        border-color: #0a8080 transparent transparent;
        border-width: 4px 4px 0;
    }
`


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
`


const StyledInput = styled.input`

    background-color: ${colors.white};
    border: none;

    box-shadow: 0 0 0 1.5px ${props => props.error ? '#d5351f' : '#919197'  } inset;
    border-radius: 4px;
    color: ${props => props.error ? '#d5351f' : '##919197'  };
    font-size: 1em;
    font-weight: 400;
    line-height: 22px;
    height: 44px;
    padding: 3px 10px 3px;
    transition: border 0.2s linear 0s;

    width: 100%;

    ::placeholder {
        color: ${props => props.error ? '#d5351f' : '##1c1c1c'  };
    }
    box-sizing:content-box;

    &:focus {
        box-shadow: 0 0 0 2px ${props => props.error ? '#d5351f' : colors.primary  } inset;


        outline: none
    }
` as React.FC<any>



export const StyledSelect = styled.select`

    background: ${colors.white};
    border: none;

    box-shadow: 0 0 0 1.5px ${props => props.error ? '#d5351f' : '#919197'  } inset;
    border-radius: 4px;
    color: ${props => props.error ? '#d5351f' : '##919197'  };
    font-size: 1em;
    font-weight: 400;
    line-height: 22px;
    height: 44px;
    padding: 3px 10px 3px;
    transition: border 0.2s linear 0s;

    box-sizing:content-box;
    width: 100%;

    ::placeholder {
        color: ${props => props.error ? '#d5351f' : '##1c1c1c'  };
    }


    &:focus {
        box-shadow: 0 0 0 2px ${props => props.error ? '#d5351f' : colors.primary  } inset;


        outline: none
    }
` as React.FC<any>


export default StyledInput