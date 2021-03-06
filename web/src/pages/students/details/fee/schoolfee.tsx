import React, { useState } from "react";
import styled from "@emotion/styled";
import { useQuery } from "@apollo/react-hooks";
import { useHistory, useParams, useRouteMatch } from "react-router";

import { Row, Col } from "react-grid-system";
import Card from "components/Card";
import StyledTable from "components/table";
import add from "icons/add.svg";
import Modal from "components/modal";

import { getCash } from "utils";
import AddSchoolFee from "./addSchoolFee";
import { GET_DETAILED_STUDENT } from "queries";
import { SyncLoader } from "react-spinners";
import colors from "styles/colors";

const SchoolFeeTable = ({ fee }: any) => {
  const feeList = fee?.map((f: any) => (
    <tr key={f.id}>
      <td>
        <h6>
          {new Intl.NumberFormat("en-KE", {
            style: "currency",
            currency: "KSH",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(f.ammount)}
        </h6>
      </td>
      <td> {f.term} </td>
      <td> {f.year} </td>
      <td> {f.form} </td>
    </tr>
  ));

  return (
    <StyledTable>
      <thead>
        <tr>
          <th> Amount </th>
          <th> Term </th>
          <th> Year </th>
          <th> Form </th>
        </tr>
      </thead>
      <tbody>{feeList}</tbody>
    </StyledTable>
  );
};

const StudentFee = () => {
  const history = useHistory();
  const params = useParams<any>();

  const [open, setOpen] = useState<boolean>();

  const { data, loading, refetch } = useQuery(GET_DETAILED_STUDENT, {
    variables: {
      id: params.id,
    },
  });

  if (loading) {
    return <SyncLoader size={12} margin={2} color={colors.primary} />;
  }

  return (
    <React.Fragment>
      <Modal show={open} handleClose={setOpen}>
        <AddSchoolFee toggleOpen={setOpen} student={params.id } refetch={refetch} />
      </Modal>
      <h3> Fee Payments </h3>
      <Row>
        <Col sm={8}>
          <SchoolFeeTable history={history} fee={data?.student?.fee} />
        </Col>

        <Col>
          <Card>
            <Add onClick={() => setOpen(true)}>
              <img src={add} alt="add a student" />
              <div className="title">
                <span>Make Payment</span>
              </div>
            </Add>
          </Card>

          <Card>
            <h2> Total Spent on student </h2>
            <h3>
              <a>{data?.student ? getCash(data?.student?.totalSpent) : ""}</a>
            </h3>
          </Card>
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

export default StudentFee;
