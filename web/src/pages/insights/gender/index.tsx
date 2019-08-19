import React from "react"
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import colors from "../../../styles/colors";

const GetGenderParity = gql`
    query GenderParity {
        genderParity {
            totalMales
            totalFemales
            totalOthers
        }
    }
`

const GenderParity = () => {
    const { data, error } = useQuery(GetGenderParity)

    if (error) {
        return <> Error </>
    }


    const generalGender: Highcharts.Options = {
        title: {
            text: 'General Gender Parity'
        },

        subtitle: {
            text: `Sociable formerly six but handsome. Up do view time they shot. He concluded disposing provision by questions as situation`
        },

        chart: {
            type: "pie"
        },


        series: [
            {

                type: 'pie',

                data: [{
                    name: 'Female',
                    y: data.genderParity ? data.genderParity.totalFemales : 0,
                    color: "#95CEFF",

                },
                {
                    name: 'Male',
                    y: data.genderParity ? data.genderParity.totalMales : 0,
                    color: colors.primary


                },
                {
                    name: 'Other',
                    y: data.genderParity ? data.genderParity.totalOthers : 0,

                }
                ]
            }

        ]
    }


    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={generalGender}

        />
    )
}

export default GenderParity