import React from "react"
import colors from "../../styles/colors";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const StudentLinegraph = ({ categories, data  }: any) => {
    const options: Highcharts.Options = {
        title: {
            text: 'Performance Trend'
        },
        subtitle: {
            text: `` 
          },

          credits: {
            enabled: false
        },
        xAxis: {
            categories: categories
        },
        series: [{
            name: "grades",
            color: colors.primary,
            type: 'spline',
            data: data
        },],
        
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


export default StudentLinegraph