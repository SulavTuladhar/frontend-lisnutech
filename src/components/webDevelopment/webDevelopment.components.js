import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { handleError } from '../../utils/errorHandler';
import { httpClient } from '../../utils/httpClient';
import { notify } from '../../utils/toaster';
import { Loader } from '../common/loader/loader.components';

export class WebDevelopment extends Component {
    constructor(){
        super();
        this.state = ({
            isLoading: false,
            content: [],
            posts: []
        })
    }

    componentDidMount(){
        this.setState({
            isLoading: true
        })
        httpClient.GET('/webDevelopment/', true)
            .then(res=>{
                this.setState({
                    content: res.data
                })
                httpClient.GET('/webDevelopment/content/', true)
                    .then(response=>{
                        this.setState({
                            posts: response.data
                        })
                    })
                    .catch(err=>{
                        handleError(err)
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
            httpClient.DELETE(`/webDevelopment/contents/${id}`, true)
                .then(res=>{
                    notify.showInfo("Product removed");
                    const {posts} = this.state;
                    posts.splice(index,1);
                    this.setState({
                        posts
                    })
                })
                .catch(err=>{
                    handleError(err)
                })
        }
    }


    render() {

        let title= this.state.isLoading
            ? <p> Showing Loader here </p>
            : <>
                {
                    (this.state.content || []).map((content,index) => (
                        this.props.dashboard  
                            ? <div key={index} style={{border: "2px solid grey"}}>
                                <section className=' d-flex align-items-center justify-content-center text-center' style={{background: "#000", color: "#fff", height: "80vh"}} key={index}>
                                    <div className='container'>
                                        <h1> {content.topTitle} </h1>
                                        <p> {content.topDescription} </p>
                                    </div>

                                </section>
                                <div className='text-center mt-4'>
                                    <button className='btn btn-primary'> <Link to={`/editWebDevelopmentHeader/${content._id}`} style={{color: "#fff"}}> edit </Link>  </button>
                                    <button className='btn btn-primary ml-4'> delete </button>
                                </div>
                                <section className='d-flex align-items-center justify-content-center' style={{height: "20vh"}}>
                                    <h1> {content.header} </h1>
                                </section>
                            </div>
                            : <div key={index}>
                                <section className='d-flex align-items-center justify-content-center text-center' style={{background: "#000", color: "#fff", height: "80vh"}} >
                                    <div className='container'>
                                        <h1> {content.topTitle} </h1>
                                        <p> {content.topDescription} </p>
                                    </div>
                                </section>
                                <section className='d-flex align-items-center justify-content-center' style={{height: "20vh"}}>
                                    <h1> {content.header} </h1>
                                </section>
                            </div>
                    ))
                }
            </>

        let content = this.state.isLoading
            ? < Loader />
            : <>
                {
                    (this.state.posts || []).map((post,index)=>(
                        this.props.dashboard
                            ? <div className='row mb-5' key={index}>
                                <h4 className='col-12 col-lg-4'> {post.title} </h4>
                                <p className='col-12 col-lg-6'> {post.description} </p>
                                    <div className='col-12 col-md-6 col-lg-2 d-flex flex-column align-items-center justify-content-around'>
                                            <button className='btn btn-primary'> <Link to={`/editWebDevelopmentPost/${post._id}`} style={{color: "#fff"}}>  edit </Link> </button>
                                            <button className='btn btn-primary' onClick={()=>this.removeContent(post._id,index)}> delete </button>
                                    </div>
                            </div>
                            : <div className='row mb-5' key={index}>
                                <h1 className='col-12 col-lg-4 '> {post.title} </h1>
                                <p className='col-12 col-lg-8 '> {post.description} </p>
                            </div>
                    ))
                }
            </>

        return (
            <section style={{marginTop: '-8vh'}}>
                {title}

                <section className='container-fluid mt-5 pt-5'>
                    <div className='container'>
                        
                       {content}
                       {
                    this.props.dashboard
                        ?    
                        <Link to="/addWebDevelopment">
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
