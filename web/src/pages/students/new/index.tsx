import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-grid-system";
import StyledInput, {
  StyledSelect,
  DropdownInput,
} from "../../../components/form/input";
import Form, { StyledFormActions } from "./form";
import Button from "../../../components/Button";
import colors from "../../../styles/colors";
import styled from "@emotion/styled";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { withRouter } from "react-router-dom";
import onboard from "../../../icons/students.png";
import { Title } from "../../../components/text";
import { useForm } from "react-hook-form";

export const WithError = styled.div`
  span {
    color: #d5351f;
    text-align: left;
    padding-top: 1rem;

    float: left;
    position: relative;
    i {
      padding-right: 10px;
    }
  }
`;

const StyledTip = styled.span`
  font-size: 14px;
  line-height: 20px;
  background-color: #ffffff;
  position: absolute;

  right: 0;
  top: 0;
  left: 10px;

  z-index: 10;

  color: #6c6c72;
  padding-left: 24px;

  text-align: left;
`;

const Tip = ({ tip }: any) => {
  if (!tip) return null;
  return (
    <StyledTip>
      <i className="fas fa-info-circle"></i>
      <span> {tip}</span>
    </StyledTip>
  );
};

export const InputStyle = styled.div`
  .tip {
    display: none;
  }
  &:hover {
    .tip {
      display: block;
    }
  }
` as React.FC<any>;

export const Input = (props: any) => {
  return (
    <>
      <Col sm={2}>
        <label> {props.label} </label>
      </Col>
      <Col sm={6}>
        <WithError>
          {props.dropdown ? (
            <DropdownInput {...props} register={props.register} />
          ) : (
            <StyledInput {...props} ref={props.register} />
          )}
          {props.error && (
            <span>
              <i className="fas fa-info-circle"></i>
              Field is required
            </span>
          )}
        </WithError>
      </Col>
      <Col sm={4} className="tip">
        {" "}
        <Tip tip={props.tip} />{" "}
      </Col>
    </>
  );
};

const CREATE_STUDENT = gql`
  mutation CreateStudent(
    $name: String!
    $gender: String!
    $guardianContact: String
    $contact: String
    $school: String!
    $factory: String
    $kcpe: String!
  ) {
    createStudent(
      input: {
        school: $school
        gender: $gender
        name: $name
        guardianContact: $guardianContact
        factory: $factory
        contact: $contact
        kcpe: $kcpe
      }
    ) {
      student {
        name
        studentId
      }
    }
  }
`;

const GET_FACTORIES = gql`
  {
    factories {
      name
      id
    }
  }
`;

const GET_SCHOOLS = gql`
  {
    schools {
      id
      name
      email
      address
    }
  }
`;

const AddStudent = ({ history }: any) => {
  const { register, handleSubmit, errors } = useForm();
  const [factories, setFactories] = useState();
  const [schools, setSchools] = useState<any[]>();

  const [createStudent, { loading, error }] = useMutation(CREATE_STUDENT, {
    onCompleted({ createStudent }) {
      // console.log(data);

      history.push(`/students/new/${createStudent.student.studentId}/complete`);
    },
  });

  console.log(error);

  const { data: factory } = useQuery(GET_FACTORIES);

  const { data: school } = useQuery(GET_SCHOOLS);

  useEffect(() => {
    if (factory.factories) {
      setFactories(factory.factories.map((f: any) => f.name));
    }

    if (school.schools) {
      const set = new Set(school.schools.map((s: any) => s.name));
      setSchools(Array.from(set));
    }
  }, [factory, school]);

  const onSubmit = (data: any) => {
    const s = school.schools.find(
      (school: any) => school.name === data.school_name
    );
    const factoryData = factory.factories.find(
      (f: any) => f.name === data.factory
    );

    createStudent({
      variables: {
        name: data.name,
        factory: factoryData.id,
        contact: data.contact,
        guardianContact: data.guardian_contact,
        gender: data.sex,
        school: s.id,
        kcpe: data.kcpe,
      },
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title> Add Student </Title>
      <div className="center-text">
        <img src={onboard} alt="" />
        <h2> Hope For A Bright Future! </h2>
      </div>

      <fieldset>
        <h2> Basic </h2>
        <Container>
          <Row className="pt">
            <Input
              label="Full Name"
              name="name"
              register={register({ required: true })}
              error={errors.name}
            />
          </Row>

          <Row className="pt">
            <Input
              label="Factory"
              name="factory"
              error={errors.factory}
              dropdown={true}
              options={factories}
              register={register({ required: true })}
            />
          </Row>

          <Row className="pt">
            <Input
              label="Contact"
              name="contact"
              error={errors.contact}
              register={register({ required: true })}
            />
          </Row>

          <Row className="pt">
            <Input
              label="Guardian Contact"
              register={register({ required: true })}
              error={errors.guardian_contact}
              name="guardian_contact"
            />
          </Row>

          <Row className="pt">
            <Input
              label="Sex"
              register={register({ required: true })}
              name="sex"
              error={errors.sex}
              dropdown={true}
              options={["M", "F", "O"]}
            />
          </Row>

          <Row className="pt">
            <Input
              label="KCPE"
              register={register({ required: true })}
              name="kcpe"
              error={errors.kcpe}
              type="number"
            />
          </Row>
        </Container>
      </fieldset>

      <fieldset>
        <h2> School Details </h2>

        <Row className="pt">
          <Input
            label="School Name"
            name="school_name"
            error={errors.school_name}
            register={register({ required: true })}
            dropdown={true}
            options={schools}
          />
        </Row>

        <Row className="pt">
          <Input
            label="Contact"
            register={register({ required: true })}
            name="contact"
            error={errors.contact}
          />
        </Row>

        <Row className="pt">
          <Input
            label="Address"
            register={register({ required: true })}
            error={errors.address}
            name="address"
          />
        </Row>
      </fieldset>

      <StyledFormActions>
        <Button background={colors.primary} color="white">
          {" "}
          {loading ? "Saving ...." : "Save Student"}{" "}
        </Button>
        <Button> Cancel </Button>
      </StyledFormActions>
    </Form>
  );
};

export default withRouter(AddStudent);
