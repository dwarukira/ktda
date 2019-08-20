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
import { Cards } from "../messages/messages";
import Card from "../../components/card";
import { Link, withRouter } from "react-router-dom";
import add from "../../icons/add.svg"

import presentation from "../../icons/presentation.svg"
import file from "../../icons/file.svg"


const dataOrLoading = (data: any) => ( !data ? <BeatLoader color={colors.primary} />  : data  )



const ProgramInsights = ({ data, loading, history }: any) => {

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
       
                <Col md={6}>
                <Headers> Thing's you can do. </Headers>
                <Actions> 
                    <Card className="card">
                        <img src={file} alt="" />
                        <h2> Update student data. </h2>

                        <p>  Fill the data for new students.  </p>

                        <div className="footer">
                            
                        
                        </div>
                    </Card>


                    <Card className="card" onClick={(e:any) => {
                        history.push("/insights")
                    }}>
                        <img src={presentation} alt="" />
                        <h2> View Insights </h2>

                        <p>  Understant the state of the program. View how the students are performing.  </p>

                        <div className="footer">
                            
                        
                        </div>
                    </Card>


                </Actions> 
                
                </Col>


                <Col md={6}>
                    <Headers> Something to think about. </Headers>
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


const Actions = styled.div`
    img {
        width: 50px;
        height: 50px;
    }
`

const Headers = styled.h3`
    padding: 25px 0px 25px 0px;
`

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

export default withRouter(ProgramInsights)