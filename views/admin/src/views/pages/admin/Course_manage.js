import { useEffect, useState } from "react";
import React from 'react';


const ipconfig = require('../../../ipconfig')
const path = ipconfig.webhost + ":" + ipconfig.port
function generateThisWeekDates() {
    const today = new Date();
    const startDayOfWeek = new Date(today);
    let dayOfWeek = today.getDay(); // 获取今天是星期几
    if (dayOfWeek === 0) {
        dayOfWeek = 7
    }
    if (dayOfWeek !== 1) {
        // 如果今天不是星期一，就将日期调整到本周星期一
        startDayOfWeek.setDate(today.getDate() - dayOfWeek + 1);
    }
    const oneDayMilliseconds = 24 * 60 * 60 * 1000; // Number of milliseconds in one day
    const weekDates = [];
    const weekDates2 = [];
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(startDayOfWeek.getTime() + i * oneDayMilliseconds);
        var date = (currentDate.toISOString().slice(0, 10).split('-'))
        weekDates.push(date[1] + '/' + date[2]);
        weekDates2.push(date[0] + '-' + date[1] + '-' + date[2]);
    }

    return [weekDates, weekDates2];
}
export function Course_manage() {

    const [class_data, setclass_data] = useState(null)
    // const [searchtime, setsearchtime] = useState(null)
    // const [searchname, setsearchname] = useState(null)
    const fetchdata = async (e) => {
        var searchtime = (document.getElementById('search_time_id').value)
        var searchfinish = document.getElementById('search_finish_id').value
        var searchname = document.getElementById('search_name_id').value
        // console.log(searchtime, searchfinish, searchname)
        var href = path + '/api-courseData'
        // console.log(weekRange[1])
        await fetch(href, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                'start': weekRange[1][0],
                'end': weekRange[1][6],
                'searchtime': searchtime,
                'searchfinish': searchfinish,
                'searchname': searchname
            })
        }).then(response => response.json())
            .then(data => {
                setclass_data(data)
            }).catch((err) => {
                alert(err)
            })
    }
    const [teacher, setteacher] = useState(null)
    const Teacher = async () => {

        var href = path + '/api-teacherData'

        await fetch(href, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                'teacherData': null
            })
        }).then(response => response.json())
            .then(data => {

                setteacher(data)
                // console.log(data)

            })

    }
    const [studentData, setstudentData] = useState(null)
    const StudentData = async () => {
        var href = path + '/api-studentData'
        await fetch(href, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                'studentData': null
            })
        }).then(response => response.json())
            .then(data => {
                // console.log(data)
                setstudentData(data)
            })
    }

    useEffect(() => {
        Teacher()
        StudentData()
        fetchdata()
    }, [])
    var weekRange = generateThisWeekDates();
    const [display, setdisplay] = useState('none')
    const [start, setstart] = useState(weekRange[0][0])
    const [end, setend] = useState(weekRange[0][6])



    function Course_item() {

        const update = (i) => {
            var id = document.getElementById('id' + i).textContent
            var teacher = document.getElementById('teacher' + i).value
            var finish = document.getElementById('finish' + i).value
            var date = document.getElementById('date' + i).value
            var time = document.getElementById('time' + i).value
            var course_id = document.getElementById('course_id' + i).value
            console.log("星期" + weekNumber(date) + " " + time)
            var href = path + '/api-courseUpdate'

            fetch(href, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    'id': id,
                    'teacher': teacher,
                    'date': date,
                    'time': "星期" + weekNumber(date) + " " + time,
                    'finish': finish,
                    'course_id': course_id


                })
            }).then(response => response.json())
                .then(data => {
                    if (data['狀態'] == "成功") {
                        alert('更新成功')
                        fetchdata()

                    } else {
                        alert('更新失敗')
                    }
                    // console.log(data)

                }).catch((err) => {
                    alert(err)
                })

        }
        const settime = (e) => {
            return e.split(" ")[1]
        }
        const setfinish = (e) => {
            let index = null
            if (e === 1) {
                index = "完成"
            } else if (e === 2) {
                index = "請假"
            } else if (e === null) {
                index = "未完成"
            }
            return index
        }
        const checknull = (e) => {
            if (e == null) {
                return "未完成"

            } else {
                return e
            }

        }
        const nullred = (e) => {
            if (e == null) {
                return { borderColor: "red" }

            } else {
                if (e === 2) {
                    return { borderColor: "blue" }

                } else {
                    return { borderColor: "blcak" }

                }

            }
        }
        const Change_course = (props) => {
            let course = props.item.slice(0, -2)
            const courseNumbers = [];
            for (let i = 1; i <= 50; i++) {
                if (i < 10) {
                    i = "0" + String(i)
                }
                const courseNumber = `${course}${i}`;
                courseNumbers.push(courseNumber);
            }
            return (
                <>
                    {courseNumbers.map((item, i) => (
                        <option key={i} value={courseNumbers[i]}>第{courseNumbers[i].slice(-2)}集</option>

                    ))}
                </>
            )

        }



        const Item = (props) => {
            let i = props.index
            return (
                <>
                    <div className='col-md-11 border my-2 rounded-pill  item-hover'  >
                        <div className='row p-2 py-3'>
                            <div className='col-md-1 d-flex align-items-center justify-content-center '>
                                <p className='my-3 fs-5  text-center'>{props.item.slice(0, 3)} </p>
                                {/* {"第" + class_data['class_id'][i].slice(-2) + "集"} */}
                                <p id={'id' + i} className="d-none">{class_data['id'][i]}</p>

                            </div>
                            <div className='col-md-2 d-flex justify-content-center fs-5 align-items-center '>
                                {class_data['class_title'][i] != null ? (
                                    class_data['class_title'][i].slice(0, 15)
                                ) : (
                                    <span className="text-danger fs-6">抓取課程失敗 !<br />(新增課程時出現錯誤)</span>
                                )}
                                <br />


                            </div>
                            <div className='col-md-1 d-flex justify-content-center py-2 px-0'>
                                {/* <input id={'course_id' + i} className="form-control w-100 text-center" placeholder={class_data['class_id'][i]} /> */}
                                <select id={'course_id' + i} className='form-select w-100'>
                                    <option value={class_data['class_id'][i]}>第{class_data['class_id'][i].slice(-2)}集 (預設)</option>
                                    <Change_course item={class_data['class_id'][i]} />
                                </select>


                            </div>
                            <div className='col-md-2 d-flex justify-content-center py-2'>
                                {teacher['nickname'] != null &&
                                    <>
                                        <select id={'teacher' + i} className='form-select' style={nullred(class_data['nickname'][i])}>
                                            <option value={checknull(class_data['teacher_id'][i])} className="text-primary">{checknull(class_data['nickname'][i])}</option>
                                            <option className="text-danger" value={null}>未完成</option>

                                            {teacher['nickname'].map((item, i) => (
                                                <option key={i} value={teacher['teacher_id'][i]}>{item}</option>
                                            ))}
                                        </select>

                                    </>

                                }

                            </div>
                            <div className='col-md-2 d-flex justify-content-center py-2'>
                                <select id={'date' + i} className='form-select'>

                                    <option value={class_data['class_date'][i]} className="text-primary">{class_data['class_date'][i].split('-')[1]}/{class_data['class_date'][i].split('-')[2]} ({weekNumber(class_data['class_date'][i])}) (預設)</option>

                                    <WeekDate />

                                </select>
                            </div>
                            <div className='col-md-2 d-flex justify-content-center py-2'>
                                <select id={'time' + i} className='form-select'>
                                    <option value={settime(class_data['class_time'][i])} className="text-primary">{settime(class_data['class_time'][i])}(預設)</option>
                                    <option>10:30~12:00</option>
                                    <option>13:00~14:30	</option>
                                    <option>14:30~16:00</option>
                                    <option>16:00~17:30</option>
                                    <option>17:30~19:00</option>
                                    <option>19:00~20:30</option>
                                </select>
                            </div>
                            <div className='col-md-1 d-flex justify-content-center py-2'>
                                <select id={'finish' + i} className='form-select' style={nullred(class_data['finish'][i])}>
                                    <option value={class_data['finish'][i]} className="text-primary">{setfinish(class_data['finish'][i])}</option>
                                    <option value='0' >未完成</option>
                                    <option value='1' >完成</option>
                                    <option value='2' >請假</option>

                                </select>
                            </div>
                            <div className='col-md-1 d-flex justify-content-center py-2'>
                                <button id={i} onClick={(e) => { update(e.target.id) }} className='btn btn-secondary rounded-pill'>修改</button>
                            </div>
                        </div>


                    </div >
                </>
            )
        }
        return (
            // 資料畫面

            <>
                {class_data !== null ? (
                    <>
                        {
                            class_data['fullname'].map((item, i) => (
                                <Item key={i} item={item} index={i} />
                            ))

                        }
                    </>

                ) : (

                    <div className="col-md-11 vh-100">
                        <div className="row h-100 justify-content-center align-content-center">
                            <div className="spinner-border text-primary mx-3" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            Loading...
                        </div>
                    </div>
                )}
            </>
        )
    }
    const weekNumber = (e) => {
        const date = new Date(e);
        const daysOfWeek = ['日', '一', '二', '三', '四', '五', '六'];
        const dayOfWeekIndex = date.getDay();
        return daysOfWeek[dayOfWeekIndex];

    }


    const WeekDate = (e) => {



        const weekDate = generateThisWeekDates();

        var week = ['一', '二', '三', '四', '五', '六', '日']
        return (
            <>
                {weekDate[0].map((item, i) => (
                    <option key={i} value={weekDate[1][i]}>{item} ({week[i]})</option>
                )
                )}

            </>
        )

    }
    const Add_course = (e) => {
        var add_name = document.getElementById('add_name').value
        var add_course = document.getElementById('add_course').value
        var add_teacher = document.getElementById('add_teacher').value
        var add_date = document.getElementById('add_date').value
        var add_time = document.getElementById('add_time').value
        var add_finish = document.getElementById('add_finish').value
        if (add_name === 'null' || add_course === 'null' || add_teacher === 'null' || add_date === 'null' || add_time === 'null') {
            alert("請輸入完整資料 !")
        } else {
            // console.log("星期" + weekNumber(date) + " " + time)
            var href = path + '/api-courseAdd'

            fetch(href, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    'id': add_name,
                    'teacher': add_teacher,
                    'course': add_course,
                    'date': add_date,
                    'time': "星期" + weekNumber(add_date) + " " + add_time,
                    'finish': add_finish


                })
            }).then(response => response.json())
                .then(data => {
                    if (data['狀態'] === "成功") {
                        fetchdata()
                        alert(data['訊息'])

                    } else {

                        fetchdata()
                        alert(data['訊息'])

                    }
                    // console.log(data)

                })



        }


    }
    useEffect(() => {
        const keyDownHandler = event => {
            console.log('User pressed: ', event.key);

            if (event.key === 'Enter') {
                event.preventDefault();
                fetchdata()
            }
        };
        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [])

    return (
        // 主畫面
        <>
            {/* ------------------------------------------------------------------------------------------------------------------------------------ */}
            {/* 課程搜尋 navbar */}

            <div className='row justify-content-around align-content-center shadow '  >
                <div className="col-md-11">
                    <div className="row">
                        <div className='col-md-12'>
                            <h1 className='text-center p-1 fw-bold text-green'>{start} ~ {end} 課表管理</h1>
                        </div>
                    </div>
                    <div className="row justify-content-between gx-1">
                        <div className='col-md-2 row justify-content-center py-2'>
                            <button onClick={() => { if (display !== "none") { setdisplay('none') } else { setdisplay('block') } }} className='btn btn-secondary  rounded-pill'>新增補課</button>
                        </div>
                        <div className='col-md-2 d-flex justify-content-center py-2'>
                            <select id='search_time_id' className='form-select'>
                                <option value='null'>--請選擇時間--</option>

                                <WeekDate />
                            </select>
                        </div>
                        <div className='col-md-2 d-flex justify-content-center py-2'>
                            <select id='search_finish_id' className='form-select'>
                                <option value='null'>--請選擇狀態--</option>
                                <option value='0'>未完成</option>
                                <option value='1'>完成</option>
                                <option value='2'>請假</option>

                            </select>
                        </div>
                        <div className='col-md-3 d-flex justify-content-center py-2'>
                            <input id='search_name_id' className='form-control ' placeholder="請輸入要找的學生姓名..." />
                        </div>
                        <div className='col-md-2 row justify-content-center py-2'>
                            <button onClick={() => { fetchdata() }} className='btn bg-blue rounded-pill d-flex align-content-center justify-content-center'>
                                課程搜尋
                                <span className="material-symbols-outlined mx-1">
                                    search
                                </span>


                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* ------------------------------------------------------------------------------------------------------------------------------------ */}
            {/* 新增課程item */}
            <div className='row  mt-2 justify-content-center align-content-start'>
                <div className='col-md-11 border my-2 mt-4 mb-4 rounded-pill shadow' style={{ display: display }}>
                    <div className='row p-2 py-3'>
                        <div className='col-md-2 d-flex justify-content-center py-2'>
                            <select id='add_name' className='form-select'>
                                {studentData != null && (
                                    <>
                                        <option value={'null'}>--請選擇學生--</option>

                                        {studentData['fullname'].map((item, i) => (
                                            <option key={i} value={studentData['student_id'][i]}>{item}</option>
                                        ))}
                                    </>
                                )}

                            </select>
                        </div>
                        <div className='col-md-2 d-flex justify-content-center py-2'>
                            <select id='add_course' className='form-select'>
                                <option value={'null'}>--請選擇種類--</option>
                                <option value={1}>補程式設計 (程式課)</option>
                                <option value={2}>補商用軟體 (綜合課)</option>
                                {/* <option value={3}>補多媒體設計 (繪圖、動畫影片編輯等)</option> */}
                                {/* <option value={4}>補Minecraft (Minecraft玩家to開發者之路)</option> */}
                                {/* <option value={5}>其它 (自由課輔/教師隋堂實時教授等)</option> */}

                            </select>
                        </div>
                        <div className='col-md-2 d-flex justify-content-center py-2'>
                            <select id='add_teacher' className='form-select'>
                                <option value={'null'}>--請選擇老師--</option>
                                <option  value={null}>未完成</option>

                                {teacher != null && (
                                    <>
                                        {teacher['nickname'].map((item, i) => (
                                            <option key={i} value={teacher['teacher_id'][i]}>{item}</option>
                                        ))}
                                    </>
                                )}
                            </select>
                        </div>
                        <div className='col-md-2 d-flex justify-content-center py-2'>
                            <select id='add_date' className='form-select'>
                                <option value='null'>--請選擇時間--</option>

                                <WeekDate />
                            </select>
                        </div>
                        <div className='col-md-2 d-flex justify-content-center py-2'>
                            <select id='add_time' className='form-select'>
                                <option value={'null'}>--請選擇時間--</option>
                                <option>10:30~12:00</option>
                                <option>13:00~14:30	</option>
                                <option>14:30~16:00</option>
                                <option>16:00~17:30</option>
                                <option>17:30~19:00</option>
                                <option>19:00~20:30</option>
                            </select>
                        </div>
                        <div className='col-md-1 d-flex justify-content-center py-2'>
                            <select id='add_finish' className='form-select'>
                                <option value={0}>未完成</option>
                            </select>
                        </div>
                        <div className='col-md-1 d-flex justify-content-center py-2'>
                            <button onClick={() => { Add_course() }} className='btn btn-primary rounded-pill'>新增</button>
                        </div>
                    </div>
                </div>
                <Course_item />

            </div>
        </>
    )

}
