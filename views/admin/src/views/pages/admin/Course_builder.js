import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { add_Makeup, remove_Makeup } from '../../BuilderSlice'
import { Course_manage } from './Next_Course_manage'

const ipconfig = require('../../../ipconfig')
const path = ipconfig.webhost + ":" + ipconfig.port

function displayWeekDates() {
    // 取得今天的日期
    var today = new Date();
    today = today.setDate(today.getDate() + 7)
    today = new Date(today);
    // 取得今天是星期幾（0 表示星期日，1 表示星期一，以此類推）
    var dayOfWeek = today.getDay();
    if(dayOfWeek === 0 ){
        dayOfWeek = 7
    }
    // 計算一週的第一天（星期一）的日期
    var firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - dayOfWeek + 1);
    let date_week = []

    // 顯示一週的日期範圍
    for (var i = 0; i < 7; i++) {
        var currentDate = new Date(firstDayOfWeek);
        currentDate.setDate(firstDayOfWeek.getDate() + i);
        var day = currentDate.getDate();
        if (parseInt(day) < 10) {
            day = "0" + day
        }
        var month = currentDate.getMonth() + 1; // 月份是從 0 開始的，所以需要 +1
        if (parseInt(month) < 10) {
            month = "0" + month
        }
        var year = currentDate.getFullYear();
        var weekDay = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][currentDate.getDay()];
        var date = year + '-' + month + '-' + day
        var week = weekDay
        date_week.push([date, week])
    }
    return date_week
}

const Week = () => {
    const thisWeekDates = displayWeekDates();

    return (
        <>
            <option value={"null"}>日期</option>
            {thisWeekDates.map((item, i) => (
                <option key={i} value={[item[0], item[1]]}>{item[1] + " " + item[0]}</option>

            ))}

        </>
    )

}
export function Course_builder() {
    const Makeup = useSelector((e) => (e.Builder.Makeup))
    const dispatch = useDispatch()
    const add_leave = () => {
        if (std != 'null' && course_type != 'null' && teach_id != 'null' && time != 'null' && date != 'null') {
            let MakeupData = {
                "date": date.split(',')[0],
                "time": date.split(',')[1] + " " + time,
                "teacherid": teach_id.split(',')[0],
                "teacherName": teach_id.split(',')[1],
                "type_id": course_type,
                "studentid": std.split(',')[0],
                "studentname": std.split(',')[1]
            }
            dispatch(add_Makeup(MakeupData))
        } else {
            alert("請填寫完整 !")
        }

    }
    const remove_leave = (e) => {
        dispatch(remove_Makeup(e))
    }

    const [stdname, setstdname] = useState(null)
    const fetch_student = async () => {
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
                setstdname(data)

            })
    }

    const [next_course, setnext_course] = useState(null)
    const fetchdata = async (e) => {
        const data = displayWeekDates()
        var href = path + '/api-courseData'
        
        await fetch(href, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                'start': data[0][0],
                'end': data[6][0],
                'searchtime': "null",
                'searchfinish': "null",
                'searchname': ""

            })
        }).then(response => response.json())
            .then(data => {
                console.log()
                if (data['class_date'].length != 0) {
                    setnext_course(data)
                }
            }).catch((err)=>{
                alert(err)
            })
    }


    const builder = async () => {
        var href = path + '/api-course_builder'
        await fetch(href, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                studentid: Makeup.studentid,
                type_id: Makeup.type_id,
                teacherid: Makeup.teacherid,
                time: Makeup.time,
                date: Makeup.date
            })
        }).then(response => response.json())
            .then(data => {
                console.log(data['訊息'])
                alert(data['訊息'])
                fetchdata()

            }).catch((err)=>{
                alert(err)
            })
    }


    const [teacher, setteacher] = useState(null)
    const Teacher = async () => {

        var href = path + '/api-teacherData'
        // console.log(href)
        await fetch(href, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                'teacherData': null
            })
        }).then(response => response.json())
            .then(data => {
                setteacher(data)
            }).catch((err)=>{
                alert(err)
            })

    }
    useEffect(() => {
        Teacher()
        fetch_student()
        fetchdata()

    }, [])

    const [std, setstd] = useState('null')
    const [course_type, setcourse_type] = useState('null')
    const [teach_id, setteach_id] = useState('null')
    const [time, settime] = useState('null')
    const [date, setdate] = useState('null')
    const [weekDay, setweekDay] = useState(displayWeekDates())
    // console.log(data)
    // console.log(data[0][0])
    // console.log(data[6][0])
    const [display, setdisplay] = useState('none')
    const date_change = (e)=>{
        const date = e.split('-')
        return  date[1] + ' / ' +date[2]


    }
    return (

        <>
            {next_course == null ? (
                <>
                    <div className="modal  fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog ">
                            {/* modal-dialog-centered */}
                            <div className="modal-content ">
                                <div className="modal-header py-3 border-0 border-top border-5 border-warning d-flex align-items-center  ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="text-warning me-2 bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                    </svg>
                                    <h5 className="modal-title " id="staticBackdropLabel">確認新增課程 ?</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body py-4">

                                    是否新增了下週要補課的學生 ? 如果還沒有請按<a className="text-primary" data-bs-dismiss="modal">取消</a> !
                                    {/* <span className="my-1"></span> */}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-outline-secondary rounded-pill" data-bs-dismiss="modal">取消</button>
                                    <button type="button" className="btn btn-primary rounded-pill" data-bs-dismiss="modal" onClick={() => { builder() }} >新增課程</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row h-100 justify-content-center align-content-center bg-secondary2">
                        <div className="col-md-9 rounded-3 h-75 shadow border-top border-primary border-5 ">
                            <div className='row h-25 border-bottom align-content-center'>
                                <h1 className='text-center fw-bold my-3 text-secondary'>準 備 生 成 下 週 課 表</h1>
                                <p className="my-0 text-center fw-bold fs-6">{date_change(weekDay[0][0])}  ~  {date_change(weekDay[6][0])}</p>
                                <p className='text-secondary fw-bold m-0  border-start border-3 border-success'>新增學生補課</p>
                            </div>
                            <div className="row h-50 overflow-auto">
                                <div className="col-md-12 ">
                                    {Makeup.studentid.map((item, i) => (
                                        <div className="row m-1 rounded-3 border p-1">
                                            <div className="col-md-2 d-flex justify-content-center align-items-center">
                                                <p className="m-0 text-center">{Makeup.studentname[i]}</p>
                                            </div>
                                            <div className="col-md-1 d-flex justify-content-center  align-items-center">
                                                <p className="m-0 text-center">{Makeup.type_id[i] == 1 ? ('程式課') : ("綜合課")}</p>
                                            </div>
                                            <div className="col-md-2 d-flex  justify-content-center align-items-center">
                                                <p className="m-0 text-center">{Makeup.teacherName[i]}</p>
                                            </div>
                                            <div className="col-md-2 d-flex  justify-content-center align-items-center">
                                                <p className="m-0 text-center">{Makeup.date[i]}</p>
                                            </div>
                                            <div className="col-md-3 d-flex  justify-content-center align-items-center">
                                                <p className="m-0 text-center">{Makeup.time[i]}</p>
                                            </div>
                                            <div className="col-md-2 d-flex justify-content-center">
                                                <button onClick={() => { remove_leave({ studentname: Makeup.studentname[i], type_id: Makeup.type_id[i], time: Makeup.time[i], date: Makeup.date[i] }) }} className="btn btn-danger">刪除</button>
                                            </div>
                                        </div>

                                    ))}


                                </div>
                            </div>
                            <div className="row h-25  justify-content-between ">
                                <div className="col-md-12 ">
                                    <div className="row border-top  h-100 justify-content-center align-content-center  mt-2  ">
                                        <div className="col-md-2">
                                            <div className="row gx-1">
                                                <select onChange={(e) => { setstd(e.target.value) }} className="btn border" >
                                                    <option value={"null"}>學生</option>
                                                    {stdname != null && (
                                                        <>
                                                            {stdname['fullname'].map((item, i) => (
                                                                <option key={i} value={[stdname['student_id'][i], stdname['fullname'][i]]}>{item}</option>
                                                            ))}
                                                        </>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="row gx-1">
                                                <select onChange={(e) => { setcourse_type(e.target.value) }} className="btn border" >
                                                    <option value={'null'}>課程</option>
                                                    <option value={1}>程式設計 (程式課)</option>
                                                    <option value={2}>商用軟體 (綜合課)</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="row gx-1">
                                                <select onChange={(e) => { setteach_id(e.target.value) }} className="col-md btn border" >
                                                    <option value={"null"}>老師</option>
                                                    <option value={null}>未指定</option>
                                                    {teacher != null && (
                                                        <>
                                                            {teacher['nickname'].map((item, i) => (
                                                                <option key={i} value={[teacher['teacher_id'][i], teacher['nickname'][i]]}>{item}</option>

                                                            ))}
                                                        </>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="row gx-1">
                                                <select onChange={(e) => { settime(e.target.value) }} className="col-md btn border" >
                                                    <option value={'null'}>時間</option>
                                                    <option>10:30~12:00</option>
                                                    <option>13:00~14:30	</option>
                                                    <option>14:30~16:00</option>
                                                    <option>16:00~17:30</option>
                                                    <option>17:30~19:00</option>
                                                    <option>19:00~20:30</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="row gx-1">
                                                <select onChange={(e) => { setdate(e.target.value) }} className="col-md  btn border" >
                                                    <Week />
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="row gx-1">
                                                <button onClick={() => { add_leave() }} className="col-md btn btn-primary">新增</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 ">
                                    <div className="row h-100 justify-content-center align-content-center">
                                        <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="col-md-4 btn btn-success rounded-pill"> 下一步</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <Course_manage />

                </>
            )}


        </>

    )
}
