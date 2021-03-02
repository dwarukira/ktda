import React from "react";
import styled from "styled-components";
import server_error from "../../icons/server_error.svg"

const Error = () => {
    return (
        <Center>
            <h3> <a> Oops 😭😭😭😭😭😭😭  </a> </h3>
            <ErorrPage src={server_error} alt="" />
        </Center>
    )

   
}


const ErorrPage = styled.img`
    width: 100%;
    height: 100%;
    margin-top: 8px;
`

const Center = styled.div`
    display: grid;
    place-items: center;
`

export default Error