import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { handleError } from '../../../../utils/errorHandler';
import { httpClient } from '../../../../utils/httpClient';
import { Loader } from '../../../common/loader/loader.components';
const IMG_URL = process.env.REACT_APP_IMG_URL;

export class FifthPage extends Component {
    _isMounted = false;

    constructor(props){
        super(props);

        this.state = ({
            isLoading: false,
            contents: []
        })
    }

    componentDidMount(){
        this._isMounted = true;

        httpClient.GET('/page/fifth-page', true)
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
            ? <Loader />
            : <>
                {
                    (this.state.contents || []).map((content,index)=>(
                        this.props.dashboard
                            ? <section key={index} className='container-fluid pt-2 mt-5' style={{borderTop: "1px solid grey"}}>
                                <button className='btn btn-primary mb-2'> <Link to={`/fifthPage/${content._id}`} style={{color: "#fff"}}> edit </Link> </button>
                                <div className='row '>
                                    <div className='col-12 col-lg-5 pt-5 pb-5 d-flex flex-column align-items-center d-lg-block' key={index} style={{background: "#000", color: "#fff", height: "80vh"}}>
                                        <h1 className='mt-5 pt-5'> {content.title} </h1>
                                        <p> {content.description} </p>
                                        <div className='white-button' style={{width: "14rem"}}> LET'S WORK TOGETHER </div>
                                    </div>
                                    <div className='col-12 col-lg-7 pt-5 d-flex flex-column align-items-center d-lg-block'>
                                        <h1> Our Team </h1>
                                    </div>
                                </div>
                            </section>
                            : <section  key={index} className='container-fluid'>
                                <div className='row '>
                                    <div data-aos="fade-right" className='col-12 col-lg-5 pt-5 pb-5 d-flex flex-column align-items-center d-lg-block' key={index} style={{background: "#000", color: "#fff", height: "80vh"}}>
                                        <h1 className='mt-5 pt-5' > {content.title} </h1>
                                        <p> {content.description} </p>
                                        <div className='white-button' style={{width: "14rem"}}> LET'S WORK TOGETHER </div>
                                    </div>
                                    <div className='col-12 col-lg-7 pt-5 d-flex flex-column align-items-center text-center d-lg-block'>
                                        <h1> Our Team </h1>
                                        <img src={`${IMG_URL}/${content.img}`} alt='Teammate'/>
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

