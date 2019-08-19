import React, { useState } from "react"
import { Title } from "../../components/text";
import Form, { StyledFormActions } from "../students/new/form";
import { Input } from "../students/new";
import styled from "@emotion/styled";
import colors from "../../styles/colors";
import { Row, Col } from "react-grid-system";
import Button from "../../components/Button";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import useForm from "react-hook-form";
import { Checkbox, TextArea } from "../../components/form/input";
// import { TextArea, Checkbox, DropdownInput } from "../../components/form/input";

const SendSMS = gql`
    mutation SendSms($message: String!, $useGroup: String, $group: String, $phone: String) {
        sendSms(input: {
            message: $message,
            useGroup: $useGroup,
            group: $group,
            phone: $phone,

        }) {
            ok
        }
    }
`

const NewMessage = ({ }) => {
    const { handleSubmit, register, errors } = useForm()
    const [ selected, setSelected ] = useState("individual")
    const [ checked, setChecked ] = useState(true)
    const [sendMessage, { loading, error }] = useMutation(SendSMS, {
        onCompleted: (sendMessage) => {
            console.log(sendMessage);

        }
    })


    const onSubmit = (data: any) => {
        console.log(data);

        console.log(data);

        sendMessage({
            variables: {
                message: data.message,
                phone: data.phone,
                group: selected,
                useGroup: checked
            }
        })



    }

    const handleOnChange = (e: any) => {
        console.log(e, "------------>");
        setChecked(!checked)
        setSelected("group")
        
    }


    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Title> Compose a new message </Title>

            <Form>
                <Row className="pt">
                    <TextArea
                            label="Message"
                            name="message"
                            register={register({ required: true })}
                            error={errors.name}
                            rows="10" 
                            cols="100"
                        />
                </Row>


                <Row className="pt">
                   
                    <Col sm={2}> 
                        <label> Indivulal </label> 
                    </Col>
                    <Col sm={6}>
                        <Checkbox 
                            checked={checked} 
                            
                            onClick={(event: any) => {
                                console.log(event, "");
                                
                                setChecked(!checked)
                                setSelected("individual")

                        }} />
                    </Col>
                </Row>


                <Row className="pt">
                   
                    <Col sm={2}> 
                        <label> Use Group </label> 
                    </Col>
                    <Col sm={6}>
                        <Checkbox 
                            checked={!checked}
                            onClick={handleOnChange}
                        />
                    </Col>
                </Row>


                {selected !== "individual" ? <Row className="pt">
                    <Input
                            label="Sender Group"
                            name="name"
                            dropdown={true}
                            options={["Gurdian", "Schools"]}
                            register={register({ required: true })}
                            error={errors.name}
                        />
                </Row> :


                <Row className="pt">
                    <Input
                            label="Phones"
                            name="name"
                            register={register({ required: true })}
                            error={errors.name}
                        />
                </Row> }


                




            </Form>
            

            <StyledFormActions className="mt-10">
                <Button background={colors.primary} color="white" > Preview </Button>
                <Button> Cancel </Button>

            </StyledFormActions>

        </Form>
    )
}




export default NewMessage