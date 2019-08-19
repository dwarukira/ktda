import React from "react"
import Tab from "../../components/tabs";
import Card from "../../components/card";
import { Cards } from "./messages";
import template from "../../icons/template.png"
import paper_plane from "../../icons/paper_plane.svg"
import { withRouter, Link } from "react-router-dom";

const Messages = ({ history }: any) => {


    return (
        <>
            <h2> Messages </h2>
            <Tab>
                <li> Messages </li>
                <li> History  </li>
                <li> Settings  </li>
            </Tab>


            <Cards> 
                <Card className="card">
                    <img src={template} alt="" />
                    <h2> Send Messages from a template </h2>

                    <p>  Use an existing template to send a message. </p>

                    <div className="footer">
                        
                        <Link to="/">
                            Compose message <i className="fas fa-chevron-right"></i> 
                        </Link> 
                    </div>
                </Card>


                <Card className="card" onClick={() => {
                    history.push("/message/new")
                }}>
                    <img src={paper_plane} alt="" />
                    <h2> Compose a message </h2>

                    <p>  Compose a message and send it to a target group. </p>

                    <div className="footer">

                        <Link to="/">
                            Compose message <i className="fas fa-chevron-right"></i> 
                        </Link> 
                    </div>
                </Card>

                

               
            </Cards>
        </>
    )
}


export default withRouter(Messages)