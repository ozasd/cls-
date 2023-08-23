
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setLogout } from '../DataSlice'
import { useState } from 'react'
export function Sidebar() {
    const dispatch = useDispatch()
    const nickname = useSelector((e) => (e.Data.user))
    const [status, setstatus] = useState(window.location.pathname)
    console.log(status)
    // const currentURL = window.location.pathname;
    // console.log(currentURL);

    return (
        <>
            <div className='row  ' style={{ height: "90%" }}>
                <div className='col-md-12 m-0  p-0  mt-3'>
                    <Link to='/' onClick={() => { setstatus('/') }} className=' text-decoration-none'>
                        <img alt='logo' className='img-fluid' src='https://www.doing-housework.com/store_image/hct369/L167306847729.png'></img>
                    </Link>
                    <p className='fw-bold p-2 fs-5 text-warning pb-0 m-0'>H C T 電腦程式教育中心</p>
                    <p className='fw-bold p-2 fs-6 text-secondary pt-0 '>課程後臺管理系統</p>
                    <hr />
                    {status === '/' ? (
                        <>
                            <Link to='/' onClick={() => { setstatus('/') }} className=' text-decoration-none'>
                                <p className='fs-6    text-white py-2 ps-3   bg-success' style={{ borderRadius: "15px" }}>當週學生課表管理</p>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to='/' onClick={() => { setstatus('/') }} className=' text-decoration-none'>
                                <p className='fs-6   horver-success text-white-50 py-2 ps-3 border-start border-4 border-success '>當週學生課表管理</p>
                            </Link>
                        </>
                    )}
                    {status === '/Course_init' ? (
                        <>
                            <Link to='/Course_init' onClick={() => { setstatus('/Course_init') }} className=' text-decoration-none' >
                                <p className='fs-6  text-white py-2 ps-3   bg-success' style={{ borderRadius: "15px" }}>排課總管理</p>
                            </Link>
                        </>

                    ) : (
                        <>
                            <Link to='/Course_init' onClick={() => { setstatus('/Course_init') }} className=' text-decoration-none'>
                                <p className='fs-6  horver-success text-white-50 py-2 ps-3 border-start border-4 border-success '>排課總管理</p>
                            </Link>
                        </>

                    )}
                    {status === "/Course_builder" ? (
                        <>
                            <Link to='/Course_builder' onClick={() => { setstatus('/Course_builder') }} className=' text-decoration-none'>
                                <p className='fs-6  text-white py-2 ps-3   bg-success' style={{ borderRadius: "15px" }}>下週課表生成</p>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to='/Course_builder' onClick={() => { setstatus('/Course_builder') }} className=' text-decoration-none'>
                                <p className='fs-6  horver-success text-white-50 py-2 ps-3 border-start border-4 border-success '>下週課表生成</p>
                            </Link>
                        </>
                    )}
                    {status === '/Course_time' ? (
                        <>
                            <Link to='/Course_time' onClick={() => { setstatus('/Course_time') }} className=' text-decoration-none'>
                                <p className='fs-6   text-white py-2 ps-3 bg-success ' style={{ borderRadius: "15px" }}>學生上課時間</p>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to='/Course_time' onClick={() => {setstatus('/Course_time') }} className=' text-decoration-none'>
                                <p className='fs-6  horver-success text-white-50 py-2 ps-3 border-start border-4 border-success '>學生上課時間</p>
                            </Link>
                        </>
                    )}



                </div>
            </div>
            <div className='row gx-1 border-top p-1  align-content-center' style={{ height: "10%" }}>
                <p className='col-md-8 fs-5 fw-bolder m-0'>🟢 {nickname}</p>
                <Link to='/' onClick={() => { dispatch(setLogout(false)); localStorage.clear() }} className='col-md-4 btn btn-success rounded-pill '>登出</Link>
            </div>
        </>
    )
}