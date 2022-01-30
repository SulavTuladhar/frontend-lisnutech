import React, { Component } from 'react'
import { handleError } from '../../utils/errorHandler';
import { httpClient } from '../../utils/httpClient';
import { Link } from 'react-router-dom';
import { notify } from '../../utils/toaster';

import './socialMedia.components.css'
import { Loader } from '../common/loader/loader.components';

export class SocialMediaManagement extends Component {
    constructor(){
        super();
        this.state = ({
            isLoading: false,
            contents : []
        })
    }

    componentDidMount(){
        httpClient.GET('/socialMedia/', true)
            .then(res=>{
                this.setState({
                    contents: res.data
                })
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
        const confirmation = window.confirm('Are you sure to remove ?');
        if(confirmation){
            // Procced with remove
            httpClient.DELETE(`/socialMedia/${id}`, true)
                .then(res=>{
                    notify.showInfo("Product removed");
                    const {contents} = this.state;
                    contents.splice(index,1);
                    this.setState({
                        contents
                    })
                })
                .catch(err=>{
                    handleError(err)
                })
        }
    }

    render() {
        let content = this.state.isLoading
            ? < Loader/>
            : <>
                {
                            (this.state.contents || []).map((content,index)=>(
                                this.props.dashboard
                                 ?  <div className='row mb-5' key={index}>
                                        <h4 className='col-12 col-md-6 col-lg-4'> {content.title} </h4>
                                        <p className='col-12 col-md-6 col-lg-6 d-flex align-items-center mt-2 ' > {content.description} </p>
                                        <div className='col-12 col-md-6 col-lg-2 d-flex flex-column align-items-center justify-content-around'>
                                            <button className='btn btn-primary'> <Link to={`/edit-socialMedia/${content._id}`} style={{color: "#fff"}}>  edit </Link> </button>
                                            <button className='btn btn-primary' onClick={()=>this.removeContent(content._id,index)}> delete </button>
                                        </div>
                                    </div>  
                                 : <div className='row mb-5' key={index}>
                                        <h2 className='col-12 col-md-6 col-lg-4'> {content.title} </h2>
                                        <p className='col-12 col-md-6 col-lg-8 d-flex align-items-center mt-2'> {content.description} </p>
                                    </div>   
                            ))
                }

                            

                </>

        return (
            <section >
            <div>
                <div className='container'>
                <img src='./images/socialmedia.jpg' className='img-fluid' alt='social-media-logo'/>
                </div>
            </div>
            <div className='mb-5 pb-5 mt-5 pt-5'>
                <div className='container' >
                    
                    {content}
                {
                    this.props.dashboard
                        ?    
                        <Link to="addSocialMedia">
                    <div className='row mb-5 parent-div'>
                        <div className='col-12 show-on-hover'> <img src='./images/add-btn.svg' alt='icon'/>  </div>
                        <div className='col-12 col-md-6 col-lg-3 child-div'>  </div>
                        <div className='col-12 col-md-6 col-lg-8 d-flex align-items-center child-div' >  </div>
                    
                    </div>  
                        </Link>
                        : ''
                }
                <h2> What Social Media Offers? </h2>
                                    <div className='row'>
                                        <div className='col-12 col-md-6 col-lg-3'> <img src='./images/sound.jpg' alt='base-img' className='img-fluid'/> </div>
                                        <div className='col-12 col-md-6 col-lg-3'> <img src='./images/like.jpg' alt='base-img' className='img-fluid'/> </div>
                                        <div className='col-12 col-md-6 col-lg-3'> <img src='./images/people.jpg' alt='base-img' className='img-fluid'/> </div>
                                        <div className='col-12 col-md-6 col-lg-3'> <img src='./images/sales.jpg' alt='base-img' className='img-fluid'/> </div>
                                    </div>
                                </div>
                            </div>
            </section>
        )
    }
}
