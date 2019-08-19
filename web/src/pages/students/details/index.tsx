import React from "react";
import Tab from "../../../components/tabs";
import Personal from "./personal";
import StudentFee from "./fee/schoolfee";
import StudentPerformance from "./perfomance/perfomance";
import { Switch, Route, withRouter, NavLink } from "react-router-dom";
import StudentDocuments from "./documents/documents";
import Notes from "../notes";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_STUDENTS = gql`
    query GetStudent($id: String!) {
        student(id: $id) {
            name
            id
            studentId

           
            
        }
    }
`

const StudentDetails = ({ match }: any) => {
    const { data, error, loading } = useQuery(GET_STUDENTS, {
        variables: {
            id: match.params.id,
            
        },
       
    })


    return (
        <>
            <h2> { data.student ? data.student.name: "" }</h2>
            <Tab>
                <NavLink to={`${match.url}`}><li> Personal </li> </NavLink>
                <NavLink to={`${match.url}/fee`}><li> Fees </li> </NavLink>
                <NavLink to={`${match.url}/perfomance`}><li> Perfomance </li> </NavLink>
                <NavLink to={`${match.url}/documents`}><li> Documents </li> </NavLink>
                <NavLink to={`${match.url}/notes`}><li> Notes </li> </NavLink>
                <li> Photos </li>
            </Tab>

            <Switch>
                <Route exact path={`${match.path}/`} component={Personal} />
                <Route exact path={`${match.path}/fee`} component={StudentFee} />
                <Route  exact path={`${match.path}/perfomance`} component={StudentPerformance} />
                <Route  exact path={`${match.path}/documents`} component={StudentDocuments} />
                <Route  exact path={`${match.path}/notes`} component={Notes} />
            </Switch>
            {/* <Personal /> */}
            {/* <StudentFee />
            <StudentPerformance /> */}
        </>
    )
}


export default withRouter(StudentDetails)