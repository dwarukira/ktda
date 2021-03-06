import React, { useState } from "react";
import StyledTable from "components/table";
import { Row, Col } from "react-grid-system";
import Card from "components/Card";

import add from "icons/add.svg";
import styled from "@emotion/styled";
import Modal from "components/modal";
import AddSchoolPerformance from "./addPerfomance";
import { useQuery } from "@apollo/react-hooks";
import StudentLinegraph from "components/graph/studentlinegraph";
import { SyncLoader } from "react-spinners";
import colors from "styles/colors";
import { GET_DETAILED_STUDENT, GET_PERFORMANCE_STUDENT } from "queries";
import { useHistory, useParams } from "react-router-dom";

const SchoolPerformanceTable = ({ performance }: any) => {
  const performanceList = performance?.map((p: any) => (
    <tr key={p.id}>
      <td>
        {" "}
        <h6> {p.grade} </h6>{" "}
      </td>
      <td> {p.term} </td>
      <td> {p.year} </td>
      <td> {p.form} </td>
    </tr>
  ));
  return (
    <StyledTable>
      <thead>
        <tr>
          <th> Grade </th>
          <th> Term </th>
          <th> Year </th>
          <th> Form </th>
        </tr>
      </thead>
      <tbody>{performanceList}</tbody>
    </StyledTable>
  );
};

const StudentPerformance = () => {
  const history = useHistory();
  const params = useParams<any>();

  const [open, setOpen] = useState<boolean>();

  const { data, refetch: refetchStudentDetails, loading, error } = useQuery(
    GET_DETAILED_STUDENT,
    {
      variables: {
        id: params.id,
      },
    }
  );

  const {
    refetch,
    data: performance,
    loading: performance_loading,
    error: performance_error,
  } = useQuery(GET_PERFORMANCE_STUDENT, {
    variables: {
      id: params.id,
    },
  });

  if (!performance?.studentTrends || loading || performance_loading) {
    return <SyncLoader size={12} margin={2} color={colors.primary} />;
  }

  const sortPData = performance?.studentTrends
    ? performance?.studentTrends
        ?.slice()
        .sort((a: any, b: any) => +a?.term - +b?.term)
    : [];

  const performanceData = sortPData
    ? sortPData?.map((v: any) => +v.markValue)
    : [];

  const categories = sortPData ? sortPData?.map((v: any) => v.term) : [];

  console.log(data?.student);
  
  return (
    <React.Fragment>
      <Modal show={open} handleClose={setOpen}>
        <AddSchoolPerformance
          toggleOpen={setOpen}
          student={params.id}
          refetch={() => {
            refetchStudentDetails();
            refetch();
          }}
        />
      </Modal>
      <h3> Student Performance </h3>
      <Row>
        <Col sm={6}>
          <SchoolPerformanceTable
            history={history}
            performance={data?.student?.performance}
          />
        </Col>

        <Col>
          {data?.student?.performance?.length <= 12 && (
            <Card>
              <Add onClick={() => setOpen(true)}>
                <img src={add} alt="add a student" />
                <div className="title">
                  <span>Add Performance</span>
                </div>
              </Add>
            </Card>
          )}

          <StudentLinegraph data={performanceData} categories={categories} />
        </Col>
      </Row>
    </React.Fragment>
  );
};

const Add = styled.div`
  display: flex;
  img {
    width: 40px;
    height: 40px;
    padding-right: 10px;
    color: #0a8080;
  }

  .title {
    align-self: center;
  }
`;

export default StudentPerformance;
