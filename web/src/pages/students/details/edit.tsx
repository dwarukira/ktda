import React from "react"
import styled from "styled-components";
import Button from "../../../components/Button";

const Edit = ({ setOpen }: any) => {
    return (
        <StyledEdit>
            <p> Hello </p>

            <Button onClick={() => setOpen(false)}> Cancel </Button>
        </StyledEdit>
    )
}

export const StyledEdit = styled.div`
    padding: 3rem;
`

export default Edit