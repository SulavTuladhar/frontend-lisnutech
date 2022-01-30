import React, { Component } from 'react'
import { handleError } from '../../utils/errorHandler';
import { httpClient } from '../../utils/httpClient';
import { notify } from '../../utils/toaster';
import { AddForm } from './addForm.components';

export default class AddWebDevelopment extends Component {
    constructor(){
        super();
        this.state = {
            isSubmitting: false
        }
    }

    add = (data) =>{
        this.setState({
            isSubmitting: true
        })
        // Calling API
        httpClient.POST('/webDevelopment/content/', data, true)
            .then(res=>{
                notify.showSucess('Content Added');
                this.props.history.push('/editWebDevelopment')
            })
            .catch(err=>{
                handleError(err)
            })
            .finally(()=>{
                this.setState({
                    isSubmitting: false
                })
            })
    }
    
    render() {
        return (
            <>
                <AddForm
                    isSubmitting={this.state.isSubmitting}
                    title= "Add Web Development & Design Content"
                    submitCallBack = {this.add}
                />
            </>
        )
    }
}
