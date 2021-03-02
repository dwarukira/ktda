import styled from "@emotion/styled";

const Card = styled.div`
  box-shadow: 0px 3px 6px rgba(34, 37, 37, 0.15);
  border-radius: 4px;
  border: 1px solid transparent;

  margin: 0;
  margin-bottom: 15px;
  padding: 15px;

  cursor: pointer;

  &:hover {
    background-color: #f3fafb;
    border-color: #0a8080;
  }
`;

export default Card;
