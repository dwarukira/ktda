import React, { useState } from "react";
import styled from "@emotion/styled";
import { SyncLoader } from "react-spinners";
import { useQuery } from "@apollo/react-hooks";
import { NavLink, useHistory } from "react-router-dom";

import add from "icons/add.svg";
import colors from "styles/colors";
import Card from "components/Card";
import Error from "components/Error";
import Search from "components/form/search";
import { GET_STUDENTS, GET_TOTAL } from "queries";

import StudentList from "./list";
import StudentsTabs from "./components/Tabs";

const Students = () => {
  const history = useHistory();
  const [filter, setFilter] = useState<string>();
  const [search, setSearch] = useState("");

  const { data, error, fetchMore, networkStatus } = useQuery(GET_STUDENTS, {
    variables: {
      page: 1,
      f: filter,
      search: search,
    },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const { data: totals, error: totalError } = useQuery(GET_TOTAL);

  console.log(error);
  
  if (totalError) {
    return <Error />;
  }

  return (
    <React.Fragment>
      <h1> Students </h1>
      <StudentsTabs totals={totals} onClickTab={setFilter} />
      <PageGrid>
        {!error ? (
          <>
            {data?.paginatedStudent ? (
              <StudentList
                students={data?.paginatedStudent?.objects}
                nextPage={data?.paginatedStudent?.nextPage}
                networkStatus={networkStatus}
                filter={filter}
                fetchMore={fetchMore}
              />
            ) : (
              <SyncLoader
                size={15}
                color={colors.primary}
                loading={!data?.paginatedStudent}
              />
            )}{" "}
          </>
        ) : (
          <p> Not Records found </p>
        )}

        <div>
          <StyledExtra>
            <Search
              placeholder="Search ..."
              onChange={(e: any) => {
                setSearch(e.target.value);
              }}
              name=""
              value={search}
            />
          </StyledExtra>
          <Card onClick={() => history.push("/students/new")}>
            <AddStudent>
              <img src={add} alt="add a student" />
              <div className="title">
                <NavLink to="/students/new">Add Student</NavLink>
              </div>
            </AddStudent>
          </Card>

          <Card>
            <h2>Total Students</h2>
            <h3>
              <a> {totals?.formTotals ? totals?.formTotals?.all : ""} </a>
            </h3>
          </Card>
        </div>
      </PageGrid>
    </React.Fragment>
  );
};

const StyledExtra = styled.div`
  padding-bottom: 20px;
  a {
    width: 100%;
    border-color: "#dcdcd";
    display: block;
    padding-top: 10px;

    transition: color 125ms ease-in-out;
    color: #0a8080;
    cursor: pointer;

    text-decoration: none;
  }
`;

const PageGrid = styled.div`
  display: grid;

  grid-template-columns: 2fr 1fr;
  grid-gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AddStudent = styled.div`
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

export default Students;
