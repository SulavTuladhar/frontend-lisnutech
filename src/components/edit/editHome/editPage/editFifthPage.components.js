import React, { Component } from 'react'
import { handleError } from '../../../../utils/errorHandler';
import { httpClient } from '../../../../utils/httpClient';
import { notify } from '../../../../utils/toaster';
const IMG_URL = process.env.REACT_APP_IMG_URL;

const defaultForm = {
    title: '',
    description: '',
}

const validationFields = {
    title: '',
    description: '',
}
  
export class EditFifthPage extends Component {
    _isMounted = false;

    constructor(){
        super();
        this.state = {
            data: {...defaultForm},
            error: {...validationFields},
            isLoading: false,
            fileToUpload: []
        }
    }
    componentDidMount(){
        this._isMounted = true;

        this.productId = this.props.match.params['id'];
        httpClient.GET(`/page/fifth-pages/${this.productId}`, true)
        .then(res=>{
            if (this._isMounted) {

            this.setState({
                data: {
                    // ...defaultForm,
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
        let {name,value,type,files} = e.target;
        if(type === 'file'){
            // Single File Upload
            return this.setState({
                fileToUpload: files
            })
        }
  
        this.setState(prestate=>({
          data:{
            ...prestate.data,
            [name]: value
          }
        }),()=>{
          //form validation here
        })
      }

      onSubmit = e =>{
        e.preventDefault();
        this.setState({
            isSubmitting: true
        })
        httpClient.UPLOAD('PUT',`/page/fifth-pages/${this.productId}`, this.state.data, this.state.fileToUpload)
            .then(res=>{
                notify.showInfo('Blog Updated');
                this.props.history.push('/editBlog')
            })
            .catch(err=>{
                notify.showError(err)
                this.setState({
                    isSubmitting: false
                })
            })
            .finally(()=>{
                this.setState({
                    isLoading: false
                })
            })
      }
      componentWillUnmount() {
        this._isMounted = false;
      }

    render() {

        return (
            <section className='container-fluid'>
               <form onSubmit={this.onSubmit} className='container-fluid form' noValidate>
               <div className='row '>
                 <div data-aos="fade-right" className='col-12 col-lg-5 pt-5 pb-5 d-flex flex-column align-items-center d-lg-block' style={{background: "#000", color: "#fff", height: "80vh"}}>

                <label htmlFor="title"> Name  </label>
               <input type="text" className='form-control' name="title" id="title" value={this.state.data.title || ''} onChange={this.handleChange} />
                
               <label htmlFor="description"> Description  </label>
                <textarea rows="6" type="text" className='form-control' name="description" id="description" value={this.state.data.description || ''} onChange={this.handleChange} />
                </div>
                <div className='col-12 col-lg-7 pt-5 d-flex flex-column align-items-center d-lg-block'>
                     <h1> Our Team </h1>
                     <input type='file' onChange={this.handleChange} className='form-control'/>
                     <img src={`${IMG_URL}/${this.state.data.img}`} alt='blog-img'/>
                 </div>
                 <button className='btn btn-primary mb-5 mt-2' style={{width: "20vw"}}> Submit </button>
                </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
              </form>
            </section>
        //     <section  key={index} className='container-fluid'>
        //     <div className='row '>
        //         <div data-aos="fade-right" className='col-12 col-lg-5 pt-5 pb-5 d-flex flex-column align-items-center d-lg-block' key={index} style={{background: "#000", color: "#fff", height: "80vh"}}>
        //             <h1 className='mt-5 pt-5' > {content.title} </h1>
        //             <p> {content.description} </p>
        //             <div className='white-button' style={{width: "14rem"}}> LET'S WORK TOGETHER </div>
        //         </div>
        //         <div className='col-12 col-lg-7 pt-5 d-flex flex-column align-items-center d-lg-block'>
        //             <h1> Our Team </h1>
        //         </div>
        //     </div>
        // </section>
        )
    }
}
