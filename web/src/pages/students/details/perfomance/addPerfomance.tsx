import React from "react"
import {  Row } from "react-grid-system";
import useForm from 'react-hook-form'
import { Input } from "../../new";
import Form, { StyledFormActions } from "../../new/form";
import Button from "../../../../components/Button";
import colors from "../../../../styles/colors";
import { range } from "../../../../utils";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";


const CreatePerformance = gql`
    mutation CreatePerformance($student: String, $form: String, $year: Int, $grade: String, $term: String) {
        createPerformance(input: {
            year:$year,
            term:$term,
            form: $form,
            student: $student,
            grade: $grade
        }) {
            performance {
            id
            }
        }
    }
`


const AddSchoolPerformance = ({ toggleOpen, student }: any) => {
    const { register, handleSubmit, errors } = useForm()
    
    const [ createPerformance, { loading, error } ] = useMutation(CreatePerformance, {
        onCompleted: ({  }) => {
            console.log( createPerformance );
            toggleOpen(false)
        }
    }) 

    const onSubmit = (data: any) => {
    
        console.log(data);
        
        createPerformance({
            variables: {
                student: student,
                year: data.year,
                form: data.form,
                grade: data.grade,
                term: data.term
            }
        })
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-header">
                <h2> School Performance </h2>
            </div>

            <fieldset>
                <Row className="pt">
                    <Input  
                        label="Grade" 
                        dropdown={true} 
                        name="grade"
                        error={errors.grade}
                        register={register({ required: true })}
                        options={
                        [
                            "A",
                            "A-",
                            "B+",
                            "B",
                            "B-",
                            "C+",
                            "C",
                            "C-",
                            "D+",
                            "D",
                            "D-",
                            "E"
                        ]   
                    }/>
                </Row>
                
                <Row className="pt">
                    <Input 
                        label="Term" 
                        dropdown={true} 
                        error={errors.term}
                        name="term"
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
                        error={errors.form}
                        name="form"
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
                        label="Year"
                        dropdown={true} 
                        name="year"
                        type="number"
                        error={errors.year}
                        register={register({ required: true })}
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

export default AddSchoolPerformance