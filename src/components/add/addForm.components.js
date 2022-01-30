import React, { Component } from 'react'

const defaultForm = {
    title: '',
    description: ''
}

export class AddForm extends Component {
    constructor(){
        super();
        this.state = {
            data: { ...defaultForm },
            isSubmitting: true,
            fileToUpload: []
        }
    }

    handleChange = e =>{
        let {name, value, type, files} = e.target;
        if(type === 'file'){
            // Single File Upload
            return this.setState({
                fileToUpload: files
            })
        }
        this.setState(preState=>({
            data: {
                ...preState.data,
                [name]: value
            }
        }))
    }

    onSumbit = e =>{
        e.preventDefault();
        this.props.submitCallBack(this.state.data,this.state.fileToUpload)
    }

    render() {
        return (
            <section className='container-fluid d-flex mt-5'>
                <div className='container d-flex flex-column align-items-center justify-content-center'>
                <h1> {this.props.title} </h1>
                <form onSubmit={this.onSumbit} noValidate>

                    <label htmlFor="title"> Title </label>
                    <input type="text" name="title" id="title" onChange={this.handleChange}/>

                    <label htmlFor="description"> Description </label>
                    <input type="text" name="description" id="description" onChange={this.handleChange}/>

                    {
                        this.props.addBlog && (
                            <>
                                <label> Content </label>
                                <textarea rows={14}  type="text" name='content' className='form-control' onChange={this.handleChange} />
                                <label> Choose image </label>
                                <input type="file" className='form-control' onChange={this.handleChange} />
                            </>
                        )
                    }
                 
                    <button className='btn btn-primary'> Sumbit </button>
                </form>
                </div>
                
            </section>
        )
    }
}
