
import React, { useState } from "react";
import { withRouter } from "react-router";
import StyledTable from "../../../../components/table";
import {  Row, Col } from "react-grid-system";
import Card from "../../../../components/card";

import add from "../../../../icons/add.svg"
import styled from "@emotion/styled";
import Modal from "../../../../components/modal";
import UplaodDocument from "./upload";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { getStatus } from "../../../../utils";

const GET_DETAILED_STUDENTS = gql`
    query GetDetailedStudent($id: String!) {
        student(id: $id) {
            name
            id
            studentId

            documents {
                desc
                name
                docType
                id
                document
            }
            
        }
    }
`


const Document = ({ history, documents }: any) => {

    const documentsList = documents.map((document: any) => (
        <tr key={document.id}> 
            <td> <a 
                    href={`http://localhost:8000/media/${document.document}`} 
                    target="blank">  { document.name } </a> </td>
            <td> { getStatus(document.docType) } </td>
            <td> { document.desc } </td>
            <td> <a className="danger"> <i className="far fa-trash-alt"></i> delete </a> </td>
        </tr>
    ))

    return (
        <StyledTable>
                <thead>
                    <tr>
                        <th> Document </th>
                        <th> Status </th>
                        <th> Description </th>

                        <th>  </th>
                      
                    </tr>
                </thead>
                <tbody>
                    { documentsList }
                </tbody>

        </StyledTable>
    )
}

const StudentDocuments = ({ history, match }: any) => {
    const [ open , setOpen ] = useState()

    const { data, loading, error } = useQuery(GET_DETAILED_STUDENTS, {
        variables: {
            id: match.params.id
        }
    })

    if(loading) {
        return <> Loading </> 
    }

    if(error) {
        return <> Error </>
    }

    

    
    return (
        <>
            <Modal show={open} handleClose={setOpen}>
                <UplaodDocument setIsOpen={setOpen} student={data.student? data.student.id : ""} />
            </Modal>
            
           <Padding>
                <h3> Student's Documents </h3>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci in quasi vel eveniet expedita consectetur quae dignissimos ut culpa dolor reprehenderit vitae officiis similique, ducimus eius. Quidem ipsa distinctio veritatis?
                </p>
                <UploadButton onClick={() => setOpen(true)}>
                    
                    <span> Upload Document </span>
                    <img src={add} alt="upload image"/> 
                </UploadButton>


                
            </Padding>
            {
                data.student &&   
                <Row>
                    <Col sm={12}>
                        <Document
                            documents={data.student.documents}
                            history={history}    
                        />
                    </Col>

                    
                </Row>
            }
            
        </>
        
    )
}


const Add= styled.div`
      display: flex;
      img {
          width: 40px;
          height: 40px;
          padding-right: 10px;
          color: #0a8080;
      }



      .title {
          align-self: center;
      }
      
`

const UploadButton = styled.a`
    display: flex;
    flex-direction: row-reverse; 

    span { 
        align-self: center;
    }
    


    img {
        width: 30px;
        height: 30px;
        padding-right: 5px;
        color: #0a8080;
    }
`
const Padding = styled.div`
      padding-bottom: 20px;
`

export default withRouter(StudentDocuments)