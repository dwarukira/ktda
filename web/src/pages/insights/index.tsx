import React from "react";
import styled from "@emotion/styled";
import { Row, Col } from "react-grid-system";

import GenderParity from "./gender";
import UniversityTransationGender from "./gender/GenderUni";
import UniversityTransation from "../dashboard/UniversityTransation";
import GenderGradeDistribution from "./gender/GenderGradeDistribution";



const Insights = () => {
  return (
    <React.Fragment>
      <StyledInsights>
        <h2> Gender Parity </h2>
        <Row>
          <Col sm={6}>
            <GenderParity />
          </Col>

          <Col sm={6}>
            <GenderGradeDistribution />
          </Col>
        </Row>
      </StyledInsights>

      <StyledInsights>
        <h2> University Insights </h2>
        <Row>
          <Col sm={6}>
            <UniversityTransation />
          </Col>

          <Col sm={6}>
            <UniversityTransationGender />
          </Col>
        </Row>
      </StyledInsights>
    </React.Fragment>
  );
};

const StyledInsights = styled.div`
  padding: 1rem;
  h2 {
    padding-bottom: 2rem;
    padding-left: 2rem;
  }
`;

export default Insights;
