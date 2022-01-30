import { notify } from "./toaster";

export const handleError = (error)=>{
    // accept Error
    // Check error 
    // Parse error
    // Prepare error
    // Show them in UI
    debugger;
    let err = error.response;
    let errMsg = 'Something went Wrong';
    if(err){
        errMsg = err && err.data && err.data.msg;
    }
    notify.showError(errMsg);
}