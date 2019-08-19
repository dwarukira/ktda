import  React, { ReactNode } from "react";
import { Container, Header, Nav, Content } from "./layout";
import { NavLink } from "react-router-dom";

interface IProps {
    children: ReactNode
}

const Layout = ({ children }: IProps) => {


    return (
        <Container>
            <Header>
              <img src="https://ktdafoundation.org/wp-content/themes/custom/images/logo.jpg" alt="KTDA logo"/>
            </Header>

            <Nav>
                <ul>
                    <NavLink 
                        to="/" 
                        activeStyle={{
                           
                            color: "#82BE42"
                          }}
                    >
                        <li>
                            <i className="fas fa-home"></i> Dashboard </li> 
                    </NavLink>
                    <NavLink to="/students"> <li>  <i className="fas fa-users"></i>  Students </li> </NavLink>
                    
                    <div className="pt">
                   
                        <NavLink to="/insights"> <li> <i className="fas fa-chart-line"></i> Insights </li> </NavLink>
                        <NavLink to="/messages"> <li> <i className="far fa-envelope"></i> Messages </li> </NavLink>
                        <NavLink to="/insights"> <li> <i className="far fa-lightbulb"></i> Mentorship </li> </NavLink>
                        <li>  <i className="fas fa-hammer"></i> Actions </li>
                    </div>

                   
                    
                    
                    <div className="pt">  
                        <li>  <i className="fas fa-cogs"></i>   Settings </li>
                        <li>  <i className="fas fa-hands-helping"></i>  Help </li>
                    </div>
                </ul>
            </Nav>

            <Content> 
                { children }
            </Content>

        </Container>
    )
}


export default Layout