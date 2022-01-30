import axios from "axios";
const baseURL = process.env.REACT_APP_BASE_URL;

const http = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    responseType: 'json',
    timeout: 10000,
    timeoutErrorMessage: 'Takes too long for response'  
})

const getHeaders = (secured) =>{
    let options = {
        'Content-Type': 'application/json'
    }
    if(secured){
        options['Authorization'] = localStorage.getItem('token');
    }
    return options;
}

const GET = (url, isSecured = false, params={})=>{
    return http.get(url,{
        headers: getHeaders(isSecured),
        params
    });

}

const POST = (url,data, isSecured = false, params={})=>{
    return http.post(url, data, {
        headers: getHeaders(isSecured),
        params
    });
}

const PUT = (url,data,isSecured = false,params={})=>{
    return http.put(url, data, {
        headers: getHeaders(isSecured),
        params
    });
}

const DELETE = (url,isSecured = false,params={})=>{
    return http.delete(url,{
        headers: getHeaders(isSecured),
        params
    });
}

const UPLOAD =(method,url,data,file=[]) =>{

    return new Promise((resolve,reject)=>{
        // Uploading file XHR,formData
            const xhr = new XMLHttpRequest();
            const formData = new FormData();

            // Append files on form data
            console.log('upload filessssss >>', file[0])
            formData.append('img',file[0],file[0].name); //SIngle file upload

            // Adding textual data in form data
            for(let key in data){
                formData.append(key, data[key]);
            }
            xhr.onreadystatechange = () =>{
                console.log('xhr ready state >>', xhr.readyState);
                if(xhr.readyState === 4){
                    if(xhr.status === 200){
                        resolve(xhr.response)
                    }else{
                        reject(xhr.response)
                    }
                }
            }
        
            xhr.open(method, `${baseURL}/${url}?token=${localStorage.getItem('token')}`, true);
            xhr.send(formData);

    })
    
 
}

export const httpClient = {
    GET,
    POST,
    PUT,
    DELETE,
    UPLOAD 
}