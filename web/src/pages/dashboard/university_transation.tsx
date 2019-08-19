import Linegraph from "../../components/graph/linegraph";
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";


const GetUniversityTransation = gql`
    query UniversityTransation{
        universityTransation {
            year
            total
            
        }
    }
`

const UniversityTransation = () => {
    const { data, loading , error } = useQuery(GetUniversityTransation)


    if(loading) {
        return <> Loading .... </>
    }

    if(error) {
        return <>  Loading .... </>
    }

    const { universityTransation } = data 

    const categories = universityTransation.map((i: any) => {
        return i.year
    })

    const d = universityTransation.map((i: any) => {
        return i.total
    })

   
    return (
        <Linegraph 
            categories={categories}
            data={d}
        />
    )
}

export default UniversityTransation