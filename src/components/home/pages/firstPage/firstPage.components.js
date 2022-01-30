import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './firstPage.components.css';

export class FirstPage extends Component {
    constructor(){
        super();
        this.state = ({

        })
    }
    
    render() {
        return (
            <>
                <section className='first-page d-flex align-items-center mt-2'>
                    <div className='container'>
                        <h1 style={{fontSize: '3rem'}}> GROW YOUR BUSINESS </h1>
                        <h2 className='mt-2'> TARGET NEW CUSTOMER THROUGH SOCIAL MEDIA </h2>
                        <Link to="/contact" style={{textDecoration: 'none'}}>
                        <div className='contact-btn mt-4'> <h6> C O N T A C T S </h6> </div>
                        </Link>
                    </div>
                    <video src='./images/video.mp4' muted loop autoPlay/>
                </section>
            </>
        )
    }
}
