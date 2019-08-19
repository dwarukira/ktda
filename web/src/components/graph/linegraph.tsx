import React from "react"
import colors from "../../styles/colors";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const Linegraph = ({ categories, data  }: any) => {
    const options: Highcharts.Options = {
        title: {
            text: 'University Transation'
        },
        subtitle: {
            text: `Article nor prepare chicken you him now. Shy merits say advice ten before lovers innate add. She cordially behaviour` 
          },
        xAxis: {
            categories: categories
        },
        series: [{
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