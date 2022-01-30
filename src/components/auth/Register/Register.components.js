import React from "react";
import { Component } from "react";
import { handleError } from "../../../utils/errorHandler";
import { httpClient } from "../../../utils/httpClient";
import { notify } from "../../../utils/toaster";
import './Register.components.css';

const defaultForm = {
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword:'',
    dob: '',
    phoneNumber: '',
    gender: '',
    image: [],
    temporaryAddress: '',
    permanentAddress: ''
}

export class Register extends Component{
    constructor(){
        super();
        this.state={
            data:{
                ...defaultForm
            },
            err:{
                ...defaultForm
            },
            isValidForm: false,
            isSubmitting: false
        }
        console.log("Constructure at first")
    }
// init
    componentDidMount(){
        console.log("I will be self envoked when component is fully loaded");
        // Data preperation
        // API call
        // State modification
    }
// update
    componentDidUpdate(preProps, preState){
        console.log("Once state or props is changed");
    }
// destory
    componentWillUnmount(){
        console.log("Once usage is over");
        // Prevent memory Leakage
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        this.setState({
            isSubmitting: true
        })
        httpClient.POST(`/auth/register`, this.state.data)
            .then((res)=>{
                notify.showInfo('Registration sucessfull !!')
                this.props.history.push('/login')
            })
            .catch(err=>{
                handleError(err)
            })
    }

    onChange = (e) =>{
        let {name,value} = e.target;

        this.setState((preState)=>({
            data:{
                ...preState.data,
                [name]: value
            }
        }), ()=>{
            console.log("state is >>", this.state.data)
        })
    }

    render(){
        console.log("render at second");
        let btn = this.state.isSubmitting
            ? <button disabled type="submit" className="submitting"> Submitting... </button>  
            : <button type="submit"> Submit </button>
         
        return(
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name"> Name </label>
                    <input type="text" id="name" name="name" onChange={this.onChange} />

                    <label htmlFor="email"> Email </label>
                    <input type="email" id="email" name="email" onChange={this.onChange} />

                    <label htmlFor="username"> Username </label>
                    <input type="text" id="username" name="username" onChange={this.onChange} />

                    <label htmlFor="password"> Password </label>
                    <input type="password" id="password" name="password" onChange={this.onChange} />

                    <label htmlFor="confirmPassword"> Confirm Password </label>
                    <input type="password" id="confirmPassword" name='confirmPassword' onChange={this.onChange} />

                    <label htmlFor="dob"> Date of Birth </label>
                    <input type="date" id="dob" name="dob" onChange={this.onChange} />

                    <label htmlFor="phoneNumber"> Phone Number </label>
                    <input type="number" id="phoneNumber" name="phoneNumber" onChange={this.onChange} />

                    <label> Gender </label> <br />
                    <span className="radio-btn">
                        <input type="radio" id="male" name="gender" onChange={this.onChange} /> &nbsp;
                            <label htmlFor="male"> Male </label>
                                &nbsp;  &nbsp;
                        <input type="radio" id="female" name="gender" onChange={this.onChange} /> &nbsp;
                            <label htmlFor="female"> Female </label>
                    </span>
                    <label htmlFor="temporaryAddress"> Temporary Address </label>
                    <input type="text" id="temporaryAddress" name="temporaryAddress" onChange={this.onChange} />
                    <label htmlFor="permanentAddress"> Permanent Address </label>
                    <input type="text" id="permanentAddress" name="permanentAddress" onChange={this.onChange} />
                    {btn}
                </form>
            </div>
        )
    }


}