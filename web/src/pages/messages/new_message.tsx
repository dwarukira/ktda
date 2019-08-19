import React from "react"
import { Title } from "../../components/text";
import Form from "../students/new/form";
import { Input } from "../students/new";
import styled from "@emotion/styled";
import colors from "../../styles/colors";
import { Row, Col } from "react-grid-system";
import Button from "../../components/Button";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import useForm from "react-hook-form";

const SendSMS = gql`
    mutation SendSms($message: String!) {
        sendSms(input: {
            message: $message
        }) {
            ok
        }
    }
`

const NewMessage = ({ }) => {
    const { handleSubmit, register, errors } = useForm()
    const [ sendMessage, { loading, error } ] = useMutation(SendSMS, {
        onCompleted: (sendMessage) => {
            console.log(sendMessage);
            
        }
    })


    const onSubmit = (data: any) => {
        console.log(data);

        console.log(data);

        sendMessage({
            variables: {
                message: data.message
            }
        })
        

        
    }


    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Title> Compose a new message </Title>
        
            <Row>
                
                <Col sm={6}>
                   
                    {/* <TextArea 
                        cols="30"
                        name="message"
                        ref={register({ required: true })}
                        rows="5" /> */}

                      <Input />

                        
                </Col>

                <Col>
                    
                </Col>
                
            </Row>
           

           <Button type="submit" > Send </Button>
            
        </Form>
    )
}


const TextArea = styled.textarea`
    background-color: ${colors.white};
    border: none;
    box-shadow: 0 0 0 1.5px ${props => props.error ? '#d5351f' : '#919197'  } inset;
    border-radius: 4px;
    color: ${props => props.error ? '#d5351f' : '##919197'  };
    font-size: 1em;
    font-weight: 400;
    line-height: 22px;

    box-sizing:content-box;


    padding: 3px 10px 3px;
    transition: border 0.2s linear 0s;

    width: 100%;


    &:focus {
        box-shadow: 0 0 0 2px ${props => props.error ? '#d5351f' : colors.primary  } inset;


        outline: none
    }

` as React.FC<any>

export default NewMessage