import React from "react";
import Highcharts from "highcharts";
import { SyncLoader } from "react-spinners";
import { useQuery } from "@apollo/react-hooks";
import HighchartsReact from "highcharts-react-official";

import colors from "styles/colors";
import { GetGenderParity } from "queries";

const GenderParity = () => {
  const { data, error, loading } = useQuery(GetGenderParity);

  if (loading) {
    return (
      <React.Fragment>
        <SyncLoader size={12} margin={2} color={colors.primary} />
      </React.Fragment>
    );
  }

  if (error) {
    return <> {error.message} </>;
  }

  const generalGender: Highcharts.Options = {
    title: {
      text: "Gender Gap",
    },

    subtitle: {
      text: `This shows the number of students sponsored by gender`,
    },

    chart: {
      type: "pie",
    },

    series: [
      {
        type: "pie",

        data: [
          {
            name: "Female",
            y: data.genderParity ? data.genderParity.totalFemales : 0,
            color: "#95CEFF",
          },
          {
            name: "Male",
            y: data.genderParity ? data.genderParity.totalMales : 0,
            color: colors.primary,
          },
          {
            name: "Other",
            y: data.genderParity ? data.genderParity.totalOthers : 0,
          },
        ],
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={generalGender} />;
};

export default GenderParity;
