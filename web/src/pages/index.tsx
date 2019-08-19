import React from "react";
import Layout from "../components/layout";
import { Switch, Route } from "react-router-dom";
import Students from "./students";
import AddStudent from "./students/new";
import StudentDetails from "./students/details";
import Dashboard from "./dashboard";
import Insights from "./insights";
import Complete from "./students/new/complete";
import Messages from "./messages";
import NewMessage from "./messages/new_message";

const Pages = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/"  exact component={Dashboard} />
                <Route path="/insights"  exact component={Insights} />
                <Route path="/students/new" exact  component={AddStudent} />
                <Route path="/students/new/:id/complete" exact  component={Complete} />
                <Route path="/students"  component={Students} />


                <Route path="/messages"  component={Messages} />
                <Route path="/message/new"  component={NewMessage} />

                <Route path="/student/:id" component={StudentDetails} />
               
            </Switch>
        </Layout>
    )
}


export default Pages