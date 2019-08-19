import React from "react";
import * as Highcharts from 'highcharts';
import styled from "@emotion/styled";
import { Title } from "../../components/text";
import colors from "../../styles/colors";
import { getCash } from "../../utils";
import cash from "../../icons/cash2.svg"
import studentIcon from "../../icons/students.png";
import old from "../../icons/old.svg";
import university from "../../icons/university.png";
import { Row, Col } from "react-grid-system";
import { BeatLoader } from "react-spinners";
import UniversityTransation from "./university_transation";



const dataOrLoading = (data: any) => ( !data ? <BeatLoader color={colors.primary} />  : data  )



const ProgramInsights = ({ data, loading }: any) => {

    return (
        <>
            <Title> Program Insights </Title>
            <Grid>
            <Insight >
                <img src={studentIcon} alt="students icon"/>
                <h2>Sponsored Students </h2>
                
                <h3> { dataOrLoading(data ? data.totalStudents : false) } </h3>
                
                
            </Insight>

            <Insight>
                <img src={cash} alt="cash icon"/>
                <h2>  Funds Spent </h2>
                <h3> { dataOrLoading(data ? getCash(data ? data.totalAmmount: false ) : false) } </h3>
                
            </Insight>

            <Insight>
                <img src={old} alt=""/>
                <h2>  Alumin </h2>
                <h3> { dataOrLoading(data ? data.totalAlumni : false) } </h3>
                
                
            </Insight>
            
            <Insight>
                <img src={university} alt=""/>
                <h2>  University Transation </h2>
                <h3>   { dataOrLoading(data ? data.totalUniversityTransation : false) } </h3>
                
            </Insight>

           
            </Grid> 

            <Row>
                <Col sm={6}>

                    <UniversityTransation />
                    {/* <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                    
                    /> */}
                </Col>
            

            </Row>

            


        </>
    )
}

const Insight = styled.div`
    background-color: ${colors.secondaryBackground};
    border-color: ${colors.primaryBorder};
    border-radius: 4px;
    padding: 20px;
    margin-bottom: 15px;
    margin-top: 15px;
    border: 1px solid transparent;

    h3 {
        color: ${colors.primary};
    }

    display: flex;

    img {
        width: 50px;
        padding-bottom: 1rem;
    }

    flex-direction: column;
    justify-content: space-between;
`

// TODO add media query
const  Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(4,1fr);
    grid-gap: 1rem;
`

export default ProgramInsights