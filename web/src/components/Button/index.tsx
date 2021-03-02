import React from "react";
import styled from "@emotion/styled";
import colors from "../../styles/colors";

interface IButtonProps {
    background: string
    color: string
    
}

const Button = styled.button`

    width: auto;
    display: inline-block;
    margin-right: 10px;


    font-size: 16px;
    line-height: 20px;
    background: white;
    border: 1.5px solid ${colors.primary};
    border-radius: 4px;
    color: ${colors.primary};
    cursor: pointer;
    display: inline-block;
    font-weight: 600;
    height: initial;
    margin-bottom: 1em;
    margin-top: 1em;
    padding: 13px 40px 11px;
    text-align: center;
   
    transition: background-color 0.3s ease, -webkit-box-shadow 0.1s ease;
    transition: background-color 0.3s ease, box-shadow 0.1s ease;
    transition: background-color 0.3s ease, box-shadow 0.1s ease, -webkit-box-shadow 0.1s ease;
   
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;

    background-color: ${(props: any) => props.background ? props.background : colors.white};
    color: ${props => props.color ? props.color : colors.primary};

    outline: none;

    &:focus {
        outline: none;

    }
` as React.FC<any>



export default Button;