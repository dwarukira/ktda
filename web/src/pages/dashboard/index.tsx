import React from "react";
import ProgramInsights from "./program_insights";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Error from "../../components/error";


const BasicAnalysis = gql`
    query BasicAnalysis {
        basicAnalysis {
            totalAlumni
            totalAmmount
            totalStudents
            totalUniversityTransation
        }
    }
`

const Dashboard = () => {
    const { data, loading, error } = useQuery(BasicAnalysis)

    if(error) {
        return <> <Error /> </>
    }


    // if(loading) {
    //     return <>  </>
    // }



    return (
        <>
            <ProgramInsights 
                loading={loading}
                data={data.basicAnalysis}

            />
        </>
    )
}

export default Dashboard