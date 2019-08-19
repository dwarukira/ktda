import React from "react"
import Details from "./details";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { withRouter } from "react-router";
import { dataOrNone } from "../../../utils";

const GET_DETAILED_STUDENTS = gql`
    query GetDetailedStudent($id: String!) {
        student(id: $id) {
            name
            id
            studentId
            courseTaken
            guardianContact
            gender
            contact
            kcseIndex
            kcpe
            kcse
            year
    
            factory {
                name
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

const Personal  = ({ match }: any) =>  {
    const { data, error, loading } = useQuery(GET_DETAILED_STUDENTS, {
        variables: {
            id: match.params.id
        }
    })

    if(error) {
        return <p> Eroro </p>
    }

    if(loading) {
        return <p> Loading ... </p>
    }
    const { student } = data

    if(!student) {
        return <p> Loading ... </p>
    }
    return (
        <>

    

        <Details title="Basic" data={[
            {
                "name":"Full name",
                "value":`${student.name}`
            },
            {
                "name":"Sex",
                "value":`${student.gender}`   
            },
            {
                "name":"Factory",
                "value":`${student.factory.name}`   
            },
            {
                "name":"Contact",
                "value":`${dataOrNone(student.contact)}`
            },
            {
                "name":"Gaudian Contact",
                "value":`${student.guardianContact}`
            },

            {
                "name":"KCPE",
                "value":`${dataOrNone(student.kcpe)}`
            },
            {
                "name":"KCSE",
                "value":`${dataOrNone(student.kcse)}`
            },

            {
                "name":"Year",
                "value":`${dataOrNone(student.year)}`
            },

        ]} />

        <Details title="School Details" data={[
            {
                "name":"School Name",
                "value":`${student.school.name}`
            },
            {
                "name":"Form",
                "value":"1"   
            },
            {
                "name":"Contact",
                "value":`${student.school.phone}  ` 
            },
            {
                "name":"Address",
                "value":   `${student.school.address}  `   
            },

            {
                "name":"Index number",
                "value":`${dataOrNone(student.kcseIndex)}`
            }

          
           
        ]} />


    
        </>
    )

}


export default  withRouter(Personal)