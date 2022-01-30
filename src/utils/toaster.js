import { toast } from "react-toastify";

const showSucess = (msg)=>{
    toast.success(msg);
}

const showInfo = (msg)=>{
    toast.info(msg);
    
}

const showWarning = (msg)=>{
    toast.warning(msg);
    
}

const showError = (msg)=>{
    toast.error(msg);  
}

export const notify = {
    showSucess,
    showInfo,
    showWarning,
    showError
}