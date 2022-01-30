import React, { Component } from 'react'
import { handleError } from '../../utils/errorHandler';
import { httpClient } from '../../utils/httpClient';
import { Loader } from '../common/loader/loader.components';
const IMG_URL = process.env.REACT_APP_IMG_URL;

export class ViewBlog extends Component {
    _isMounted = false;

    constructor(){
        super();
        this.state ={
            blog: [],
            isLoading: false
        }
    }

    componentDidMount(){
        this._isMounted = true;

        this.setState({
            isLoading: true
        })
        this.contentId = this.props.match.params['id'];
        httpClient.GET(`/blog/${this.contentId}`)
            .then(res=>{
                if(this._isMounted) {

                this.setState({
                    blog: res.data
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
    componentWillUnmount() {
        this._isMounted = false;
      }
    render() {
        let content = this.state.isLoading
            ? < Loader />
            : <>
                        <div className='container-fluid text-center mb-5'>
                    <img src={`${IMG_URL}/${this.state.blog.img}`} className='img-fluid' alt='blog-img' />
                    </div>
                <div className='container col-11 col-md-8 col-sm-10 mb-5'>
                    <h1 className='mb-5'> {this.state.blog.title} </h1>
                    <p>
                        {this.state.blog.content}
                    </p>
                </div>
            </>
        return (
            <section className='mt-5'>
                        
                {content}
                        
            </section>
        )
    }
}
