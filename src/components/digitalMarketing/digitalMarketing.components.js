import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { handleError } from '../../utils/errorHandler';
import { httpClient } from '../../utils/httpClient';
import { notify } from '../../utils/toaster';
import { Loader } from '../common/loader/loader.components';

export class DigitalMarketing extends Component {
    _isMounted = false;

    constructor(){
        super();
        this.state = {
            isLoading: false,
            content: []
        }
    }

    componentDidMount(){
        this._isMounted = true;

        this.setState({
            isLoading: true
        })
        httpClient.GET('/digitalMarketing', true)
            .then(res=>{
                if(this._isMounted) {

                this.setState({
                    content: res.data
                })
            }
            })
            .catch(err=>{
                handleError(err)
            })
            .finally(()=>{
                this.setState({
                    isLoading: false
                })
            })
    }

    removeContent(id,index){
        const confirmation = window.confirm("Are you sure to remove ?");
        if(confirmation){
            httpClient.DELETE(`/digitalMarketing/${id}`,true)
                .then(res=>{
                    notify.showInfo('Content removed Sucessful');
                    const { content } = this.state;
                    content.splice(index,1);
                    this.setState({
                        content
                    })
                })
                .catch(err=>{
                    handleError(err)
                })
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
      }
    render() {
        let content = this.state.isLoading
            ? < Loader />
            : <>
                {
                    (this.state.content || []).map((content,index) => (
                        this.props.dashboard
                            ? <div className='row mb-5' key={index}>
                                    <div className='col-4'> <h2> {content.title} </h2> </div>
                                    <div className='col-6'> 
                                        <p>  
                                            {content.description}
                                        </p> 
                                    </div>
                                    <div className='col-12 col-md-6 col-lg-2 d-flex flex-column align-items-center justify-content-around'>
                                            <button className='btn btn-primary'> <Link to={`/editDigitalMarketingContent/${content._id}`} style={{color: "#fff"}}>  edit </Link> </button>
                                            <button className='btn btn-primary' onClick={()=>this.removeContent(content._id,index)}> delete </button>
                                    </div>
                            </div>
                            : 
                            <div className='row mb-5' key={index}>
                                <div className='col-12 col-lg-4'> <h2> {content.title} </h2> </div>
                                <div className='col-12 col-lg-8'> 
                                    <p>  
                                        {content.description}
                                    </p> 
                                </div>
                            </div>

                            
                    ))
                }
            </>
        return (
            <section  style={{marginTop: '-8vh'}}>
                <section className='d-flex align-items-center text-center mb-5' style={{height: "70vh", background: "#000", color: "#fff"}}>
                    <div className='container'>
                        <h1> Digital Marketing </h1>
                    </div>
                </section>

                <section className='pt-5'>
                    <div className='container'>
                        {content}
                        {
                    this.props.dashboard
                        ?    
                        <Link to="/addDigitalMarketing">
                    <div className='row mb-5 parent-div'>
                        <div className='col-12 show-on-hover'> <img src='./images/add-btn.svg' alt='icon'/>  </div>
                        <div className='col-12 col-md-6 col-lg-3 child-div'>  </div>
                        <div className='col-12 col-md-6 col-lg-8 d-flex align-items-center child-div' >  </div>
                    
                    </div>  
                        </Link>
                        : ''
                }
                    </div>
                </section>
            </section>
        )
    }
}
