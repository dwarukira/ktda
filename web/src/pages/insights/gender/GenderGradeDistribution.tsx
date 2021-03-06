import React from "react";
import Highcharts from "highcharts";
import { SyncLoader } from "react-spinners";
import { useQuery } from "@apollo/react-hooks";
import HighchartsReact from "highcharts-react-official";

import colors from "styles/colors";
import { GetGenderGradeDistribution } from "queries";

const GenderGradeDistribution = () => {
  const { data, error, loading } = useQuery(GetGenderGradeDistribution);

  if (loading) {
    return (
      <React.Fragment>
        <SyncLoader size={12} margin={2} color={colors.primary} />
      </React.Fragment>
    );
  }
  if (error) {
    return <React.Fragment> {error.message} </React.Fragment>;
  }

  const grades = data?.genderGradeDistribution
    ? data.genderGradeDistribution.map((i: any) => i.grade)
    : [];
  const females = data?.genderGradeDistribution
    ? data.genderGradeDistribution.map((i: any) => i.totalFemales)
    : [];
  const males = data?.genderGradeDistribution
    ? data?.genderGradeDistribution.map((i: any) => i.totalMales)
    : [];
  const others = data.genderGradeDistribution
    ? data?.genderGradeDistribution.map((i: any) => i.totalOthers)
    : [];

  const performance: Highcharts.Options = {
    title: {
      text: "Gender-Grade Distribution",
    },
    chart: {
      zoomType: "x",
    },
    credits: {
      enabled: false,
    },
    subtitle: {
      text: `
                This shows the KCSE performance distrubution accross gender by grade, 
            `,
    },
    yAxis: {
      title: {
        text: "Students percentage",
      },
    },

    xAxis: {
      categories: grades,
    },
    series: [
      {
        // pointWidth: 20,
        color: colors.primary,
        name: "Male",
        type: "column",
        data: males,
      },
      {
        // pointWidth: 20,
        name: "Female",
        type: "column",
        data: females,
      },
      {
        // pointWidth: 20,
        name: "Others",
        type: "column",
        data: others,
      },
    ],
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={performance} />
    </>
  );
};

export default GenderGradeDistribution;
