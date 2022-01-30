import React, { Component } from 'react'
import { handleError } from '../../../utils/errorHandler';
import { httpClient } from '../../../utils/httpClient';
import { notify } from '../../../utils/toaster';

const defaultForm = {
    title: '',
    description: ''
}

export class EditDigitalMarketingContent extends Component {
    _isMounted = false;

    constructor(){
        super();
        this.state = {
            data: {
                ...defaultForm
            },
            isSubmitting: false
        }
    }

    componentDidMount(){
        this._isMounted = true;
        this.contentId = this.props.match.params['id'];
        httpClient.GET(`/digitalMarketing/${this.contentId}`,true)
            .then(res=>{
                if (this._isMounted) {
                this.setState({
                    data: {
                        ...res.data
                    }
                })
            }
            })
            .catch(err=>{
                handleError(err)
            })
    }

    handleChange = e =>{
        let { name, value } = e.target;

        this.setState(preState=>({
            data:{
                ...preState.data,
                [name]: value
            }
        }))
    }
    componentWillUnmount() {
        this._isMounted = false;
      }

    onSubmit = e =>{
        e.preventDefault();
        this.setState({
            isSubmitting: true
        })
        httpClient.PUT(`/digitalMarketing/${this.contentId}`, this.state.data, true)
            .then(res=>{
                notify.showInfo('Content Updatedd hai');
                this.props.history.push('/editDigitalMarketing')
            })
            .catch(err=>{
                notify.showError(err)
                this.setState({
                    isSubmitting: false
                })
            })
            .finally(()=>{
                this.setState({
                    isSubmitting: false
                })
            })
    }

    render() {
        return (
            <section section className='container-fluid' style={{height: '90vh', display: 'flex'}}>
                <div className='container d-flex align-items-center'>
                    <form onSubmit={this.onSubmit} className='container-fluid form' noValidate>
                        <div className='row'>
                            <div className='col-12 text-center'>
                            <h1> Edit Social Media Management Content </h1> 
                            </div>
                            <div className='col-12'>
                                <label htmlFor='title'> Title </label>
                                <input type='text' name='title' id='title' value={this.state.data.title || ''} onChange={this.handleChange} className='form-control' />
                            </div>

                            <div className='col-12'>
                                <label htmlFor='description'> Description </label>
                                <input type='description' name='description' id='description' value={this.state.data.description || ''} onChange={this.handleChange} className='form-control' />
                            </div>
                            <div className='col-12 text-center'>
                                <button className='btn btn-primary mb-5 mt-2' style={{width: "14vw", height: '6vh'}}> Submit </button>
                            </div>
                        </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                    </form>
                </div>
            </section>
        )
    }
}
