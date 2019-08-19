import React from "react"

import { Row, Col } from "react-grid-system";
import styled from "@emotion/styled";
import GenderParity from "./gender";
import UniversityTransation from "../dashboard/university_transation";
import GenderGradeDistribution from "./gender/genderunidist";
import UniversityTransationGender from "./gender/genderuni";




const Insights = () => {
    return (
        <>
            <StyledInsights>
                <h2> Gender Parity </h2>
                <Row>
                    <Col sm={6}>


                        <GenderParity />
                    </Col>

                    <Col sm={6}>
                        <GenderGradeDistribution />
                    </Col>

                </Row>
            </StyledInsights>


            <StyledInsights>
                <h2> University Insights </h2>
                <Row>
                    <Col sm={6}>
                        <UniversityTransation />
                    </Col>

                    <Col sm={6}>
                        <UniversityTransationGender />
                    </Col>

                </Row>
            </StyledInsights>

        </>
    )
}

const StyledInsights = styled.div`
    padding: 1rem;
    h2 {
        padding-bottom: 2rem;

        padding-left: 2rem;
    }
`

export default Insights