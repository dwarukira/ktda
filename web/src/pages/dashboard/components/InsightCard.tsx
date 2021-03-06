import * as React from "react";
import styled from "styled-components";
import colors from "styles/colors";

interface InsightCardProp {
  label: string;
  icon: string;
  data: string;
}

const InsightCard: React.FC<InsightCardProp> = ({ label, icon, data }) => {
  return (
    <Insight>
      <img src={icon} alt="" />
      <h2> {label} </h2>
      <h3> {data} </h3>
    </Insight>
  );
};

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
`;

export default InsightCard;
