import React, { useState } from "react";
import { Container, Row, Col } from "react-grid-system";
import styled from "@emotion/styled";
import Modal from "../../../components/modal";
import Button from "../../../components/Button";
import Edit from "./edit";

const StyledDetails = styled.div`
    
    table {
        width: 100%;
        max-width: 100%;
        border: none;
        margin-bottom: 0;
        font-variant-numeric: tabular-nums;

        td {
            text-align: left;
            
            width: 35%;
            padding: 4px 8px 15px;
        }

        td:first-of-type {
            text-align: right;
            color: #919197;
        }
    }

   
`

const Detail = ({ data }: any) => {

    const list = data.map((item: any) => (
        <tr key={item.name}>
            <td>{item.name}</td>
            <td>{item.value}</td>
        </tr>
    ))

    return (
        <StyledDetails>
            <table>
                <tbody>
                    {list}
                </tbody>
            </table>
        </StyledDetails>
    )
}


const Details = ({ title, data }: any) => {
    const [show, setShow] = useState(false)
    return (
        <article>
            <h3> {title} </h3>
            <Modal show={show}>

                <Edit setOpen={setShow} />

                
            </Modal>
           
                <Row>
                    <Col sm={6} className="left"> <Detail data={data}></Detail> </Col>
                    <Col> <EditButton onClick={(e: any) => setShow(!show)}> <i className="fas fa-pen"></i> edit </EditButton>  </Col>
                </Row>
            
        </article>
    )
}


const EditButton = styled.button`
    
    font-size: 16px;
    line-height: 20px;
    border-radius: 4px;

    
    font-weight: 600;
    height: initial;
    margin-bottom: 1em;
    margin-top: 1em;


    display: inline-block;
    border: none;
    background: transparent;
    text-decoration: none;
    text-align: left;
    
    padding: 0;
    transition: color 125ms ease-in-out;
    color: #0a8080;
    cursor: pointer;

    
    `

export default Details