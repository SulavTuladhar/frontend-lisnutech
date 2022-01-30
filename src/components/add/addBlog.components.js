import React, { Component } from 'react'
import { handleError } from '../../utils/errorHandler';
import { httpClient } from '../../utils/httpClient';
import { notify } from '../../utils/toaster';
import { AddForm } from './addForm.components';

export class AddBlog extends Component {
    constructor(){
        super();
        this.state = {
            isSubmitting: false
        }
    }

    add = (data, file)=>{
        this.setState({
            isSubmitting: true
        })
        // httpClient.POST(`/blog`, data, true)
   
        httpClient.UPLOAD('POST', '/blog', data,file)
            .then(res=>{
                notify.showSucess('Blog added sucessfully');
                this.props.history.push('/editBlog');
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
                    isSubmitting= {this.state.isSubmitting}
                    title = "Add blog"
                    submitCallBack ={this.add}
                    addBlog
                />
            </>
        )
    }
}
