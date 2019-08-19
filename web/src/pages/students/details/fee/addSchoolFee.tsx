import React, { useState } from "react"
import {  Row } from "react-grid-system";
import { Input } from "../../new";
import Form, { StyledFormActions } from "../../new/form";
import Button from "../../../../components/Button";
import colors from "../../../../styles/colors";
import { range } from "../../../../utils";
import useForm from "react-hook-form";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const CreateFee = gql`
    mutation CreateMutation($ammount: Decimal, $form: String, $student: String, $year: String, $term: String) {
        createFee(input: {
            ammount: $ammount,
            form: $form,
            student: $student,
            year: $year,
            term: $term
        }) {
            fee {
                id
            }
    }
}
`


const AddSchoolFee = ({ toggleOpen , student}: any) => {

    const [ ammount, setAmmount  ] = useState("1")
    const { register, handleSubmit, errors } = useForm()
    const [ createFee, { loading, error }  ] = useMutation(CreateFee, {
        onCompleted: ({ createFee }) => {
            console.log(createFee);

            toggleOpen(false)
            
        }
    })
      

      
    function formatNumber(n: any) {
        // format number 1000000 to 1,234,567
        return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      }
      console.log(formatNumber(ammount));

    const onSubmit = (data: any) => {

        console.log(data);

        createFee({
            variables: {
                student: student,
                ammount: data.ammount,
                year: data.year,
                term: data.term,
                form: data.form
            }
        })
        
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-header">
                <h2> Fee payment </h2>
            </div>

            <fieldset>
                <Row className="pt">
                    {
                    <Input 
                        name="ammount"
                        register={register({ required: true })}
                        label="Amount"
                        type="text"
                        // value={formatNumber(ammount)}
                        // onChange={(e: any) => setAmmount(e.target.value)}
                        error={errors.ammount}
                    /> 

                    
                }
                </Row>
                
                <Row className="pt">
                    <Input 
                        label="Term" 
                        dropdown={true} 
                        name="term"
                        type="text"
                        
                        error={errors.term}
                        register={register({ required: true })}
                        options={
                        [
                            "Term 1",
                            "Term 2",
                            "Term 3"
                        ]
                    } />
                </Row>

                <Row className="pt">
                    <Input 
                        label="Form" 
                        dropdown={true} 
                        name="form"
                        type="text"
                        
                        error={errors.form}
                        register={register({ required: true })}
                        options={
                        [
                            "FORM 1",
                            "FORM 2",
                            "FORM 3",
                            "FORM 4"
                        ]
                    } />
                </Row>


                <Row className="pt"> 
                    <Input 
                        type="text"
                        label="Year"
                        register={register({ required: true })}
                        name="year"
                        dropdown={true} 
                        error={errors.year}
                        
                        options={
                            range(2014, new Date().getFullYear()).reverse()
                        }
                    />
                </Row>
                

            </fieldset>

            <StyledFormActions>
                <Button background={colors.primary} color="white" type="submit" > Save </Button>
                <Button onClick={(e: any) => {
                    toggleOpen(false)
                }}> Cancel </Button>

            </StyledFormActions>
        </Form>
    )
}

export default AddSchoolFee