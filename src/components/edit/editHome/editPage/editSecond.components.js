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
  
export class EditSecondPage extends Component {
    _isMounted = false;

    constructor(){
        super();
        this.state = {
            data: {...defaultForm},
            error: {...validationFields},
            isLoading: false,
            fileToUpload: [],
            previousSelectedFile :[]
        }
    }
    componentDidMount(){
        this._isMounted = true;

        this.productId = this.props.match.params['id'];
        httpClient.GET(`/page/second-pages/${this.productId}`, true)
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
        httpClient.UPLOAD('PUT',`/page/second-pages/${this.productId}`, this.state.data, this.state.fileToUpload)
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

        return (
            <section className='container-fluid'>
            {/* <div className='row'> */}

               <form onSubmit={this.onSubmit} className='container-fluid form' noValidate>
               <div className='row' >
                <div className='col-12 col-lg-5 d-flex d-lg-block flex-column align-items-center pt-5' style={{height: "80vh"}} >
                <label htmlFor="firstTitle"> First Title  </label>
               <input type="text" name="firstTitle" id="firstTitle" value={this.state.data.firstTitle || ''} onChange={this.handleChange} className='form-control'/>
               

               <label htmlFor="firstDescription"> First Description  </label>
                <textarea rows="6" type="text" name="firstDescription" id="firstDescription" value={this.state.data.firstDescription || ''} onChange={this.handleChange} className='form-control' />
                </div>



                <div className='col-12 col-lg-4 px-0'  style={{height: "80vh"}}>
               <input type="file"  onChange={this.handleChange} className='form-control'/>

                <img src={`${IMG_URL}/${this.state.data.img}`} style={{height: "100%", width: "100%"}} alt='second-page-img' />
            </div>

            <div data-aos="fade-left" className='col-12 col-lg-3 d-flex d-lg-block flex-column align-items-center aside-img pt-5 ' style={{color: "#fff", background: "#000", height: "80vh"}}>

                <label htmlFor="secondTitle"> Second Title  </label>
                <input type="text" name="secondTitle" id="secondTitle" value={this.state.data.secondTitle || ''} onChange={this.handleChange} className='form-control' />

                <label htmlFor="secondDescription"> Second Description  </label>
                <textarea rows='6' type="text" name="secondDescription" id="secondDescription" value={this.state.data.secondDescription || ''} onChange={this.handleChange} className='form-control' />

                </div>

              </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
              <button className='btn btn-primary mb-5 mt-2' style={{width: "20vw"}}> Submit </button>
              </form>
            {/* <div className='row'  key={index}>
                <div className='col-12 col-lg-5 d-flex d-lg-block flex-column align-items-center pt-5' style={{height: "80vh"}} >
                <h1> {content.firstTitle} </h1>
                <p> {content.firstDescription} </p>
                <div className='black-button'> DROP US A LINE </div>
            </div>

            <div className='col-12 col-lg-4 px-0'  style={{height: "80vh"}}>
                <img src='./images/laptop.jpg' style={{height: "100%", width: "100%"}} />
            </div>
            <div data-aos="fade-left" className='col-12 col-lg-3 d-flex d-lg-block flex-column align-items-center aside-img pt-5 ' style={{color: "#fff", background: "#000", height: "80vh"}}>
                <h1 > {content.secondTitle} </h1>
                <p> {content.secondDescription} </p>
                <div className='white-button'> LEARN MORE </div>
                </div>
        </div> */}
    </section>
        )
    }
}
