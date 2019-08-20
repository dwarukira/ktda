import React, { useState } from "react";
import { withRouter } from "react-router";
import StyledTable from "../../../../components/table";
import {  Row, Col } from "react-grid-system";
import Card from "../../../../components/card";

import add from "../../../../icons/add.svg"
import styled from "@emotion/styled";
import Modal from "../../../../components/modal";
import AddSchoolPerformance from "./addPerfomance";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Linegraph from "../../../../components/graph/linegraph";
import StudentLinegraph from "../../../../components/graph/studentlinegraph";


const GET_DETAILED_STUDENTS = gql`
    query GetDetailedStudent($id: String!) {
        student(id: $id) {
            name
            id
            studentId
            performance {
                id
                grade
                year
                term
                form
            }
            
            school {
                phone
                address
                email
                name
            }
        }
    }
`


const GET_PERFORMANCE_STUDENT = gql`
    query StudentTrends($id: String!){
        studentTrends(id: $id) {
            markValue
            term
        }
    }
`


const SchoolPerformanceTable = ({history, performance}: any) => {
    const performanceList  = performance.map((p: any) => (
        <tr key={p.id} > 
            <td> <h6> { p.grade } </h6> </td>
            <td>  { p.term } </td>
            <td>  { p.year } </td>    
            <td>  { p.form } </td>     
        </tr>
    ))
    return (
        <StyledTable>
                <thead>
                    <tr>
                        <th> Grade </th>
                        <th> Term </th>
                        <th> Year </th>
                        <th> Form </th>
                    </tr>
                </thead>
                <tbody>
                    { performanceList }
                </tbody>

        </StyledTable>
    )
}

const StudentPerformance = ({ history, match }: any) => {
    const [ open , setOpen ] = useState()

    const { data, loading, error } = useQuery(GET_DETAILED_STUDENTS, {
        variables: {
            id: match.params.id
        }
    })

    const { data: performance, loading: performance_loading, error: performance_error } = useQuery(GET_PERFORMANCE_STUDENT, {
        variables: {
            id: match.params.id
        }
    })


    console.log(performance, "----->");
    
    if(loading) {
        return <> Loading .. </>
    }

    if(error) {
        return <> Ops .. </>
    }

    const sortPData = performance.studentTrends  ? performance.studentTrends.sort((a: any, b: any) => +a.term - +b.term) : []

    
    const  performanceData = sortPData ?  sortPData.map((v: any) => +v.markValue) : [] 

    const categories = sortPData ? sortPData.map((v: any) => v.term) : [] 

    
    return (
        <>
            <Modal show={open} handleClose={setOpen}>
                <AddSchoolPerformance toggleOpen={setOpen} student={match.params.id}   />
            </Modal>
            <h3> Student Performance </h3>
            <Row>
                <Col sm={6}>
                    <SchoolPerformanceTable
                        history={history}
                        performance={data.student.performance}
                          
                    />
                </Col>

                <Col>
                    <Card>
                            <Add  onClick={() => setOpen(true)}>
                                <img src={add} alt="add a student" />
                                <div className="title">
                                    <span>
                                        Add Performance
                                    </span>
                                </div>
                            </Add>
                        </Card>

                           <StudentLinegraph 
                                data={performanceData}
                                categories={categories}
                           />
                        <Card>
                           
                        </Card>
                
                </Col>
            </Row>
            
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

export default withRouter(StudentPerformance)