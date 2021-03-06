import React from "react";
import { useQuery } from "@apollo/react-hooks";
import Loader from "react-spinners/BarLoader";

import Error from "components/Error";
import { BasicAnalysis } from "queries";

import ProgramInsights from "./ProgramInsights";

const Dashboard = () => {
  const { data, loading, error } = useQuery(BasicAnalysis);

  if (error) {
    return <Error />;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      <ProgramInsights loading={loading} data={data.basicAnalysis} />
    </React.Fragment>
  );
};

export default Dashboard;
