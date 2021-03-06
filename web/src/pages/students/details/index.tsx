import React from "react";
import { SyncLoader } from "react-spinners";
import { useQuery } from "@apollo/react-hooks";
import {
  Switch,
  Route,
  NavLink,
  useRouteMatch,
  useParams,
  useHistory,
} from "react-router-dom";

import Tab from "components/tabs";
import colors from "styles/colors";
import { GET_STUDENT } from "queries";

import Notes from "../notes";
import Personal from "./personal";
import StudentFee from "./Fee/schoolfee";
import StudentDocuments from "./documents/documents";
import StudentPerformance from "./perfomance/perfomance";
import Button from "components/Button";
import styled from "styled-components";

interface IStudentDetailsTabsProps {
  url: string;
  label: string;
}

const StudentDetailsTab: React.FC<IStudentDetailsTabsProps> = ({
  url,
  label,
}) => {
  return (
    <NavLink to={url}>
      <li> {label} </li>
    </NavLink>
  );
};

const StudentDetails = () => {
  const match = useRouteMatch();
  const history = useHistory();
  const params = useParams<any>();

  const { data, error, loading } = useQuery(GET_STUDENT, {
    variables: {
      id: params.id,
    },
  });

  if (loading) {
    return <SyncLoader size={12} margin={2} color={colors.primary} />;
  }

  if (error) {
    return <React.Fragment>{error.message}</React.Fragment>;
  }

  const studentTabs = [
    {
      url: `${match.url}/personal`,
      label: "Personal",
    },
    {
      url: `${match.url}/fee`,
      label: "Fees",
    },
    {
      url: `${match.url}/perfomance`,
      label: "Perfomance",
    },
    {
      url: `${match.url}/documents`,
      label: "Documents",
    },

    {
      url: `${match.url}/notes`,
      label: "Notes",
    },
  ];
  return (
    <>
      <Header>
        <LinkBack
          onClick={() => {
            history.push("/students");
          }}
        >
          {"< Back"}
        </LinkBack>
        <h2> {data.student ? data.student.name : ""}</h2>
      </Header>

      <Tab>
        {studentTabs.map((tab) => (
          <StudentDetailsTab label={tab.label} url={tab.url} key={tab.label} />
        ))}
      </Tab>

      <Switch>
        <Route exact path={`${match.path}`} component={Personal} />
        <Route exact path={`${match.path}/personal`} component={Personal} />
        <Route exact path={`${match.path}/fee`} component={StudentFee} />

        <Route
          exact
          path={`${match.path}/perfomance`}
          component={StudentPerformance}
        />
        <Route
          exact
          path={`${match.path}/documents`}
          component={StudentDocuments}
        />
        <Route exact path={`${match.path}/notes`} component={Notes} />
      </Switch>
    </>
  );
};

const Header = styled.div`
  display: flex;
  align-items: inherit;

`;


const LinkBack = styled.a`
  padding: 8px;
`;

export default StudentDetails;
