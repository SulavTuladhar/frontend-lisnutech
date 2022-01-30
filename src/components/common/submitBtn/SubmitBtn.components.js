import React from 'react'
import './SubmitBtn.components.css';

export const SubmitBtn = (props)=> {
    const disabledLabel = props.disabledLabel || 'submitting';
    const enabledLabel = props.enabledLabel || 'submit';
    let btn = props.isSubmitting === true
        ? <button disabled className="btn" > {disabledLabel} </button>
        : <button type="submit" className="btn" disabled={props.isDisabled}> {enabledLabel} </button>
    return btn;

}
