import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import colors from "../../../styles/colors";

const GetUniversityTransationGender = gql`
    query UniversityTransationGender{
        universityTransationGender {
        year
        totalMales
        totalFemales
        totalOthers
        
        }
  }
`

const UniversityTransationGender = () => {
    const { data, error } = useQuery(GetUniversityTransationGender)

    if (error) {
        return <>  Error </>
    }

    const years = data.universityTransationGender ? data.universityTransationGender.map((i: any) => i.year) : []
    const female = data.universityTransationGender ? data.universityTransationGender.map((i: any) => i.totalFemales) : []
    const male = data.universityTransationGender ? data.universityTransationGender.map((i: any) => i.totalMales) : []
    const others = data.universityTransationGender ? data.universityTransationGender.map((i: any) => i.totalOthers) : []



    const options: Highcharts.Options = {

        title: {
            text: 'University Transation and gender'
        },
        subtitle: {
            text: `The number of students who qualified to university every year by gender`
        },
        credits: {
            enabled: false
        },

        xAxis: {
            categories: years
        },
        series: [{
            pointWidth: 20,
            color: colors.primary,
            name: "Male",
            type: 'column',
            data: male
        },
        {
            pointWidth: 20,
            name: "Female",
            type: 'column',
            data: female
        },
        {
            pointWidth: 20,
            name: "Others",
            type: 'column',
            data: others
        }
        ],

    }

    return (
        <>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}

            />
        </>
    )
}


export default UniversityTransationGender