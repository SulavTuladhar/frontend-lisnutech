import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { handleError } from '../../../../utils/errorHandler';
import { httpClient } from '../../../../utils/httpClient';
import Aos from 'aos';
import 'aos/dist/aos.css'

import './secondPage.components.css';
import { Loader } from '../../../common/loader/loader.components';
const IMG_URL = process.env.REACT_APP_IMG_URL;


export class SecondPage extends Component {
    _isMounted = false;

    constructor(){
        super();

        this.state = ({
            isLoading: false,
            contents: []
        })
        
    }
    componentDidMount(){
        this._isMounted = true;
        Aos.init({duration: 2000});
        httpClient.GET('/page/second-page', true)
        .then(res=>{
            if (this._isMounted) {
            this.setState({
                contents: res.data
            })
        }
        })
        .catch(err=>{
            handleError(err);
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
        ? < Loader/>
        : <>
                        {
                            (this.state.contents || []).map((content,index) => (
                                this.props.dashboard
                                    ? 
                                    <section key={index} className='second-page container-fluid pt-2 mt-5' style={{borderTop: "1px solid grey" ,overflowX: 'hidden'}} >
                                        <button className='btn btn-primary mb-2'> <Link to={`/secondPage/${content._id}`} style={{color: "#fff"}}> edit </Link> </button>
                                        <div className='row'  >
                                                <div className='col-12 col-lg-5 d-flex d-lg-block flex-column align-items-center pt-5' style={{height: "80vh"}} >
                                                <h1> {content.firstTitle} </h1>
                                                <p> {content.firstDescription} </p>
                                                <div className='black-button'> DROP US A LINE </div>
                                            </div>
                                
                                            <div className='col-12 col-lg-4 px-0'  style={{height: "80vh"}}>
                                                <img src={`${IMG_URL}/${content.img}`} style={{height: "100%", width: "100%"}} alt='second-page-img' />
                                            </div>
                                            <div className='col-12 col-lg-3 d-flex d-lg-block flex-column align-items-center aside-img pt-5 ' style={{color: "#fff", background: "#000", height: "80vh"}}>
                                                <h1 > {content.secondTitle} </h1>
                                                <p> {content.secondDescription} </p>
                                                <div className='white-button'> LEARN MORE </div>
                                                </div>
                                        </div>
                                    </section>
                                    :    
                                        <section key={index} className='second-page container-fluid mt-1' style={{overflowX: 'hidden'}} >
                                            <div className='row'  key={index}>
                                                <div className='col-12 col-lg-5 d-flex d-lg-block flex-column align-items-center pt-5' style={{height: "80vh"}} >
                                                <h1> {content.firstTitle} </h1>
                                                <p> {content.firstDescription} </p>
                                                <div className='black-button'> DROP US A LINE </div>
                                            </div>
                                
                                            <div className='col-12 col-lg-4 px-0'  style={{height: "80vh"}}>
                                            <img src={`${IMG_URL}/${content.img}`} style={{height: "100%", width: "100%"}} alt='second-page-img' />

                                            </div>
                                            <div data-aos="fade-left" className='col-12 col-lg-3 d-flex d-lg-block flex-column align-items-center aside-img pt-5 ' style={{color: "#fff", background: "#000", height: "80vh"}}>
                                                <h1 > {content.secondTitle} </h1>
                                                <p> {content.secondDescription} </p>
                                                <div className='white-button'> LEARN MORE </div>
                                                </div>
                                        </div>
                                    </section>
                                ))
                        }
        
                </>
        return (
            <>
                {content}
            </>
        )
    }
}
