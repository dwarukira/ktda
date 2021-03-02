import React from "react";
import { Waypoint } from "react-waypoint";
import { SyncLoader } from "react-spinners";

import StyledTable from "../../components/table";
import { withRouter } from "react-router";
import colors from "../../styles/colors";

const StudentList = ({
  history,
  students,
  fetchMore,
  nextPage,
  networkStatus,
  filter,
}: any) => {
  const studentsList = students.map((student: any, i: number) => (
    <React.Fragment key={student.studentId}>
      {i === students.length - 1 && (
        <Waypoint
          onEnter={() => {
            fetchMore({
              variables: {
                page: nextPage,
                f: filter,
              },

              updateQuery: (pv: any, { fetchMoreResult }: any) => {
                console.log(fetchMoreResult);

                if (!fetchMoreResult) {
                  return pv;
                }

                return {
                  paginatedStudent: {
                    __typename: "StudentPaginatedType",

                    objects: [
                      ...students,
                      ...fetchMoreResult.paginatedStudent.objects,
                    ],
                    nextPage: fetchMoreResult.paginatedStudent.nextPage,
                  },
                };
              },
            });
          }}
          key={student.studentId}
        />
      )}
      <tr onClick={() => history.push(`/student/${student.studentId}`)}>
        <td>
          {" "}
          <h6> {student.name} </h6>{" "}
        </td>
        <td> {student.school.name} </td>
        <td> {student.factory.name} </td>
        <td> {student.year} </td>
      </tr>
    </React.Fragment>
  ));

  return (
    <StyledTable>
      <thead>
        <tr>
          <th> Name </th>
          <th> School </th>
          <th> Factory </th>
          <th> Year </th>
        </tr>
      </thead>

      <tbody>
        {studentsList}
        <tr>
          <td>
            {/* { networkStatus === 3 && <> <SyncLoader /> </> } */}
            <SyncLoader
            //   sizeUnit={"px"}
              size={15}
              color={colors.primary}
              loading={networkStatus === 3}
            />
          </td>
        </tr>
      </tbody>
    </StyledTable>
  );
};

export default withRouter(StudentList);
