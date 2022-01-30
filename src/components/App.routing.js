import React from "react";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { AddBlog } from "./add/addBlog.components";
import { AddDigitalMarketing } from "./add/addDigitalMarketing.components";
import { AddGraphicsDesign } from "./add/addGraphicsDesign.components";
import { AddSocialMediaManagement } from "./add/addSocialMediaManagement.components";
import AddWebDevelopment from "./add/addWebDevelopment.components";
// Loading components
import { Login } from "./auth/Login/Login.components";
import { Register } from "./auth/Register/Register.components";
import { Blog } from "./blog/blog.components";
import { ViewBlog } from "./blog/viewBlog.components";
import { Header } from "./common/header/Header.components";
import { Loader } from "./common/loader/loader.components";
import {PageNotFound } from "./common/PageNotFound/PageNotFound.components";
import { Contact } from "./Contact/contact.components";
import { Dashboard } from "./dashboard/dashboard.components";
import { DigitalMarketing } from "./digitalMarketing/digitalMarketing.components";
import { EditBlog } from "./edit/editBlog/editBlog.components";
import { EditSingleBlog } from "./edit/editBlog/editSingleBlog.components";
import { EditDigitalMarketing } from "./edit/editDigitalMarketing/editDigitalMarketing.components";
import { EditDigitalMarketingContent } from "./edit/editDigitalMarketing/editDigitalMarketingContent.components";
import { EditGraphicsDesign } from "./edit/editGraphicsDesign/editGraphicsDesign.components";
import { EditGraphicsDesignContent } from "./edit/editGraphicsDesign/editGraphicsDesignContent.components";
import { EditHome } from "./edit/editHome/editHome.components";
import { EditFifthPage } from "./edit/editHome/editPage/editFifthPage.components";
import { EditFourthPage } from "./edit/editHome/editPage/editFourthPage.components";
import { EditSecondPage } from "./edit/editHome/editPage/editSecond.components";
import { EditThirdPage } from "./edit/editHome/editPage/editThirdPage.components";
import { EditSocialMedia } from "./edit/editSocialMedia/editSocialMedia.components";
import { EditSocialMeidaManagement } from "./edit/editSocialMedia/editSocialMediaManagement.components";
import { EditWebDevelopment } from "./edit/editWebDevelopment/editWebDevelopment.components";
import { EditWebDevelopmentHeader } from "./edit/editWebDevelopment/editWebDevelopmentHeader.components";
import { EditWebDevelopmentPosts } from "./edit/editWebDevelopment/editWebDevelopmentPosts.components";
import { GraphicsDesign } from "./graphicsDesign/graphicsDesign.components";
import { Home } from "./home/Home.components";
import { SocialMediaManagement } from "./socialMediaManagement/socialMediaManagement";
import { WebDevelopment } from "./webDevelopment/webDevelopment.components";

const ProtectedRoute = ({component: Component, ...rest}) =>{
    return <Route {...rest} render={(routerProps) => (
        localStorage.getItem('token')
            ? <> 
                <Header isLoggedIn />
                <div>
                    <Component {...routerProps} />
                </div>
             </>
            : <Redirect to="/"> </Redirect> // TODO Props from where it is redirected
    )} /> 
}

const PublicRoute = ({component: Component, ...rest}) =>{
    return <Route {...rest} render={(routerProps) => (
        <>
                <Header />
            <Component {...routerProps} />
        </>
    )} /> 
}

export const AppRouting = (props) =>{
    return(
        <BrowserRouter>
            <Switch>
                <PublicRoute path="/" component={ Home } exact />
                <PublicRoute path="/login" component={ Login } />
                <PublicRoute path="/register" component={ Register } />
                <PublicRoute path="/blog" component={ Blog } />
                <PublicRoute path="/viewBlog/:id" component={ ViewBlog } />
                <PublicRoute path="/socialMediaManagement" component={ SocialMediaManagement } />
                <PublicRoute path="/webDevelopment" component={ WebDevelopment } />
                <PublicRoute path="/digitalMarketing" component={ DigitalMarketing } />
                <PublicRoute path="/graphicsDesign" component={ GraphicsDesign } />
                <PublicRoute path="/contact" component={  Contact } />
                <PublicRoute path="/loader" component={  Loader } />
                
                
                <ProtectedRoute path="/editDigitalMarketing" component={ EditDigitalMarketing } />
                <ProtectedRoute path="/editBlog" component={ EditBlog } />
                <ProtectedRoute path="/editDigitalMarketingContent/:id" component={ EditDigitalMarketingContent } />
                <ProtectedRoute path="/editGraphicsDesign" component={ EditGraphicsDesign } />
                <ProtectedRoute path="/editGraphicsDesignContent/:id" component={ EditGraphicsDesignContent } />
                <ProtectedRoute path="/dashboard" component={  Dashboard } />
                <ProtectedRoute path="/editSingleBlog/:id" component={  EditSingleBlog } />
                <ProtectedRoute path="/edit-home" component={  EditHome } />
                <ProtectedRoute path="/editsocialMedia" component={  EditSocialMedia } />
                <ProtectedRoute path="/editWebDevelopment" component={  EditWebDevelopment } />
                <ProtectedRoute path="/editWebDevelopmentHeader/:id" component={  EditWebDevelopmentHeader } />
                <ProtectedRoute path="/editWebDevelopmentPost/:id" component={  EditWebDevelopmentPosts } />
                <ProtectedRoute path="/edit-socialMedia/:id" component={  EditSocialMeidaManagement } />
                <ProtectedRoute path="/secondPage/:id" component={  EditSecondPage } />
                <ProtectedRoute path="/thirdPage/:id" component={  EditThirdPage } />
                <ProtectedRoute path="/fourthPage/:id" component={  EditFourthPage } />
                <ProtectedRoute path="/fifthPage/:id" component={  EditFifthPage } />
                <ProtectedRoute path="/addSocialMedia" component={  AddSocialMediaManagement } />
                <ProtectedRoute path="/addWebDevelopment" component={  AddWebDevelopment } />
                <ProtectedRoute path="/addDigitalMarketing" component={  AddDigitalMarketing } />
                <ProtectedRoute path="/addGraphicsDesign" component={  AddGraphicsDesign } />
                <ProtectedRoute path="/addBlog" component={  AddBlog } />
                
                <PublicRoute path="*" component={  PageNotFound } exact />
            </Switch>
        </BrowserRouter>
    )
}