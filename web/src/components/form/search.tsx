import React from "react"
import styled from "styled-components";


interface IProps {
    placeholder: string
    onChange(e: React.FormEvent): void
    name: string
    value: any
}

const Search = (props: IProps) => {

    return (
        <SearchContainer>
            <StyledInput {...props} />
            <i className="fas fa-search"></i>
        </SearchContainer>
        
    )
}





const StyledInput =  styled.input`

    background-color: #ffffff;
    border: none;

    box-shadow: 0 0 0 1.5px #919197 inset;
    border-radius: 4px;
    color: #1c1c1c;
    font-size: 1em;
    font-weight: 400;
    line-height: 22px;
    height: 50px;
    padding: 3px 10px 3px;
    transition: border 0.2s linear 0s;


    width: 100%;
    padding-left: 40px;


    &:focus {
        box-shadow: 0px 0px 0px 2px #0a8080 inset;
        outline: none
    }
`


const SearchContainer = styled.div`
    position: relative;
    
    i {
        position: absolute;
        left: 10px;
        top: 15px;
        font-size: 20px;
        color: #dcdcdc;
        pointer-events: none;
    }
`

export default Search