import React, { Component } from 'react'
import { handleError } from '../../utils/errorHandler';
import { httpClient } from '../../utils/httpClient';
import { notify } from '../../utils/toaster';
import { AddForm } from './addForm.components';

export class AddSocialMediaManagement extends Component {
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
        // API Call
        httpClient.POST('/socialMedia/', data, true)
            .then(res=>{
                notify.showSucess('Content added');
                this.props.history.push('/editSocialMedia');
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
                    title = "Add Social Media Content"
                    submitCallBack = {this.add}
                />
            </>
        )
    }
}
