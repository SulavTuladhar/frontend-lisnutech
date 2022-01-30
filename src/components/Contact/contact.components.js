import React, { Component } from 'react';
import emailjs from 'emailjs-com';
import { notify } from '../../utils/toaster';

export class Contact extends Component {
    render() {
        function sendEmail(e){
            e.preventDefault();
        
            emailjs.sendForm("service_ymvhs1r", "template_k1rn6y8", e.target, 'user_P32tRPwXCjkKS9gEFmnSl')
              .then(res=>{
                notify.showInfo('Message sent sucessful')
              })
              .catch(err=>{
                notify.showError('Sorry the server is having some problem. Try again in few minutes.')

              })
            
              let inputs = document.querySelectorAll('input');
              inputs.forEach((input)=> (input.value = ''))

          }
        return (
            <section>
                <div className='container d-flex align-items-center justify-content-center'>
                    <div className='rows mt-5'>
                        <div className='text-center'>
                        <h1> Start a conversation </h1>
                        <p> 
                            Instrested in working together? <br />
                            we should chat. 
                        </p>
                        </div>
                       
                        <form className='form ' onSubmit={sendEmail} >
                        <div className='col-12'>
                            <label htmlFor='name'> Name </label>
                            <input type="text" name="name" id="name"  className='form-control input'/>
                        </div>
                        <div className='col-12'>
                            <label htmlFor='email'> Email Address </label>
                            <input type="email" name="email" id="email" className='form-control input'/>
                        </div>
                        <div className='col-12'>
                            <label htmlFor='number'> Number </label>
                            <input type="number" name="number" id="number" className='form-control input'/>
                        </div>
                        <div className='col-12'>
                            <label htmlFor='subject'> Subject </label>
                            <input type="text" name="subject" id="subject" className='form-control input'/>
                        </div>
                        <div className='col-12'>
                            <label htmlFor='message'> Message </label>
                            <textarea rows={6} name="message" id="message" className='form-control input'/>
                        </div>
                        <button className='mt-5 mb-5'> Sumbit </button>
                        </form>

                    </div>
                </div>
            </section>
        )
    }
}
