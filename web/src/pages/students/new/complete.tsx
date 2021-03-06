import React from "react";
import { withRouter } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import complete from "icons/complete.svg";
import { Title } from "components/text";
import { BeatLoader, SyncLoader } from "react-spinners";
import colors from "styles/colors";
import { StyledFormActions } from "./form";
import Button from "components/Button";

const GET_STUDENT = gql`
  query GetStudent($id: String!) {
    student(id: $id) {
      name
      id
      studentId
    }
  }
`;

const Complete = ({ match, history }: any) => {
  const { data, loading, error } = useQuery(GET_STUDENT, {
    variables: {
      id: match.params.id,
    },
  });

  if (!data || loading || error) {
    return <SyncLoader size={12} margin={2} color={colors.primary} />;
  }

  return (
    <>
      <Title> Add Student </Title>
      <div className="center">
        {data.student ? (
          <>
            <img src={complete} alt="Complete" />

            <h2> Nice {data.student.name} has been setup </h2>

            <h6>
              {data.student.name} has been setup, You can add a new student or
              continue to edit {data.student.name} data on their profile page,
              You can also send message to the student/guardians
            </h6>

            <StyledFormActions>
              <Button
                background={colors.primary}
                color="white"
                onClick={(e: any) =>
                  history.push(`/student/${data.student.studentId}`)
                }
              >
                Explore Student
              </Button>
              <Button onClick={(e: any) => history.push(`/students/new`)}>
                Add another Student
              </Button>
            </StyledFormActions>
          </>
        ) : (
          <BeatLoader color={colors.primary} />
        )}
      </div>
    </>
  );
};

export default withRouter(Complete);
