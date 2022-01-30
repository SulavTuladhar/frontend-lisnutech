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
    img: []
}
  
export class EditFourthPage extends Component {
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
        
        httpClient.GET(`/page/fourth-pages/${this.productId}`, true)
        .then(res=>{
            if(this._isMounted) {

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
        httpClient.UPLOAD('PUT',`/page/fourth-pages/${this.productId}`, this.state.data, this.state.fileToUpload)
            .then(res=>{
                notify.showInfo('content Updated');
                this.props.history.push('/edit-home')
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
        console.log('images >>', this.state.data.img)
        return (
            <section section className='fourth-page container-fluid'>
                <form onSubmit={this.onSubmit} className='container-fluid form' noValidate>
                    <div className='row'>
                    <div data-aos="fade-left" className='col-12 col-lg-3 pt-5 pb-5 d-flex flex-column align-items-center d-lg-block' style={{background: "#000", color: "#fff",height: "80vh"}}>
                     <label htmlFor="firstTitle"> First Title  </label>
                    <input type="text" name="firstTitle" id="firstTitle" value={this.state.data.firstTitle || ''} onChange={this.handleChange} className='form-control' />

                    <label htmlFor="firstDescription"> First Description  </label>
                     <textarea rows="6" className='form-control' name="firstDescription" id="firstDescription" value={this.state.data.firstDescription || ''} onChange={this.handleChange} />
                     </div>

                     <div className='col-12 col-lg-3 pt-5 pb-5 d-flex flex-column align-items-center d-lg-block' style={{height: "80vh", backgroundColor: "white", zIndex: "100"}}>
                     <label htmlFor="middleDescription"> Middle Description  </label>
                     <textarea rows="6" className='form-control' name="middleDescription" id="middleDescription" value={this.state.data.middleDescription || ''} onChange={this.handleChange} />
                     </div>

                     <div data-aos="fade-right" className='col-12 col-lg-3 pt-5 d-flex flex-column align-items-center d-lg-block ' style={{background: "#000", color: "#fff",height: "80vh"}}>
                     <label htmlFor="secondTitle"> Second Title  </label>
                     <input type="text" className='form-control' name="secondTitle" id="secondTitle" value={this.state.data.secondTitle || ''} onChange={this.handleChange} />

                     <label htmlFor="secondDescription"> Second Description  </label>
                     <textarea rows="6" type="text" className='form-control' name="secondDescription" id="secondDescription" value={this.state.data.secondDescription || ''} onChange={this.handleChange} />
                     </div>
                     <div className='col-12 d-none d-lg-block col-md-6 col-lg-3 px-0' style={{height: "80vh"}}>
                        <input type="file" className='form-control'  onChange={this.handleChange} />
                        <img src={`${IMG_URL}/${this.state.data.img}`} style={{height: "100%", width: "100%"}} alt='fourth-page-img' />
                     </div>
                     <button className='btn btn-primary mb-5 mt-2' style={{width: "20vw"}}> Submit </button>
                    </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                </form>
            </section>
        
        )
    }
}
