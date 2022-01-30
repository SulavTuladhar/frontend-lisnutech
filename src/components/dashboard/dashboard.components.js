import React, { Component } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export class Dashboard extends Component {
    render() {
        return (
            <section className='mt-5'>
                <h1><Link to="/edit-home">  EDIT HOME PAGE </Link> </h1>
                <h1><Link to="/editSocialMedia">  EDIT SOCIAL MEDIA MANAGEMENT PAGE </Link> </h1>
                <h1><Link to="/editWebDevelopment">  EDIT WEB DESIGN AND DEVELOPMENT </Link> </h1>
                <h1><Link to="/editDigitalMarketing">  EDIT DIGITAL MARKETING </Link> </h1>
                <h1><Link to="/editGraphicsDesign">  EDIT GRAPHICS DESIGN </Link> </h1>
                <h1><Link to="/editBlog">  EDIT BLOG </Link> </h1>
            </section>
        )
    }
}
