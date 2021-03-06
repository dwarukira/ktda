import styled from "@emotion/styled";
import colors from "styles/colors";

export const Container = styled.div`
  display: grid;
  grid-template-areas:
    "header header header"
    "nav content content"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
  max-width: 100vw;

  overflow-x: hidden;
`;

export const RootContainer = styled.div`
  /* overflow-y: hidden; */
`;

export const Header = styled.header`
  grid-area: header;

  height: 86px;
  width: 100%;

  padding: 0 30px;
  border-bottom: 1px solid ${colors.primaryBorder};

  display: flex;

  justify-content: space-between;

  align-items: center;

  position: fixed;
  z-index: 99999;
  background-color: #fff;

  img {
    height: 65px;
  }
`;

export const Nav = styled.nav`
  gird-area: nav;
  background-color: ${colors.secondaryBackground};
  border-right: 1px solid ${colors.primaryBorder};

  display: flex;
  justify-content: space-between;
  flex-direction: column;

  padding: 40px 25px;

  position: fixed;
  top: 86px;

  height: 100vh;

  ul {
    margin-bottom: 25px;
    margin: 0 0 20px;
    padding: 0;
    text-align: left;
  }

  li {
    display: flex;
    align-items: center;

    color: ${colors.secondaryText};
    padding: 10px 0;
    cursor: pointer;
  }

  i {
    margin-right: 15px;
    line-height: 1;
  }
`;

export const Content = styled.main`
  grid-area: content;
  position: relative;
  top: 86px;
  width: 80%;
  margin: 0 auto;
  padding: 60px 40px;
`;
