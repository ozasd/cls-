import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { add_leave, remove_leave, add_Makeup, remove_Makeup } from './../../BuilderSlice'
const ipconfig = require('../../../ipconfig')
const path = ipconfig.webhost + ":" + ipconfig.port

// import {  } from '../../BuilderSlice';





export function Course_builder() {
    
    const [ text , settext] = useState('點下開始生成按鈕，來生成下週課表 !')

    const Builder = () => {
        settext('正在抓取上週資料!')
        var href = path + '/api-courseBuilder'
        var weekRange = getThisWeekRange();
        
        fetch(href, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                'start': weekRange.monday,
                'end': weekRange.sunday,
                'searchtime': 'null',
                'searchfinish': 'null',
                'searchname': "",
            })
        }).then(response => response.json())
            .then(data => {
                settext('準備生成這週課表')

                console.log(data)
            })
        

    
    
    }



    // -------------------------------------------------------------------------------------------------------------------------------

    return (
        <>
            <div className="row shadow p-2" >
                <h1 className="text-center fs-2 fw-bold">準 備 生 成 這 週 課 表</h1>
            </div>
            <div className="mt-3 row bg-light shadow radius m-1 justify-content-around ">
                <Leave />
                <Makeup />
            </div>
            <div className="row mt-3  m-1 mb-3  "  >
                <div className="col-md-12  radius bg-light   shadow">
                    <h1 className="text-center fs-2 m-3 fw-bold">課 表 生 成 資 訊</h1>

                    <div className="row   m-3 radius border " style={{height:"250px"}}>
                        <div className="col-md-12">

                        </div>
                    </div>
                    {/* <p className="text-center  m-2"> 正在生成 王奕心 的程式設計課程ing ...</p>。 */}
                    <p className="text-center  m-2">{text}</p>

                    <div className="row m-3 justify-content-center">
                        <button onClick={()=>{Builder()}} className="btn btn-success rounded-pill p-2  w-25">開始生成</button>
                    </div>

                </div>

            </div>
        </>
    )
}


// -----------------------------------------------------------------------------------------------------------
const Leave = (e) => {
    const [id, setid] = useState(null)
    const [name, setname] = useState("null")
    const [type_id, settype_id] = useState("null")
    const dispatch = useDispatch()

    const add = () => {
        if (name == "null" || type_id == "null") {
            alert("請輸入完整 !")
        } else {
            dispatch(add_leave({ "name": name, "id": id, "type_id": type_id }))
        }

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

    useEffect(() => {
        fetch_student()
    }, [])
    return (
        <>
            <div className="col-md-6">
                <div className="row">
                    <div className="col-md-12">
                        <p className="fs-4 m-2 fw-bold text-center">新增這週請假學生</p>
                        <div className="row m-2"  >
                            <div className="col-md-12 border radius" style={{ maxHeight: "200px", minHeight: "200px", overflow: "auto" }}>
                                <Leave_item />

                            </div>

                        </div>

                        <div className="row m-2 justify-content-around p-1  ">
                            <select onChange={(e) => { setname(e.target.value.split(',')[1]); setid(e.target.value.split(',')[0]) }} className="w-25 form-select" >
                                <option value={["0", "null"]}>請假學生</option>
                                {stdname != null && (
                                    <>
                                        {stdname['fullname'].map((item, i) => (
                                            <option key={i} value={[stdname['student_id'][i], stdname['fullname'][i]]}>{item}</option>
                                        ))}
                                    </>
                                )}
                            </select>
                            <select onChange={(e) => { settype_id(e.target.value) }} className="w-25 form-select" >
                                <option value={'null'}>請假課程</option>
                                <option value={1}>程式設計 (程式課)</option>
                                <option value={2}>商用軟體 (綜合課)</option>
                            </select>
                            <button onClick={(e) => { add(e) }} className="col-md-2 btn btn-primary">新增</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
const Leave_item = () => {

    const type_id = (e) => {
        // console.log(e)
        if (e === "1") {
            return '程式設計'
        } else if (e === "2") {
            return '商用軟體'
        } else if (e === "3") {
            return '多媒體設計'
        } else if (e === "4") {
            return 'Minecraft'
        } else if (e === "5") {
            return '其他'
        } else {
            return "錯誤"
        }

    }

    const leavedata = useSelector((e) => e.Builder.leave)
    const dispatch = useDispatch()

    return (
        <>
            {leavedata.id.map((item, i) => (
                <>
                    <div className="row m-1 rounded-3 border p-1">
                        <div className="col-md-3 d-flex justify-content-center align-items-center">
                            <p className="m-0 text-center">學員 : {leavedata.name[i]}</p>
                        </div>
                        <div className="col-md-3 d-flex justify-content-center  align-items-center">
                            <p className="m-0 text-center">{type_id(leavedata.type_id[i])}</p>
                        </div>
                        <div className="col-md-3 d-flex  justify-content-center align-items-center">
                            <p className="m-0 text-center">狀態 : 請假</p>
                        </div>
                        <div className="col-md-3 d-flex justify-content-center">
                            <button onClick={() => { dispatch(remove_leave({ "name": leavedata.name[i], "type_id": leavedata.type_id[i] })) }} className="btn btn-danger">刪除</button>
                        </div>
                    </div>
                </>
            ))}

        </>
    )
}
// -----------------------------------------------------------------------------------------------------------

const Makeup = (e) => {
    const [studentid, setstudentid] = useState('null')
    const [studentname, setstudentname] = useState("null")

    const [type_id, settype_id] = useState("null")

    const [teacherid, setteacherid] = useState("null")
    const [teacherName, setteacherName] = useState("null")

    const [time, settime] = useState("null")

    const [date, setdate] = useState("null")



    const dispatch = useDispatch()

    const add = () => {
        if (studentid == "null" || studentname == "null" || type_id == "null" || teacherid == "null" || teacherName == 'null' || time == 'null' || date == 'null') {
            alert("請輸入完整 !")
        } else {
            dispatch(add_Makeup({
                "studentid": studentid,
                "studentname": studentname,
                "type_id": type_id,
                "teacherid": teacherid,
                "teacherName": teacherName,
                "time": time,
                "date": date

            }))
        }

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


    useEffect(() => {
        fetch_student()
        Teacher()
    }, [])
    return (
        <>
            <div className="col-md-6">
                <div className="row">
                    <div className="col-md-12">
                        <p className="fs-4 m-2 fw-bold text-center">新增這週補課學生</p>
                        <div className="row m-2"  >
                            <div className="col-md-12 border radius" style={{ maxHeight: "200px", minHeight: "200px", overflow: "auto" }}>
                                <Makeup_item />

                            </div>
                        </div>
                        <div className="row   m-2 justify-content-between p-1  ">
                            <div className="col-md-2">
                                <div className="row gx-1">
                                    <select onChange={(e) => { setstudentname(e.target.value.split(',')[1]); setstudentid(e.target.value.split(',')[0]) }} className="btn border" >
                                        <option value={["0", "null"]}>學生</option>
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
                                    <select onChange={(e) => { settype_id(e.target.value) }} className="btn border" >
                                        <option value={'null'}>課程</option>
                                        <option value={1}>程式設計 (程式課)</option>
                                        <option value={2}>商用軟體 (綜合課)</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="row gx-1">
                                    <select onChange={(e) => { setteacherName(e.target.value.split(',')[1]); setteacherid(e.target.value.split(',')[0]) }} className="col-md btn border" >
                                        <option value={["0", "null"]}>老師</option>
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
                                        <WeekDate />
                                    </select>
                                </div>

                            </div>
                            <div className="col-md-2">
                                <div className="row gx-1">
                                    <button onClick={(e) => { add(e) }} className="col-md btn btn-primary">新增</button>
                                </div>
                            </div>


                        </div>






                    </div>

                </div>

            </div>
        </>
    )

}
const Makeup_item = () => {

    const type_id = (e) => {
        // console.log(e)
        if (e === "1") {
            return '程式設計'
        } else if (e === "2") {
            return '商用軟體'
        } else if (e === "3") {
            return '多媒體設計'
        } else if (e === "4") {
            return 'Minecraft'
        } else if (e === "5") {
            return '其他'
        } else {
            return "錯誤"
        }

    }

    const Makeupdata = useSelector((e) => e.Builder.Makeup)
    const dispatch = useDispatch()

    return (
        <>
            {Makeupdata.studentid.map((item, i) => (
                <>
                    <div className="row m-1 rounded-3 border p-1">
                        <div className="col-md-2 d-flex justify-content-center align-items-center">
                            <p className="m-0 text-center">{Makeupdata.studentname[i]}</p>
                        </div>
                        <div className="col-md-2 d-flex justify-content-center  align-items-center">
                            <p className="m-0 text-center">{type_id(Makeupdata.type_id[i])}</p>
                        </div>
                        <div className="col-md-2 d-flex  justify-content-center align-items-center">
                            <p className="m-0 text-center">{Makeupdata.teacherName[i]}</p>
                        </div>
                        <div className="col-md-2 d-flex  justify-content-center align-items-center">
                            <p className="m-0 text-center">{Makeupdata.time[i]}</p>
                        </div>
                        <div className="col-md-2 d-flex  justify-content-center align-items-center">
                            <p className="m-0 text-center">{Makeupdata.date[i].split('-')[1] + "/" + Makeupdata.date[i].split('-')[2]}</p>
                        </div>
                        <div className="col-md-2 d-flex justify-content-center">
                            <button onClick={() => { dispatch(remove_Makeup({ "studentname": Makeupdata.studentname[i], "type_id": Makeupdata.type_id[i], "time": Makeupdata.time[i], "date": Makeupdata.date[i] })) }} className="btn btn-danger">刪除</button>
                        </div>
                    </div>
                </>
            ))}

        </>
    )
}



function getThisWeekRange() {
    // 格式化日期字符串，使用短横线分隔
    function formatDate(date) {
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);
        return year + "-" + month + "-" + day;
    }
    var today = new Date();  // 获取当前日期
    var currentDay = today.getDay();  // 获取当前星期几（0 表示星期日，1 表示星期一，以此类推）
    // 计算星期一到星期日的日期偏移量
    var mondayOffset = currentDay - 1;
    var sundayOffset = 7 - currentDay;
    // 计算这周星期一的日期
    var mondayDate = new Date(today);
    mondayDate.setDate(today.getDate() - mondayOffset);
    // 计算这周星期日的日期
    var sundayDate = new Date(today);
    sundayDate.setDate(today.getDate() + sundayOffset);
    // 格式化日期字符串
    var monday = formatDate(mondayDate);
    var sunday = formatDate(sundayDate);
    // 返回这周的日期范围
    return {
        monday: monday,
        sunday: sunday
    };
}


const WeekDate = (e) => {


    var weekRange = getThisWeekRange();
    const [display, setdisplay] = useState('none')
    var startlist = weekRange.monday.split('-')
    const [start, setstart] = useState(startlist[1] + '/' + startlist[2])
    var endlist = weekRange.sunday.split('-')
    const [end, setend] = useState(endlist[1] + '/' + endlist[2])

    var weekdays = []
    var weekdays2 = []

    for (var i = 0; i <= parseInt(end.split('/')[1]) - parseInt(start.split('/')[1]); i++) {
        // console.log(start.split('/')[0]+(parseInt(start.split('/')[1])+parseInt(i)))
        weekdays.push(start.split('/')[0] + '/' + (parseInt(start.split('/')[1]) + parseInt(i)))
        weekdays2.push(startlist[0] + '-' + start.split('/')[0] + '-' + (parseInt(start.split('/')[1]) + parseInt(i)))
    }
    // console.log(weekdays)
    var week = ['一', '二', '三', '四', '五', '六', '日']
    return (
        <>
            <option value='null'>日期</option>
            {weekdays.map((item, i) => (
                <option key={i} value={weekdays2[i]}>{item} ({week[i]})</option>
            )
            )}

        </>
    )

}