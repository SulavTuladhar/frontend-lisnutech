import React, { Component } from 'react'
import { handleError } from '../../utils/errorHandler';
import { httpClient } from '../../utils/httpClient';
import { notify } from '../../utils/toaster';
import { AddForm } from './addForm.components';

export class AddGraphicsDesign extends Component {
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
        httpClient.POST(`/graphicsDesign`,data,true)
            .then(res=>{
                notify.showSucess('content added sucessfully');
                this.props.history.push('/editGraphicsDesign')
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
                    title = "Add Graphics Design Content"
                    submitCallBack = {this.add}
                />
            </>
        )
    }
}
