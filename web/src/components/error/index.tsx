import React from "react";
import styled from "styled-components";
import server_error from "../../icons/server_error.svg"

const Error = () => {
    return (
        <Center>
            <h3> <a> Something is not okay </a> </h3>
            <ErorrPage src={server_error} alt="" />
        </Center>
    )

   
}


const ErorrPage = styled.img`

`

const Center = styled.div`
    display: grid;
    place-items: center;
`

export default Error