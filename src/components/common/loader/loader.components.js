import React, { Component } from 'react'
import './loader.components.css';
export class Loader extends Component {
    render() {
        return (
          <section className='loader-section'>
            <div className="loader">
            <div className="big-circle">
              <div className="small-circle"></div>
            </div>
          </div>
          </section>
        )
    }
}
