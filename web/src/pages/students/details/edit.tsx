import { useMutation } from "@apollo/client";
import { UPDATE_STUDENT } from "queries/students";
import * as React from "react";
import { Row } from "react-grid-system";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import colors from "styles/colors";
import { grades, range } from "utils";
import Button from "../../../components/Button";
import { Input } from "../new";
import Form, { StyledFormActions } from "../new/form";

const Edit = ({ setOpen, student, refetch }: any) => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      name: student?.name,
      contact: student?.contact,
      gender: student?.gender,
      kcse: student?.kcse,
      kcpe: student?.kcpe,
      year: student?.year,
      guardianContact: student?.guardianContact,
    },
  });
  const [updateStudent] = useMutation(UPDATE_STUDENT, {
    onCompleted: ({ student }) => {
      refetch();
      setOpen(false);
    },
  });
  const onSubmit = (data: any) => {
    updateStudent({
      variables: {
        id: student?.id,
        name: data.name,
        kcse: data.kcse,
        kcpe: data.kcpe,
        gender: data.gender,
        year: data.year,
        contact: data.contact,
        guardianContact: data.guardianContact,
      },
    });
  };

  return (
    <StyledEdit>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <Row className="pt">
            <Input
              label="Full name"
              name="name"
              type="text"
              error={errors.name}
              register={register({ required: true })}
            />
          </Row>

          <Row className="pt">
            <Input
              label="Contact"
              name="contact"
              type="text"
              error={errors.contact}
              register={register({ required: true })}
            />
          </Row>

          <Row className="pt">
            <Input
              label="Guardian Contact"
              name="guardianContact"
              type="text"
              error={errors.guardianContact}
              register={register({ required: false })}
            />
          </Row>

          <Row className="pt">
            <Input
              label="Gender"
              name="gender"
              type="text"
              dropdown={true}
              error={errors.gender}
              register={register({ required: true })}
              options={["M", "F", "O"]}
            />
          </Row>

          <Row className="pt">
            <Input
              label="KCSE"
              name="kcse"
              type="text"
              error={errors.kcse}
              register={register({ required: true })}
              dropdown={true}
              options={grades}
            />
          </Row>

          <Row className="pt">
            <Input
              label="KCPE"
              name="kcpe"
              type="text"
              error={errors.kcpe}
              register={register({ required: true })}
            />
          </Row>

          <Row className="pt">
            <Input
              label="Year"
              name="year"
              type="text"
              dropdown={true}
              options={range(2014, new Date().getFullYear()).reverse()}
              error={errors.year}
              register={register({ required: true })}
            />
          </Row>
        </fieldset>

        <StyledFormActions>
          <Button background={colors.primary} color="white" type="submit">
            Update
          </Button>
          <Button onClick={() => setOpen(false)}> Cancel </Button>
        </StyledFormActions>
      </Form>
    </StyledEdit>
  );
};

export const StyledEdit = styled.div`
  padding: 3rem;
`;

export default Edit;
