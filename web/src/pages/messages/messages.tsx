import React from "react"
import styled from "@emotion/styled";


export const Cards = styled.div`
    min-height: 300px;

    

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 2rem;


    img {
        width: 70px;
        height: 70px;

        display: inline-block;
        
    }

    .card  {
        padding: 30px;
    }

    h2 {
        padding-bottom: 20px !important;
        
        color: #525257 !important;
        text-align: left;
        cursor: pointer;


        margin-top: 10px !important;

        font-size: 21px;
        line-height: 27px;
    }

    .footer {
        padding-top: 20px;
        margin-top: auto;
    }
`