import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { handleError } from '../../utils/errorHandler';
import { httpClient } from '../../utils/httpClient';
import { notify } from '../../utils/toaster';
import { Loader } from '../common/loader/loader.components';

import './cssStye.css';
const IMG_URL = process.env.REACT_APP_IMG_URL;

export class Blog extends Component {
    _isMounted = false;

    constructor(){
        super();
        this.state ={
            blogs: [],
            isLoading: false
        }
    }

    componentDidMount(){
        this._isMounted = true;

        this.setState({
            isLoading: true
        })
        httpClient.GET('/blog/', true)
            .then(res=>{
                if(this._isMounted) {

                this.setState({
                    blogs: res.data
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
            httpClient.DELETE(`/blog/${id}`,true)
                .then(res=>{
                    notify.showInfo('Blog removed Sucessful');
                    const { blogs } = this.state;
                    blogs.splice(index,1);
                    this.setState({
                        blogs
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
                        (this.state.blogs || []).map((blog,index)=>(
                            <div className='col-12 col-md-6 col-lg-4 mb-5' key={index}>

                            <div className="card shadow" style={{width: '18rem'}}>
                            <img src={`${IMG_URL}/${blog.img}`} className="card-img-top" alt="seo-img" />
                            <div className="card-body">
                            <h5 className="card-title">{blog.title}</h5>
                            <p className="card-text">{blog.description}</p>
                            <Link to={`/viewBlog/${blog._id}`} className="btn btn-primary">See more</Link>
                            {
                                this.props.dashboard && (
                                    <>
                                    <Link to={`/editSingleBlog/${blog._id}`} className="btn btn-primary ml-5">Edit Blog</Link>
                                    <button className='btn btn-primary mt-2' onClick={()=>this.removeContent(blog._id,index)}> delete </button>
                                    </>
                                )
                            }
                            </div>
                            </div>
                            </div>
                        ))
                    }
                </>
        return (
            <section>
                <section className='container-fluid d-flex' style={{height: "60vh"}}>
                    <div className='container d-flex align-items-center justify-content-center'>
                        <h1> Blog </h1>
                    </div>
                </section>
                <section className='mt-5 mb-5 pt-5 -b-5'>
                    <div className='container'>

                        <div className='row ml-sm-5'>
                            

            {
                this.props.dashboard
                    ? <div className='col-12 col-md-6 col-lg-4 mb-5'>
                    <div className="card shadow" style={{width: '18rem'}}>
                    <div className="card-img-top bg-dark" style={{height: "10rem"}}> </div>
                    <div className="card-body" >
                    <h5 className="card-title"> Add Blog</h5>
                    <p className="card-text">Add Blog</p>
                    <Link to="addBlog" className="btn btn-primary">Click here to add Blog</Link>
                    </div>
                    </div>
                </div>
                    : ''
            }

                {content}
                           </div>

                    </div>
                </section>
            </section>
        )
    }
}
