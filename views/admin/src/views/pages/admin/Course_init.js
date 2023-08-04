import { useEffect, useState } from "react"

const ipconfig = require('../../../ipconfig')
const path = ipconfig.webhost + ":" + ipconfig.port

export function Course_init() {


    const [searach_course, setsearach_course] = useState("")
    const [searach_name, setsearach_name] = useState("")
    const [searach_type, setsearach_type] = useState("")

    const Builder = async () => {
        var href = path + '/api-course_history'

        await fetch(href, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                "searach_course": searach_course,
                "searach_name": searach_name,
                "searach_type": searach_type
            })
        }).then(response => response.json())
            .then(data => {
                setCourse_history(data)
                console.log(data)

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
                setstudentData(data)
            })
    }
    const [course_data, setcourse_data] = useState(null)
    const Course_data = async () => {

        var href = path + '/api-course_data'

        await fetch(href, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                
            })
        }).then(response => response.json())
            .then(data => {
                setcourse_data(data)

            })
    }
    const [Course_history, setCourse_history] = useState([1, 2])
    const [display, setdisplay] = useState("None")
    useEffect(() => {
        Builder()
        StudentData()
        Course_data()
    }, [])


    const [insert_studnet, setinsert_studnet] = useState("")
    const [insert_course, setinsert_course] = useState("")
    const [insert_class, setinsert_class] = useState("")
    const [insert_type, setinsert_type] = useState("")
    const Insert = () => {

        var href = path + '/api-course_insert'

        fetch(href, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                "std_id": insert_studnet,
                "course_id": insert_course,
                "class_id": insert_class,
                "type": insert_type,
            })
        }).then(response => response.json())
            .then(data => {
                alert(data["訊息"])
                Builder()


            })

    }
    const borderColor = (e) => {
        switch (e) {
            case "進行中":
                return {}
            case "已完成":
                return { borderColor: "green" }
            case "停課":
                return { borderColor: "red" }
            default:
                return {}

        }

    }
    const update = (i) => {
        var std_id = document.getElementById("std_id" + i).textContent

        var course_id = document.getElementById("course_id" + i).textContent
        var status = document.getElementById("kind" + i).value
        var count = document.getElementById("count" + i).textContent
        var href = path + '/api-course_update'
        fetch(href, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                "std_id": std_id,
                "course_id": course_id,
                "type": status,
                "count": count,

            })
        }).then(response => response.json())
            .then(data => {
                alert(data["訊息"])
                Builder()
            })
    }
    const add = (i) => {
        var count = document.getElementById("count" + i).textContent
        count = parseInt(count) + 1
        if(count > Course_history.duration[i]){
            var text = "無法新增，因為最大集數為:" + Course_history.duration[i] 
            alert(text)
        }else{
            document.getElementById("count" + i).innerText = count

        }


    }

    const minus = (i) => {
        var count = document.getElementById("count" + i).textContent
        count = parseInt(count) - 1
        if(count < 1){
            var text = "無法減少，因為最大集數為: 1 "  
            alert(text)
        }else{
            document.getElementById("count" + i).innerText = count

        }

    }






    return (
        <>
            <div className="row  shadow p-1">
                <div className="col-md-11">
                    <h1 className="fs-1 fw-bold text-center">新 舊 生 添 加 課 程</h1>
                    <div className="row justify-content-around my-3">
                        <div className="col-md-2">
                            <button onClick={() => { if (display === "None") { setdisplay("Block") } else { setdisplay("None") } }} className="form-control btn btn-secondary rounded-pill">新增課程</button>
                        </div>
                        <div className="col-md-2">
                            <input onChange={(e) => { setsearach_course(e.target.value) }} className="form-control" placeholder="搜尋課程"></input>
                        </div>
                        <div className="col-md-2">
                            <input onChange={(e) => { setsearach_name(e.target.value) }} className="form-control" placeholder="搜尋學生"></input>
                        </div>
                        <div className="col-md-2">
                            <select onChange={(e) => { setsearach_type(e.target.value) }} className="form-select">
                                <option value={""}>請選擇</option>
                                <option>已完成</option>
                                <option>進行中</option>
                                <option>停課</option>
                            </select>
                        </div>
                        <div className='col-md-2 d-flex justify-content-center'>
                            <button onClick={() => { Builder() }} className='form-control btn btn-primary rounded-pill d-flex align-content-center justify-content-center'>
                                課程搜尋
                                <span className="material-symbols-outlined mx-1">
                                    search
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <div className="row my-1 justify-content-center" >
                <div style={{ display: display }} className="col-md-11">
                    <div className="row border justify-content-around my-3 rounded-pill  item-hover p-2 py-3">
                        <div className="col-md-3">
                            <select onChange={(e) => { setinsert_studnet(e.target.value) }} className="form-select  text-center my-2">
                                <option value={null}> 請選擇學生</option>
                                {studentData != null && (
                                    <>
                                        {studentData.fullname.map((item, i) => (
                                            <option key={i} value={studentData.student_id[i]}>{item}</option>
                                        ))}
                                    </>
                                )}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <select onChange={(e) => { setinsert_course(e.target.value.split(',')[0]); setinsert_class(e.target.value.split(',')[1]) }} className="form-select  text-center my-2">
                                <option value={null}> 請選擇課程</option>
                                {/* Course_data */}
                                {course_data != null && (
                                    <>
                                        {course_data.course_name.map((item, i) => (
                                            <option key={i} value={course_data.course_id[i] + "," + course_data.class_id[i]}>{item} - {course_data.class_id[i]}</option>
                                        ))}
                                    </>
                                )}
                            </select>
                        </div>

                        <div className="col-md-3">
                            <select onChange={(e) => { setinsert_type(e.target.value) }} className="form-select  text-center my-2">
                                <option value={""}>請選擇種類</option>
                                <option>進行中</option>
                                <option>停課</option>

                            </select>
                        </div>
                        <div className="col-md-2">
                            <button onClick={() => { Insert() }} className="form-control my-2 btn btn-primary rounded-pill">確定</button>
                        </div>

                    </div>
                </div>
            </div>
            {Course_history.id !== undefined ? (
                <>
                    {Course_history.id.map((item, i) => (
                        <div key={i} className="row  justify-content-center">
                            <div className="col-md-11">
                                <div className="row border my-3 rounded-pill  item-hover p-2 py-3">
                                    {/* <div className="col-md-1">
                                        <p className="fs-4 text-center my-3"> {Course_history.id[i]}</p>
                                    </div> */}
                                    <div className="col-md-2">
                                        <p className="fs-5 text-center my-2">學生 : {Course_history.fullname[i]}</p>
                                        <p id={"std_id" + i} style={{ display: "none" }}>{Course_history.std_id[i]}</p>
                                    </div>
                                    <div className="col-md-1">
                                        {Course_history.type[i] === '已完成' ? (
                                            <p className="fs-5 text-center my-2">✅</p>
                                        ) : (
                                            <>
                                                {Course_history.type[i] === '停課' && (
                                                    <>
                                                        <p className="fs-5 text-center my-2">❌</p>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </div>

                                    <div className="col-md-3">
                                        <p className="fs-5 text-center my-2">{Course_history.course_name[i]}</p>
                                        <p id={"course_id" + i} style={{ display: "none" }}>{Course_history.course_id[i]}</p>

                                    </div>
                                    <div className="col-md-2">
                                        <div className="row my-1">
                                            <button onClick={()=>{minus(i)}} className="col-md-3 btn btn-outline-secondary">一</button>
                                            <span className="col-md-6 fs-5 text-center my-2">集數 :
                                                <span id={"count" + i}>{Course_history.count[i]}</span>

                                            </span>
                                            <button onClick={()=>{add(i)}} className="col-md-3 btn btn-outline-secondary">+</button>

                                        </div>

                                    </div>
                                    <div className="col-md-2" >
                                        <select id={"kind" + i} className="form-select  text-center my-2 " style={borderColor(Course_history.type[i])}>
                                            <option value={Course_history.type[i]} checked>{Course_history.type[i]} (預設)</option>
                                            <option>進行中</option>
                                            <option>已完成</option>
                                            <option>停課</option>
                                        </select>
                                    </div>
                                    <div className="col-md-1">
                                        <button onClick={() => { update(i) }} className="form-control my-2 btn btn-primary rounded-pill">修改</button>
                                    </div>
                                    <div className="col-md-1">
                                        <button onClick={() => { alert('暫不開放') }} className="form-control my-2 btn btn-danger rounded-pill">刪除</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </>

            ) : (
                <>
                    <h1>暫無資料</h1>
                </>
            )}


        </>
    )
}