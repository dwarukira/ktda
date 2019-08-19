import React from "react"
import styled from "@emotion/styled";
import colors from "../../styles/colors";

const Modal = ({ handleClose, show, children }: any) => {
    return (
        <StyledModal open={show}>
            <ModelContent>
                {children}
                
            </ModelContent>
        </StyledModal>
    );
};



const StyledModal = styled.div`
  
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background: rgba(82, 82, 87, 0.8);
    background-color: rgba(0,0,0,0.3); /* Black w/ opacity */
    

    .close {
        
      }

    display: ${props => props.open ? "block" : "none"} /* Hidden by default */

` as React.FC<any>


const ModelContent = styled.div`
    background-color: #FFFFFF;
    margin: 10% auto; /* 10% from the top and centered */
    padding: 20px;
    background-clip: padding-box;
    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.55);
    border: 1px solid #888;
    width: 50%; 
    border-radius: 4px;
    padding: 0;
    z-index: 1050;
`

export default Modal