import { useEffect, useState } from "react"

const ipconfig = require('../../../ipconfig')
const path = ipconfig.webhost + ":" + ipconfig.port

export function Course_time() {

    const [userData, setuserData] = useState('null')
    const fetchdata = async (e) => {
        var time = document.getElementById('search_time').value
        var identity = document.getElementById('search_identity').value
        var name = document.getElementById('search_name').value
        console.log(time, identity, name)
        console.log(name == "")
        var href = path + '/api-userData'
        // console.log(weekRange[1])
        await fetch(href, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                'time': time,
                'identity': identity,
                'name': name,
            })
        }).then(response => response.json())
            .then(data => {
                setuserData(data)
            }).catch((err) => {
                alert(err)
            })
    }
    useEffect(() => {
        fetchdata()
    }, [])
    const setweek = (e) => {
        switch (e) {
            case "1":
                return "星期一"
                break;
            case "2":
                return "星期二"
                break;
            case "3":
                return "星期三"
                break;
            case "4":
                return "星期四"
                break;
            case "5":
                return "星期五"
                break;
            case "6":
                return "星期六"
                break;
            case "7":
                return "星期日"
                break;
            default:
                return "抓取失敗 !"
                break
        }

    }
    const settime = (e) => {
        switch (e) {
            case "1":
                return "10:30~12:00"
                break;
            case "2":
                return "13:00~14:30"
                break;
            case "3":
                return "14:30~16:00"
                break;
            case "4":
                return "16:00~17:30"
                break;
            case "5":
                return "17:30~19:00"
                break;
            case "6":
                return "19:00~20:30"
                break;
            default:
                return "抓取失敗 !"
                break
        }

    }

    const setred = (e) => {
        switch (e) {
            case 1:
                return ''
                break;
            case 4:
                return 'red'
                break;
            default:
                return ''
                break;
        }
    }

    const userUpdate = ()=>{
        var user_id = document.getElementById('user_id').textContent
        var first_class1 = document.getElementById('first_class1').value
        var first_class2 = document.getElementById('first_class2').value
        var second_class1 = document.getElementById('second_class1').value
        var second_class2 = document.getElementById('second_class2').value
        var identity = document.getElementById('identity').value
        var href = path + '/api-userUpdate'
        // console.log(weekRange[1])
        fetch(href, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                'user_id': user_id,
                'first_class':first_class1+first_class2,
                'second_class': second_class1+second_class2,
                'identity': identity,
            })
        }).then(response => response.json())
        .then(data => {
            alert(data['訊息'])
            fetchdata()
        }).catch((err)=>{
            alert(err)
            fetchdata()

        })
        
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
        <>

            <div className="row  shadow p-1 justify-content-center">
                <div className="col-md-11">
                    <h1 className="fs-1 fw-bold text-center text-green">學 生 上 課 時 間 管 理</h1>
                    <div className="row justify-content-between gx-1">
                        <div className='col-md-2 row justify-content-center py-2'>
                            <button onClick={() => { }} className='btn btn-secondary  rounded-pill'>新增學員</button>
                        </div>
                        <div className='col-md-2 d-flex justify-content-center py-2'>
                            <select id='search_time' className='form-select'>
                                <option value='null'>--請選擇時間--</option>
                                <option value='1'>星期一</option>
                                <option value='2'>星期二</option>
                                <option value='3'>星期三</option>
                                <option value='4'>星期四</option>
                                <option value='5'>星期五</option>
                                <option value='6'>星期六</option>
                                <option value='7'>星期日</option>

                                {/* <WeekDate /> */}
                            </select>
                        </div>
                        <div className='col-md-2 d-flex justify-content-center py-2'>
                            <select id='search_identity' className='form-select'>
                                <option value='null'>--請選擇狀態--</option>
                                <option value='1'>在期學生帳號</option>
                                <option value='4'>非在期學生帳號</option>
                                <option value='3'>凍結帳號</option>

                            </select>
                        </div>
                        <div className='col-md-3 d-flex justify-content-center py-2'>
                            <input id='search_name'  className='form-control ' placeholder="請輸入要找的學生姓名..." />
                        </div>
                        <div className='col-md-2 row justify-content-center py-2'>
                            <button onClick={() => {fetchdata() }} className='btn bg-blue rounded-pill d-flex align-content-center justify-content-center'>
                                學生搜尋
                                <span className="material-symbols-outlined mx-1">
                                    search
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="row  justify-content-center">
                    <div className="col-md-11">
                        {userData != 'null' ? (
                            <>
                                {userData["user_id"].map((item, i) => (
                                        <div key={i} className="row border my-2 rounded-pill  item-hover p-2 py-3">
                                            <div className="col-md-1">
                                                <p className="fs-5 my-2 text-end">{userData["fullname"][i].slice(0, 3)}</p>
                                                <p id='user_id' style={{display:"none"}} className="fs-5 my-2 text-end">{userData["user_id"][i]}</p>

                                            </div>
                                            <div className="col-md-4">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <p className="fs-5 text-center my-2">程式課</p>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <select id='first_class1' className="form-select  text-center my-2 " >
                                                            <option value={String(userData["first_class"][i]).slice(0, 1)}>{setweek(String(userData["first_class"][i]).slice(0, 1))}</option>
                                                            <option value={'1'}>星期一</option>
                                                            <option value={"2"}>星期二</option>
                                                            <option value={"3"}>星期三</option>
                                                            <option value={"4"}>星期四</option>
                                                            <option value={"5"}>星期五</option>
                                                            <option value={"6"}>星期六</option>
                                                            <option value={"7"}>星期日</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <select id='first_class2' className="form-select  text-center my-2 " >
                                                            <option value={String(userData["first_class"][i]).slice(1, 2)}>{settime(String(userData["first_class"][i]).slice(1, 2))}</option>
                                                            <option value={"1"}>10:30~12:00</option>
                                                            <option value={"2"}>13:00~14:30	</option>
                                                            <option value={"3"}>14:30~16:00</option>
                                                            <option value={"4"}>16:00~17:30</option>
                                                            <option value={"5"}>17:30~19:00</option>
                                                            <option value={"6"}>19:00~20:30</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <p className="fs-5 text-center my-2">綜合課</p>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <select id='second_class1' className="form-select  text-center my-2 " >
                                                            <option value={String(userData["second_class"][i]).slice(0, 1)}>{setweek(String(userData["second_class"][i]).slice(0, 1))}</option>
                                                            <option value={'1'}>星期一</option>
                                                            <option value={"2"}>星期二</option>
                                                            <option value={"3"}>星期三</option>
                                                            <option value={"4"}>星期四</option>
                                                            <option value={"5"}>星期五</option>
                                                            <option value={"6"}>星期六</option>
                                                            <option value={"7"}>星期日</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <select id='second_class2' className="form-select  text-center my-2 " >
                                                            <option value={String(userData["second_class"][i]).slice(1, 2)}>{settime(String(userData["second_class"][i]).slice(1, 2))}</option>
                                                            <option value={"1"}>10:30~12:00</option>
                                                            <option value={"2"}>13:00~14:30	</option>
                                                            <option value={"3"}>14:30~16:00</option>
                                                            <option value={"4"}>16:00~17:30</option>
                                                            <option value={"5"}>17:30~19:00</option>
                                                            <option value={"6"}>19:00~20:30</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <select id='identity' style={{borderColor:setred(userData["identity"][i])}} className="form-select  text-center my-2 " >
                                                    <option value={userData["identity"][i]}>{userData["depiction"][i]}</option>
                                                    <option value={4}>非在期學生帳號</option>
                                                    <option value={1}>在期學生帳號</option>
                                                    <option className="text-danger" value={3}>凍結帳號</option>
                                                </select>
                                            </div>
                                            <div className='col-md-1 d-flex justify-content-center py-2'>
                                                <button onClick={() => { userUpdate()}} className='btn btn-secondary rounded-pill'>修改</button>
                                            </div>
                                        </div>
                                ))}
                            </>
                        ) : (
                            <>
                            </>

                        )}

                    </div>
                </div>


            </div>
        </>
    )
}