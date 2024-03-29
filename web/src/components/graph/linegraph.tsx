import React from "react"
import colors from "../../styles/colors";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const Linegraph = ({ categories, data  }: any) => {
    const options: Highcharts.Options = {
        title: {
            text: 'University Transation'
        },
        credits: {
            enabled: false
        },
        subtitle: {
            text: `Students percent that have qualified for the university per year` 
          },
        
          yAxis: {
              title: {
                  text: "Percent students"
              }
          },
        xAxis: {
            categories: categories,
            
            title : {
                text: "Years"
            },
        },
        series: [{
            name: "Students",
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


export default Linegraph