import React from "react";
import {useDispatch} from 'react-redux'
import {setLogout} from '../../DataSlice'
export function Error404() {
    const dispatch = useDispatch()
    return (
        <>
            <h1>抱歉暫時不開放一般使用者登入</h1>
            <p>如有任何問題，請來電HCT電腦程式教育中心</p>
            <button className="btn btn-primary"  onClick={()=>{dispatch(setLogout(false));localStorage.clear()}}>返回登入</button>
        </>
    )
}