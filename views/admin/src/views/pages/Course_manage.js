import { useState } from "react";
import React from 'react';

function Course_item() {
    return (
        <>
            <div className='col-md-11 border my-3 rounded-pill shadow'>
                <div className='row p-2 py-3'>
                    <div className='col-md-2 '>
                        <p className='my-3 fs-5  text-center'>學員 : 王曉明</p>
                    </div>
                    <div className='col-md-2 '>
                        <p className='my-3 fs-5  text-center'>課程 : Scratch</p>
                    </div>
                    <div className='col-md-2 d-flex justify-content-center py-2'>
                        <select className='form-select'>
                            <option>Peter</option>
                            <option>Hank</option>
                            <option>Ken</option>
                            <option>TeTe</option>
                            <option>Teddy</option>

                        </select>
                    </div>
                    <div className='col-md-2 d-flex justify-content-center py-2'>
                        <select className='form-select'>
                            <option>7/12 (一)</option>
                            <option>7/13 (二)</option>
                            <option>7/14 (三)</option>
                            <option>7/15 (四)</option>
                            <option>7/16 (五)</option>
                            <option>7/17 (六)</option>
                            <option>7/18 (日)</option>
                        </select>
                    </div>
                    <div className='col-md-2 d-flex justify-content-center py-2'>
                        <select className='form-select'>
                            <option>10:30 ~ 12:00</option>
                            <option>13:00 ~ 14:30	</option>
                            <option>14:30 ~ 16:00</option>
                            <option>16:00 ~ 17:30</option>
                            <option>17:30 ~ 19:00</option>
                            <option>19:00 ~ 20:30</option>
                        </select>
                    </div>
                    <div className='col-md-1 d-flex justify-content-center py-2'>
                        <select className='form-select'>
                            <option>未完成</option>
                            <option>請假	</option>
                            <option>完成</option>

                        </select>
                    </div>
                    <div className='col-md-1 d-flex justify-content-center py-2'>
                        <button className='btn btn-primary rounded-pill'>修改</button>
                    </div>
                </div>


            </div>

        </>
    )
}



export function Course_manage() {
    const [display,setdisplay] = useState('none')




















    return (
        <>
            <div className='row justify-content-around align-content-center shadow' style={{ height: "15%" }}>
                <div className='col-md-12'>
                    <h1 className='text-center p-1 fw-bold'>7 / 12 ~  7 / 18 課表管理</h1>
                </div>
                <div className='col-md-2 d-flex justify-content-center py-2'>
                    <select className='form-select'>
                        <option>--請選擇時間--</option>
                        <option>7/12 (一)</option>
                        <option>7/13 (二)</option>
                        <option>7/14 (三)</option>
                        <option>7/15 (四)</option>
                        <option>7/16 (五)</option>
                        <option>7/17 (六)</option>
                        <option>7/18 (日)</option>
                    </select>
                </div>
                <div className='col-md-2 d-flex justify-content-center py-2'>
                    <select className='form-select'>
                        <option>--請選擇狀態--</option>
                        <option>未完成</option>
                        <option>請假	</option>
                        <option>課程</option>
                    </select>
                </div>
                <div className='col-md-3 d-flex justify-content-center py-2'>
                    <input className='form-control ' placeholder="請輸入要找的學生姓名..." />
                </div>
                <div className='col-md-2 row justify-content-center py-2'>
                    <button className='btn btn-primary rounded-pill'>課程搜尋</button>
                </div>
                <div className='col-md-2 row justify-content-center py-2'>
                    <button onClick={()=>{if (display != "none"){setdisplay('none')}else{setdisplay('block')}}} className='btn btn-danger  rounded-pill'>新增補課</button>
                </div>
            </div>


            <div className='row  justify-content-center align-content-start' style={{ height: "85%" }}>
                <div className='col-md-11 border my-2 mt-4 rounded-pill shadow' style={{display:display}}>
                    <div className='row p-2 py-3'>
                        <div className='col-md-2 d-flex justify-content-center py-2'>
                            <input className=' form-control' placeholder='請輸入學號...ex: 6' />
                        </div>
                        <div className='col-md-2 d-flex justify-content-center py-2'>
                            <select className='form-select'>
                                <option>補程式課</option>
                                <option>補綜合課</option>


                            </select>
                        </div>
                        <div className='col-md-2 d-flex justify-content-center py-2'>
                            <select className='form-select'>
                                <option>Peter</option>
                                <option>Hank</option>
                                <option>Ken</option>
                                <option>TeTe</option>
                                <option>Teddy</option>

                            </select>
                        </div>
                        <div className='col-md-2 d-flex justify-content-center py-2'>
                            <select className='form-select'>
                                <option>7/12 (一)</option>
                                <option>7/13 (二)</option>
                                <option>7/14 (三)</option>
                                <option>7/15 (四)</option>
                                <option>7/16 (五)</option>
                                <option>7/17 (六)</option>
                                <option>7/18 (日)</option>
                            </select>
                        </div>
                        <div className='col-md-2 d-flex justify-content-center py-2'>
                            <select className='form-select'>
                                <option>10:30 ~ 12:00</option>
                                <option>13:00 ~ 14:30	</option>
                                <option>14:30 ~ 16:00</option>
                                <option>16:00 ~ 17:30</option>
                                <option>17:30 ~ 19:00</option>
                                <option>19:00 ~ 20:30</option>
                            </select>
                        </div>
                        <div className='col-md-1 d-flex justify-content-center py-2'>
                            <select className='form-select'>
                                <option>未完成</option>
                                {/* <option>請假	</option>
                                <option>課程</option> */}

                            </select>
                        </div>
                        <div className='col-md-1 d-flex justify-content-center py-2'>
                            <button className='btn btn-primary rounded-pill'>新增</button>
                        </div>
                    </div>


                </div>

                <Course_item/>

            </div>
        </>
    )

}

function getCurrentWeekDates() {
    const now = new Date();
    const currentDate = now.getDate();
    const currentDay = now.getDay(); // Sunday: 0, Monday: 1, ..., Saturday: 6

    // Calculate the date of the Monday of the current week
    const mondayDate = currentDate - currentDay + (currentDay === 0 ? -6 : 1);
    const monday = new Date(now.getFullYear(), now.getMonth(), mondayDate);

    // Calculate the dates of the rest of the week (Tuesday to Sunday)
    const weekDates = [monday];
    for (let i = 1; i < 7; i++) {
        const date = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i);
        weekDates.push(date);
    }

    return weekDates;
}

// Get the dates of the current week
const currentWeekDates = getCurrentWeekDates();
console.log("Current Week Dates:", currentWeekDates);