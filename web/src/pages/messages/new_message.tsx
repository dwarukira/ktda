import React, { useState } from "react";
import { Title } from "../../components/text";
import Form, { StyledFormActions } from "../students/new/form";
import { Input, InputStyle } from "../students/new";
import styled from "styled-components";
import colors from "../../styles/colors";
import { Row, Col } from "react-grid-system";
import Button from "../../components/Button";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import { Checkbox, TextArea } from "../../components/form/input";
// import { TextArea, Checkbox, DropdownInput } from "../../components/form/input";

// $useGroup: String, $group: String, $phone: String
const SendSMS = gql`
  mutation SendSms($message: String!) {
    sendSms(
      input: {
        message: $message
        # useGroup: $useGroup,
        # group: $group,
        # phone: $phone,
      }
    ) {
      ok
    }
  }
`;

const NewMessage = ({}) => {
  const { handleSubmit, register, errors } = useForm();
  const [selected, setSelected] = useState("individual");
  const [checked, setChecked] = useState(true);
  const [sendMessage, { loading, error }] = useMutation(SendSMS, {
    onCompleted: (sendMessage) => {
      console.log(sendMessage);
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);

    console.log(data);

    sendMessage({
      variables: {
        message: data.message,
        // phone: data.phone,
        // group: selected,
        // useGroup: checked
      },
    });
  };

  const handleOnChange = (e: any) => {
    console.log(e, "------------>");
    setChecked(!checked);
    setSelected("group");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title> Compose a new message </Title>

      <Form>
        <InputStyle>
          <Row className="pt">
            <TextArea
              label="Message"
              name="message"
              register={register({ required: true })}
              error={errors.name}
              rows="10"
              cols="100"
              tip={"Input your new message in this text area"}
            />
          </Row>
        </InputStyle>

        <InputStyle>
          <Row className="pt">
            <Col sm={2}>
              <label> Individual </label>
            </Col>
            <Col sm={6}>
              <Checkbox
                checked={checked}
                onClick={(event: any) => {
                  console.log(event, "");

                  setChecked(!checked);
                  setSelected("individual");
                }}
              />
            </Col>
          </Row>
        </InputStyle>

        <Row className="pt">
          <Col sm={2}>
            <label> Use Group </label>
          </Col>
          <Col sm={6}>
            <Checkbox checked={!checked} onClick={handleOnChange} />
          </Col>
        </Row>

        {selected !== "individual" ? (
          <InputStyle>
            <Row className="pt">
              <Input
                label="Sender Group"
                name="name"
                dropdown={true}
                options={["Gurdian", "Schools"]}
                register={register({ required: true })}
                error={errors.name}
                tip="Choose a group of people you want to send a message to. You can select [Individual] to send to individuals"
              />
            </Row>
          </InputStyle>
        ) : (
          <InputStyle>
            <Row className="pt">
              <Input
                label="Phones"
                name="name"
                register={register({ required: true })}
                error={errors.name}
                tip="Enter a phone number you would like to send a message to. ie (0728**********) You can select [Use Groups] to send it to group of individuals"
              />
            </Row>
          </InputStyle>
        )}
      </Form>

      <StyledFormActions className="mt-10">
        <Button background={colors.primary} color="white">
          {" "}
          Preview{" "}
        </Button>
        <Button> Cancel </Button>
      </StyledFormActions>
    </Form>
  );
};

export default NewMessage;
