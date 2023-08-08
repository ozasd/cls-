import { useSelector, useDispatch } from "react-redux"
import React, { useEffect, useState } from 'react'
import { setLogin } from '../DataSlice'

const ipconfig  = require('../../ipconfig')
const path = ipconfig.webhost+":"+ipconfig.port
console.log('fetch:'+path)

export function Login() {
    const dispatch = useDispatch()
    const [isError, setisError] = useState('none')
    const [user, setuser] = useState()
    const [password, setpassword] = useState()



    window.onload = () => {
        if (localStorage.getItem("keep")) {
            // document.getElementById('check').checked = localStorage.getItem("keep")
            // document.getElementById('user').value = localStorage.getItem("user")
            // document.getElementById('password').value = localStorage.getItem("password")
            setuser(localStorage.getItem("user"))
            setpassword(localStorage.getItem("password"))
        }
    }

    function keep(e) {
        if (e === false) {
            localStorage.clear();

        } else {
            localStorage.setItem("keep", true);
        }
    }

    function fetchPassword() {
        if (document.getElementById('check').checked === true) {
            localStorage.setItem("keep", true);
            
        }
        if (user != null & password != null) {
            var href = path+'/api-login'
            fetch(href, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    'user': user,
                    'password': password
                })
            }).then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data["狀態"] === true) {
                        var userData = {
                            'user': data.nickname,
                            'identify': data.identify
                        }
                        if (localStorage.getItem('keep')) {
                            localStorage.setItem("user", user);
                            // localStorage.setItem("password", password);
                            localStorage.setItem("nickname", data.nickname);
                            localStorage.setItem("identify", data.identify);
                            localStorage.setItem("token", data.token);
                            localStorage.setItem("user_id", data.user_id);
                        }

                        dispatch(setLogin(userData))
                    } else {
                        setisError('block')
                    }
                })
        } else {
            setisError('block')
        }
    }

    return (
        <>
            {/* <h1>Login Page</h1> */}
            <div className="row vh-100 bg-light justify-content-center align-content-center">
                <div className="col-md-3 p-2  bg-white rounded-3 shadow border-top border-primary border-5 " style={{ minHeight: "65%" }}>
                    <div className="row h-100 gx-1 justify-content-center align-content-center ">
                        <div className="col-md-10 ">
                            <img className="my-2 w-50" alt='logo' src='https://www.doing-housework.com/store_image/hct369/L167306847729.png' />
                            <p className="fs-2 fw-bolder text-secondary">HCT 課程管理平台</p>
                            <p className=" fs-5 m-0 fw-bold">請輸入帳號</p>
                            <input id='user' className="my-2 form-control" placeholder="請輸入帳號..." onChange={(e) => { setuser(e.target.value) }} ></input>
                            <p className=" fs-5  m-0 fw-bolder">請輸入密碼</p>
                            <input id='password' className="my-2 form-control" type="password" placeholder="請輸入密碼..." onChange={(e) => { setpassword(e.target.value) }} ></input>
                            <p className="text-danger fw-bold" style={{ "display": isError }} >帳號密碼輸入錯誤 !</p>
                            <div className="form-check my-3">
                                <input id="check" onClick={(e) => { keep(e.target.checked) }} className="form-check-input" type="checkbox" value="" />
                                <label className="form-check-label text-secondary" >
                                    保持登入
                                </label>
                            </div>
                            <button className="w-100  btn btn-success rounded-pill mt-2" onClick={() => { fetchPassword() }} >送出</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}