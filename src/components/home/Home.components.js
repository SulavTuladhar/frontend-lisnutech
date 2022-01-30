import React from "react";
import { Component } from "react";

import './Home.component.css' // Loading CSS
import { FifthPage } from "./pages/fifthPage/fifthPage.components";
import { FirstPage } from "./pages/firstPage/firstPage.components";
import { FourthPage } from "./pages/fourthPage/fourthPage.components";
import { SecondPage } from "./pages/secondPage/secondPage.components";
import { ThirdPage } from "./pages/thirdPage/thirdPage.components";

// Loading Third Party CSS
// import { httpClient } from "../../utils/httpClient";
// import { handleError } from "../../utils/errorHandler";

export class Home extends Component{

    constructor(props){
        super();

        this.state = {
            isLoading: false,
            menu : []
        }
    }

    // componentDidMount(){
    //     this.setState({
    //         isLoading: true
    //     })
    //     httpClient.GET('/page/first-page', true)
    //         .then(response=>{
    //             this.setState({
    //                 menu: response.data
    //             })
    //         })
    //         .catch(err=>{
    //             handleError(err);
    //         })
    //         .finally(()=>{
    //             this.setState({
    //                 isLoading: false
    //             })
    //         })
    // }

    render(){
        return(
            <div className="main-container">
                <FirstPage />
                <SecondPage />
                <ThirdPage />
                <FourthPage />
                <FifthPage />
               </div>
        )
    }
}