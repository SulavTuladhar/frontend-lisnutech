import React, { Component } from 'react'
import { handleError } from '../../utils/errorHandler';
import { httpClient } from '../../utils/httpClient';
import { notify } from '../../utils/toaster';
import { AddForm } from './addForm.components';

export class AddDigitalMarketing extends Component {
    constructor(){
        super();
        this.state = {
            isSubmitting: false
        }
    }

    add = (data) =>{
        this.setState({
            isSubmitting: false
        })
        // Calling API
        httpClient.POST(`/digitalMarketing/`, data, true)
            .then(res=>{
                notify.showSucess('content Added');
                this.props.history.push('/editDigitalMarketing')
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
                    title = "Add Digital Marketing Contnet"
                    submitCallBack ={this.add}
                />
            </>
        )
    }
}
