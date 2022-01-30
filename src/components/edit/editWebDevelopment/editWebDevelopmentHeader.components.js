import React, { Component } from 'react'
import { handleError } from '../../../utils/errorHandler';
import { httpClient } from '../../../utils/httpClient';
import { notify } from '../../../utils/toaster';
// import { useParams } from 'react-router-dom';

const defaultForm = {
    topTitle: '',
    topDescription: '',
    header: ''
}

export class EditWebDevelopmentHeader extends Component {
    _isMounted = false;

    constructor(){
        super();
        this.state = {
            data: { ...defaultForm },
            isLoading: false
        }
    }

    componentDidMount(){
        this._isMounted = true;

        this.pageId = this.props.match.params['id'];
        httpClient.GET(`/webDevelopment/${this.pageId}`, true)
            .then(res=>{
                if(this._isMounted) {

                this.setState({
                    data: {
                        ...defaultForm,
                        ...res.data
                    }
                })
            }
            })
            .catch(err=>{
                handleError(err);
            })
    }

    handleChange = e =>{
        let {name,value} = e.target;
        this.setState(perState =>({
            data: {
                ...perState.data,
                [name]: value
            }
        }))
    }

    onSumbits = e =>{
        e.preventDefault();
        this.setState({
            isSubmitting: true
        })
        httpClient.PUT(`/webDevelopment/${this.pageId}`, this.state.data, true)
            .then(res=>{
                notify.showInfo('content Updated');
                this.props.history.push('/editWebDevelopment')
            })
            .catch(err=>{
                notify.showError(err)
                this.setState({
                    isSubmitting: false
                })
            })
    }

    componentWillUnmount() {
        this._isMounted = false;
      }
    render() {
        return (
            <section section className='container-fluid' style={{height: '90vh', display: 'flex'}}>
                <div className='container d-flex align-items-center'>
                    <form onSubmit={this.onSumbits} className='container-fluid form' noValidate>
                        <div className='row'>
                            <div className='col-12 text-center'>
                            <h1> Edit Web Development & Design's Titles </h1> 
                            </div>
                            <div className='col-12'>
                                <label htmlFor='title'> Top Title </label>
                                <input type='text' name='topTitle' id='title' value={this.state.data.topTitle || ''} onChange={this.handleChange} className='form-control' />
                            </div>

                            <div className='col-12'>
                                <label htmlFor='description'> Top Description </label>
                                <input type='text' name='topDescription' id='description' value={this.state.data.topDescription || ''} onChange={this.handleChange} className='form-control' />
                            </div>

                            <div className='col-12'>
                                <label htmlFor='header'> Header </label>
                                <input type='text' name='header' id='header' value={this.state.data.header || ''} onChange={this.handleChange} className='form-control' />
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
