import React from "react";
import { SyncLoader } from "react-spinners";
import { useQuery } from "@apollo/react-hooks";

import colors from "styles/colors";
import { GetUniversityTransation } from "queries";
import Linegraph from "components/graph/linegraph";

const UniversityTransation = () => {
  const { data, loading, error } = useQuery(GetUniversityTransation);

  if (loading) {
    return (
      <React.Fragment>
        <SyncLoader size={12} margin={2} color={colors.primary} />
      </React.Fragment>
    );
  }

  if (error) {
    return (
      <React.Fragment>{`${error?.message
        ?.charAt(0)
        ?.toUpperCase()}${error?.message?.slice(1)}`}</React.Fragment>
    );
  }

  const { universityTransation } = data;

  const categories = universityTransation.map((i: any) => {
    return i.year;
  });

  const d = universityTransation.map((i: any) => {
    return i.total;
  });

  return <Linegraph categories={categories} data={d} />;
};

export default UniversityTransation;
