import React from "react";
import styled from "@emotion/styled";
import { BeatLoader } from "react-spinners";
import { Row, Col } from "react-grid-system";
import { useHistory } from "react-router-dom";

import { getCash } from "utils";
import colors from "styles/colors";
import Card from "components/Card";
import { Title } from "components/text";

import UniversityTransation from "./UniversityTransation";

import old from "icons/old.svg";
import file from "icons/file.svg";
import cash from "icons/cash2.svg";
import studentIcon from "icons/students.png";
import university from "icons/university.png";
import presentation from "icons/presentation.svg";
import InsightCard from "./components/InsightCard";

interface IProgramInsights {
  data: any;
  loading: boolean;
}

const dataOrLoading = (data: any) =>
  !data ? <BeatLoader color={colors.primary} /> : data;

const ProgramInsights: React.FC<IProgramInsights> = ({ data }) => {
  const history = useHistory();
  const insightData = [
    {
      label: "Sponsored Students",
      data: dataOrLoading(data ? data.totalStudents : false),
      icon: studentIcon,
    },

    {
      label: "Funds Spent",
      data: dataOrLoading(
        data ? getCash(data ? data.totalAmmount : false) : false
      ),
      icon: cash,
    },
    {
      label: "Alumin",
      data: dataOrLoading(data ? data.totalAlumni : false),
      icon: old,
    },
    {
      label: "University Transation",
      data: dataOrLoading(data ? data.totalUniversityTransation : false),
      icon: university,
    },
  ];
  return (
    <React.Fragment>
      <Title> Program Insights </Title>
      <Grid>
        {insightData.map((insight) => (
          <InsightCard {...insight} />
        ))}
      </Grid>

      <Row>
        <Col md={6}>
          <Headers> Thing's you can do. </Headers>
          <Actions>
            <Card
              className="card"
              onClick={() => {
                history.push("/students/new");
              }}
            >
              <img src={file} alt="" />
              <h2> Update student data. </h2>
              <p> Fill the data for new students. </p>
              <div className="footer"></div>
            </Card>

            <Card
              className="card"
              onClick={(e: any) => {
                history.push("/insights");
              }}
            >
              <img src={presentation} alt="" />
              <h2> View Insights </h2>

              <p>
                Understant the state of the program. View how the students are
                performing.{" "}
              </p>

              <div className="footer"></div>
            </Card>
          </Actions>
        </Col>

        <Col md={6}>
          <Headers> What's Happening </Headers>
          <UniversityTransation />
        </Col>
      </Row>
    </React.Fragment>
  );
};

const Actions = styled.div`
  img {
    width: 50px;
    height: 50px;
  }
`;

const Headers = styled.h3`
  padding: 25px 0px 25px 0px;
`;

// TODO add media query
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
`;

export default ProgramInsights;
