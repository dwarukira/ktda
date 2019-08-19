import React from "react"
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import colors from "../../../styles/colors";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";



const GetGenderGradeDistribution = gql`
    query GetGenderGradeDistribution {
        genderGradeDistribution {
            grade
            totalOthers
            totalMales
            totalFemales
        }
  }
`

const GenderGradeDistribution = () => {
    const { data, error } = useQuery(GetGenderGradeDistribution)

    if (error) {
        return <> Error </>
    }

    const grades = data.genderGradeDistribution ? data.genderGradeDistribution.map((i: any) => i.grade) : []
    const females = data.genderGradeDistribution ? data.genderGradeDistribution.map((i: any) => i.totalFemales) : []
    const males = data.genderGradeDistribution ? data.genderGradeDistribution.map((i: any) => i.totalMales) : []
    const others = data.genderGradeDistribution ? data.genderGradeDistribution.map((i: any) => i.totalOthers) : []

    const performance: Highcharts.Options = {
        title: {
            text: 'Gender-Grade Distribution'
        },
        chart: {
            zoomType: 'x',
        },

        subtitle: {
            text: `
                This shows the KCSE performance distrubution accross gender by grade, 
            `
        },
       yAxis: {
           title: {
            text:"Students percentage"
           }
       },

        xAxis: {
            categories: grades,
        },
        series: [{
            // pointWidth: 20,
            color: colors.primary,
            name: "Male",
            type: 'column',
            data: males
        },
        {
            // pointWidth: 20,
            name: "Female",
            type: 'column',
            data: females
        },
        {
            // pointWidth: 20,
            name: "Others",
            type: 'column',
            data: others
        }]



    }


    return (
        <>
            <HighchartsReact
                highcharts={Highcharts}
                options={performance}

            />
        </>
    )
}

export default GenderGradeDistribution