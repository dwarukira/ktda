import React, { useState } from "react";
import { withRouter } from "react-router";
import StyledTable from "../../../../components/table";
import { Row, Col } from "react-grid-system";
import Card from "../../../../components/card";

import add from "../../../../icons/add.svg"
import styled from "@emotion/styled";
import Modal from "../../../../components/modal";
import AddSchoolFee from "./addSchoolFee";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { getCash } from "../../../../utils";


const GET_DETAILED_STUDENTS = gql`
    query GetDetailedStudent($id: String!) {
        student(id: $id) {
            name
            id
            studentId

            totalSpent
            fee {
                id
                ammount
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

const SchoolFeeTable = ({ history, fee }: any) => {



    const feeList = fee.map((f: any) => (
        <tr key={f.id}>
            <td> <h6>  {new Intl.NumberFormat('en-KE', {
                style: 'currency',
                currency: 'KSH',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(f.ammount)} </h6> </td>
            <td> {f.term} </td>
            <td>  {f.year} </td>
            <td>  {f.form} </td>

        </tr>
    ))

    return (
        <StyledTable>
            <thead>
                <tr>
                    <th> Amount </th>
                    <th> Term </th>
                    <th> Year </th>
                    <th> Form </th>

                </tr>
            </thead>
            <tbody>

                {feeList}
            </tbody>

        </StyledTable>
    )
}

const StudentFee = ({ history, match }: any) => {
    const [open, setOpen] = useState()

    const { data } = useQuery(GET_DETAILED_STUDENTS, {
        variables: {
            id: match.params.id
        }
    })

    if (!data.student) {
        return <> Loading .. </>
    }




    return (
        <>
            <Modal show={open} handleClose={setOpen}>
                <AddSchoolFee toggleOpen={setOpen}  student = {match.params.id} />
            </Modal>
            <h3> Fee Payments </h3>
            <Row>
                <Col sm={8}>
                    <SchoolFeeTable
                        history={history}
                        fee={data.student.fee}
                    />
                </Col>

                <Col>
                    <Card>
                        <Add onClick={() => setOpen(true)}>
                            <img src={add} alt="add a student" />
                            <div className="title">
                                <span >
                                    Make Payment
                                    </span>
                            </div>
                        </Add>
                    </Card>


                    <Card>
                        <h2>  Total Spent on student </h2>
                        <h3> <a> { data.student ?  getCash(data.student.totalSpent) : '' } </a> </h3>
                    </Card>

                </Col>
            </Row>

        </>

    )
}


const Add = styled.div`
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

export default withRouter(StudentFee)