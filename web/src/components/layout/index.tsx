import React, { ReactNode } from "react";
import { Container, Header, Nav, Content, RootContainer } from "./layout";
import { NavLink } from "react-router-dom";
import colors from "styles/colors";

interface IProps {
  children: ReactNode;
}

const Layout = ({ children }: IProps) => {
  return (
    <RootContainer>
      <Container>
        <Header>
          <img
            src="https://ktdafoundation.org/wp-content/themes/custom/images/logo.jpg"
            alt="KTDA logo"
          />
        </Header>

        <Nav>
          <ul>
            <NavLink
              to="/"
              activeStyle={{
                color: "#82BE42 !important",
              }}
              exact={true}
              activeClassName="active"
            >
              <li>
                <i className="fas fa-home"></i> Dashboard{" "}
              </li>
            </NavLink>
            <NavLink to="/students" activeClassName="active" exact>
              {" "}
              <li>
                {" "}
                <i className="fas fa-users"></i> Students{" "}
              </li>{" "}
            </NavLink>

            <div className="pt">
              <NavLink
                to="/insights"
                activeStyle={{
                  color: colors.primaryBorder,
                }}
              >
                {" "}
                <li>
                  {" "}
                  <i className="fas fa-chart-line"></i> Insights{" "}
                </li>{" "}
              </NavLink>
              <NavLink to="/messages">
                {" "}
                <li>
                  {" "}
                  <i className="far fa-envelope"></i> Messages{" "}
                </li>{" "}
              </NavLink>
              <NavLink to="/mentorship">
                {" "}
                <li>
                  {" "}
                  <i className="far fa-lightbulb"></i> Mentorship{" "}
                </li>{" "}
              </NavLink>
              <NavLink to="/actions">
                {" "}
                <li>
                  {" "}
                  <i className="fas fa-hammer"></i> Actions{" "}
                </li>{" "}
              </NavLink>
            </div>

            <div className="pt">
              <NavLink to="/settings">
                {" "}
                <li>
                  {" "}
                  <i className="fas fa-cogs"></i> Settings{" "}
                </li>{" "}
              </NavLink>
              <NavLink to="/help">
                {" "}
                <li>
                  {" "}
                  <i className="fas fa-hands-helping"></i> Help{" "}
                </li>{" "}
              </NavLink>
              {/* <li>  <i className="fas fa-cogs"></i>   Settings </li>
                        <li>  <i className="fas fa-hands-helping"></i>  Help </li> */}
            </div>
          </ul>
        </Nav>

        <Content>{children}</Content>
      </Container>
    </RootContainer>
  );
};

export default Layout;
