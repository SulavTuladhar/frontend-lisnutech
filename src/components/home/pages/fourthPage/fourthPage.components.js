import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { handleError } from '../../../../utils/errorHandler';
import { httpClient } from '../../../../utils/httpClient';
import { Loader } from '../../../common/loader/loader.components';
const IMG_URL = process.env.REACT_APP_IMG_URL;

export class FourthPage extends Component {
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

        httpClient.GET('/page/fourth-page', true)
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
            ? <Loader/>
            : <>
                {
                    (this.state.contents || []).map((product,index)=> (
                      this.props.dashboard
                        ?   <section className='fourth-page container-fluid pt-2 mt-5'  style={{borderTop: "1px solid grey"}} key={index}>
                                <button className='btn btn-primary mb-2'> <Link to={`/fourthPage/${product._id}`} style={{color: "#fff"}}> edit </Link> </button>
                                <div className='row' key={index}>
                                    <div className='col-12 col-lg-3 pt-5 pb-5 d-flex flex-column align-items-center d-lg-block' style={{background: "#000", color: "#fff",height: "80vh"}}>
                                        <h1> {product.firstTitle} </h1>
                                        <p> {product.firstDescription} </p>
                                    <div className='white-button mt-4'> LEARN MORE </div>
                                    </div>
                        
                                    <div className='col-12 col-lg-3 pt-5 pb-5 d-flex flex-column align-items-center d-lg-block' style={{height: "80vh"}}>
                                        <p className='mt-5 pt-5'> {product.middleDescription} </p>
                                    </div>
                        
                                    <div className='col-12 col-lg-3 pt-5 d-flex flex-column align-items-center d-lg-block ' style={{background: "#000", color: "#fff",height: "80vh"}}>
                                        <h1> {product.secondTitle} </h1>
                                        <p className='pt-3'> {product.secondDescription} </p>
                                    <div className='white-button mt-4'> SEE OUR WORK </div>
                                    </div>
                        
                                    <div className='col-12 d-none d-lg-block col-md-6 col-lg-3 px-0' style={{height: "80vh"}}>
                                        <img src={`${IMG_URL}/${product.img}`} style={{height: "100%", width: "100%"}} alt='fourth-page-img' />
                                    </div>
                                </div>
                            </section>
                        :  <section className='fourth-page container-fluid' key={index}>
                                <div className='row' key={index}>
                                    <div data-aos="fade-left" className='col-12 col-lg-3 pt-5 pb-5 d-flex flex-column align-items-center d-lg-block' style={{background: "#000", color: "#fff",height: "80vh"}}>
                                        <h1> {product.firstTitle} </h1>
                                        <p> {product.firstDescription} </p>
                                        <div className='white-button mt-4'> LEARN MORE </div>
                                    </div>

                                    <div className='col-12 col-lg-3 pt-5 pb-5 d-flex flex-column align-items-center d-lg-block' style={{height: "80vh", background: '#fff'}}>
                                        <p className='mt-5 pt-5'> {product.middleDescription} </p>
                                    </div>

                                    <div data-aos="fade-right" className='col-12 col-lg-3 pt-5 d-flex flex-column align-items-center d-lg-block ' style={{background: "#000", color: "#fff",height: "80vh"}}>
                                        <h1> {product.secondTitle} </h1>
                                        <p className='pt-3'> {product.secondDescription} </p>
                                        <div className='white-button mt-4'> SEE OUR WORK </div>
                                    </div>

                                    <div className='col-12 d-none d-lg-block col-md-6 col-lg-3 px-0' style={{height: "80vh"}}>
                                        <img src={`${IMG_URL}/${product.img}`} style={{height: "100%", width: "100%"}} alt='fourth-page-img' />
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
