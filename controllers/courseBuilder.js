const util = require('util');
const con = require("../database/db")
const query = util.promisify(con.query).bind(con);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pd = require('pandas-js');

function displayWeekDates() {
    // 取得今天的日期
    var today = new Date();
    today = today.setDate(today.getDate() + 7)
    today = new Date(today);
    // 取得今天是星期幾（0 表示星期日，1 表示星期一，以此類推）
    var dayOfWeek = today.getDay();
    if (dayOfWeek === 0 ){
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
        date_week.push([week, date])
    }
    return date_week
}
function exchange_time(e) {
    const date = displayWeekDates()
    const time = [
        "10:30~12:00",
        "13:00~14:30",
        "14:30~16:00",
        "16:00~17:30",
        "17:30~19:00",
        "19:00~20:30",
    ]

    // console.log("date",date[parseInt(String(e).slice(0,1))-1][1])
    // console.log("time",date[parseInt(String(e).slice(0,1))-1][0]+" "+time[parseInt(String(e).slice(1,2))-1])
    return { "date": date[parseInt(String(e).slice(0, 1)) - 1][1], "time": date[parseInt(String(e).slice(0, 1)) - 1][0] + " " + time[parseInt(String(e).slice(1, 2)) - 1] }

}
function sortByDate(data) {
    const sortedIndices = data.class_date.map((_, index) => index)
      .sort((a, b) => new Date(data.class_date[a]) - new Date(data.class_date[b]));
  
    const sortedData = {};
    for (const key in data) {
      sortedData[key] = sortedIndices.map(index => data[key][index]);
    }
  
    return sortedData;
  }
const Course_builder = {
    Course_remove:(req,res) =>{
        console.log('next_Course_remove')
        var data = req.body.id
        var sql = `
        delete from course_record
        where id = ${data}
        `
        // console.log(sql)
        con.query(sql,(err,rows)=>{
            if(!err){
                res.json({"狀態":"成功","訊息":"刪除成功 !"})

            }else{
                res.json({"狀態":"失敗","訊息":"刪除失敗 !"})

            }
        })
    },
    Course_builder: (req, res) => {
        const df = new pd.DataFrame({
            studentid: req.body.studentid.split(','),
            type_id: req.body.type_id.split(','),
            teacherid: req.body.teacherid.split(','),
            time: req.body.time.split(','),
            date: req.body.date.split(',')
        })

        var sql = `
        SELECT std_id,course_history.course_id,class_id ,first_class,second_class,type_id
        FROM hct_cls.course_history,course_list,cls_user_data
        where  course_history.course_id = course_list.course_id
        AND cls_user_data.user_id = course_history.std_id
        and type = '進行中' 

        `

        con.query(sql, function (err, rows) {
            if (err) {
                console.log(err)
            } else {
                Array.from(rows).forEach((item, i) => {
                    var datetime = null
                    if (item.type_id == 1) {
                        // console.log("程式課")
                        datetime = exchange_time(item.first_class)
                    } else {
                        // console.log("綜合課")
                        datetime = exchange_time(item.second_class)
                    }
                    var class_date = datetime['date']
                    var class_time = datetime['time']
                    var std_id = item.std_id
                    var class_id = item.class_id
                    var type_id = item.type_id
                    var course_id = item.course_id
                    const data = {
                        "class_date": [class_date],
                        "class_time": [class_time],
                        "std_id": [String(std_id)],
                        "teacher_id": [null],
                        "class_id": [class_id],
                        "type_id": [String(type_id)],
                        "course_id": [course_id]

                    }
                    Array.from(df['_data']["studentid"]).forEach((item, i) => {
                        if (item == std_id && type_id == (df['_data']["type_id"][i])) {

                
                            var n = parseInt(class_id.slice(-2)) + 1 
                            if (n < 10) {
                                n = "0" + String(n)
                            } else {
                                n = String(n)
                            }
                            var teacher_id = df['_data']["teacherid"][i]
                            if( teacher_id == '未指定'){
                                teacher_id = null
                            }
                           

                            data['class_date'].push(df['_data']["date"][i])
                            data['class_time'].push(df['_data']["time"][i])
                            data['std_id'].push(df['_data']["studentid"][i])
                            data['teacher_id'].push(teacher_id)
                            data['class_id'].push(class_id.slice(0, -2) + n)
                            data['type_id'].push(df['_data']["type_id"][i])
                            data['course_id'].push(course_id)

                        }

                    })
                    var Sortdata = sortByDate(data)
                    Sortdata['class_id'].sort()
                    Array.from(Sortdata['class_id']).forEach((item,i)=>{
                        var sql = `
                        insert into course_record (class_date,class_time,std_id,class_id,teacher_id,type_id,finish,course_id,comment)
                        values('${Sortdata['class_date'][i]}','${Sortdata['class_time'][i]}','${Sortdata['std_id'][i]}','${Sortdata['class_id'][i]}',${Sortdata['teacher_id'][i]},'${Sortdata['type_id'][i]}','0','${Sortdata['course_id'][i]}',"#自動生成課表")
                        ` 
                        console.log(sql)
                        con.query(sql,(err,rows)=>{
                            if(!err){
                                console.log("新增成功 !") 
                            }else{
                                console.log("新增失敗 !")
                            }
                        })
                    })
                })
            }
        })
        res.json({"訊息":"排課完成 !"})
    }


}
module.exports = Course_builder
