import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { handleError } from '../../../../utils/errorHandler';
import { httpClient } from '../../../../utils/httpClient';
import { Loader } from '../../../common/loader/loader.components';
import './thirdPage.components.css'
const IMG_URL = process.env.REACT_APP_IMG_URL;

export class ThirdPage extends Component {
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
        httpClient.GET('/page/third-page', true)
            .then(res=>{
                if(this._isMounted) {
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
            ? <Loader />
            : <>
                {
                    (this.state.contents || []).map((content,index)=>(
                        this.props.dashboard
                            ? <section className='third-page container-fluid mt-2 pt-2' style={{borderTop: "1px solid grey"}}  key={index}>
                                <button className='btn btn-primary mb-2'> <Link to={`/thirdPage/${content._id}`} style={{color: "#fff"}}> edit </Link>  </button>
                                <div className='row'>
                                    <div className='col-12 col-lg-5 px-0'>
                                        <img src={`${IMG_URL}/${content.img}`} className='img-fluid' alt='third-page-img'/>
                                    </div>
                                    <div className='col-12 col-lg-4 pt-5 d-flex flex-column align-items-center d-lg-block'  style={{height: "80vh", background: '#fff', zIndex: '10'}}>
                                        <h1> Skill At Lisnutech </h1>
                                        <ol>
                                            <li>Website Developement</li>
                                            <li>Digital Marketing</li>
                                            <li>Social Media Handeling</li>
                                            <li>Graphic Design</li>
                                            <li>Web Design</li>
                                            <li>SEO</li>
                                        </ol>
                                    </div>
                                    <div className='col-12 col-lg-3 pt-5 pb-5 d-flex align-items-center flex-column d-lg-block' key={index} style={{background: "#000", color: "#fff", height: "80vh"}}>
                                        <h1> {content.title} </h1>
                                        <p> {content.description} </p>
                                        <div className='white-button' style={{width: "14rem", height: "4rem"}}> GROW YOUR BUSSINESS </div>
                                    </div>
                                </div>      
                            </section>
                            : <section className='third-page container-fluid' key={index} >
                                <div className='row'>
                                    <div className='col-12 col-lg-5 px-0 '>
                                        <img src={`${IMG_URL}/${content.img}`} style={{height: '100%', width: '100%'}} alt='third-page-img'/>
                                    </div>
                                    <div className='col-12 col-lg-4 pt-5 d-flex flex-column align-items-center d-lg-block'  style={{height: "80vh", background: '#fff', zIndex: '10'}}>
                                        <h1> Skill At Lisnutech </h1>
                                        <ol>
                                            <li>Website Developement</li>
                                            <li>Digital Marketing</li>
                                            <li>Social Media Handeling</li>
                                            <li>Graphic Design</li>
                                            <li>Web Design</li>
                                            <li>SEO</li>
                                        </ol>
                                    </div>
                                    <div className='col-12 col-lg-3 pt-5 pb-5 d-flex align-items-center flex-column d-lg-block' data-aos="fade-right" key={index} style={{background: "#000", color: "#fff", height: "80vh"}}>
                                        <h1> {content.title} </h1>
                                        <p> {content.description} </p>
                                        <div className='white-button' style={{width: "14rem", height: "4rem"}}> GROW YOUR BUSSINESS </div>
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
