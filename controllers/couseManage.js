const util = require('util');
const con = require("../database/db")
const query = util.promisify(con.query).bind(con);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const course = {
    courseBuilder: (req, res) => {
        sql = `
        SELECT distinct std_id,fullname,first_class,second_class
        FROM hct_cls.course_record
        left join cls_user_data on hct_cls.cls_user_data.user_id = hct_cls.course_record.std_id
        left join cls_user on hct_cls.cls_user.user_id = hct_cls.course_record.std_id
        WHERE class_date BETWEEN '2023-07-17' AND '2023-07-30'
        AND std_id != 32
        AND std_id != 33
        order by std_id
        `
        
        var time = ['10:30~12:00','13:00~14:30','14:30~16:00','16:00~17:30','17:30~19:00','19:00~20:30']
        var week = ['星期一','星期二','星期三','星期四','星期五','星期六','星期日']

        function change_date(e){
            var w = null
            var t = null
            
        }
        // console.log(change_date('52'))
        con.query(sql, (err, rows) => {
            if (!err) {
                // console.log(rows)
                let student_data = {

                    std_id: [],
                    fullname: [],
                    first_class:[],
                    second_class:[]

                }

                Array.from(rows).forEach((item, i) => {
                    student_data.std_id.push(item.std_id)
                    student_data.fullname.push(item.fullname)
                    student_data.first_class.push(item.first_class)
                    student_data.second_class.push(item.second_class)
                })
                // console.log(teacher_data)
                res.json(student_data)
            }

        })

    },
    courseAdd: (req, res) => {
        console.log('courseAdd')
        // console.log(req.body)
        var data = req.body
        var sql = `
        SELECT course_record.std_id,course_record.class_id,course_list.duration,course_record.course_id
        FROM hct_cls.course_record,course_detail
        left join course_list on course_list.course_id = course_detail.course_id
        WHERE course_record.class_id = course_detail.class_id 
        and course_record.std_id = ${data.id}
        and course_record.type_id = ${data.course}
        
        order by  class_date DESC , class_time DESC  LIMIT 1
        `
        // and course_record.finish = 1
        // console.log(sql)
        con.query(sql, (err, rows) => {
            if (err) {
                res.json({ "狀態": "失敗", "訊息": "資料庫撈取失敗! ，請確認網路環境是否良好" })
            } else {
                // console.log(rows)
                var class_id = rows[0].class_id
                var course_number = class_id.slice(-2)
                var course_name = class_id.split(course_number)[0]
                // console.log(course_number, course_name)
                // console.log(rows[0].duration, course_number)
                course_number = parseInt(course_number) + 1

                if (course_number < 10) {
                    course_number = "0" + course_number
                }
                var teacher = null
                if(req.body.teacher !== "未完成"){
                    teacher =req.body.teacher 
                }

                if (parseInt(rows[0].duration) >= parseInt(course_number)) {
                    var sql = `
                    INSERT INTO course_record(class_date,class_time,std_id,class_id,teacher_id,type_id,finish,course_id)
                    VALUES ('${req.body.date}','${req.body.time}','${req.body.id}','${course_name + course_number}',${teacher},'${req.body.course}','${req.body.finish}','${rows[0].course_id}')

                    `
                    // console.log(sql)
                    con.query(sql, (err, rows) => {
                        if (err) {
                            res.json({ "狀態": "失敗", "訊息": "課程新增失敗，請再重試一次 !" })

                        } else {
                            res.json({ "狀態": "成功", "訊息": "課程新增成功 !" })
                        }

                    })

                } else {
                    res.json({ "狀態": "失敗", "訊息": "此課程已經上完，無須補課!" })

                }


            }

        })
    },

    courseUpdate: (req, res) => {
        console.log("courseUpdate")
        var data = req.body
        // console.log(data)

        var id = data['finish']
        if (data['finish'] == "未完成") {
            // console.log("修改")
            id = 0
        }
        var teacher = data['teacher']
        if (data['teacher']=="未完成"){
            teacher = null
        }
        var course_id = ''
        if (data.course_id != "") {
            course_id += `class_id = '${data['course_id']}',`
        }
        var sql = `
        UPDATE  course_record
        set  class_date = '${data['date']}',class_time = '${data['time']}',
        `
            +
            course_id
            +
            `
        teacher_id = ${teacher},finish = '${id}'
        where id = '${data['id']}'
        `
        // console.log(sql)

        // where id = '${data['id']}'
        // where id = '1'

        con.query(sql, (err, rows) => {
            if (err) {

                res.json({ "狀態": "失敗" })
            } else {
                res.json({ "狀態": "成功" })

            }

        })

    },
    teacherData: (req, res) => {
        console.log('teacherData')
        sql = `
        SELECT user_id , nickname
        FROM hct_cls.cls_user
        where identity = 2
        `

        // console.log(sql)
        con.query(sql, (err, rows) => {
            if (!err) {
                // console.log(rows)
                let teacher_data = {

                    teacher_id: [],
                    nickname: []

                }

                Array.from(rows).forEach((item, i) => {
                    // console.log(item)
                    teacher_data.teacher_id.push(item.user_id)
                    teacher_data.nickname.push(item.nickname)


                })
                // console.log(teacher_data)
                res.json(teacher_data)
            }

        })

    },
    studentData: (req, res) => {
        console.log('studentData')
        sql = `
        SELECT user_id,fullname
        FROM hct_cls.cls_user
        where identity = 1  
        `
        con.query(sql, (err, rows) => {
            // console.log(rows)。
            if (!err) {
                // console.log(rows)
                let student_data = {
                    student_id: [],
                    fullname: []
                }

                Array.from(rows).forEach((item, i) => {
                    // console.log(item)
                    student_data.student_id.push(item.user_id)
                    student_data.fullname.push(item.fullname)

                })
                // console.log(teacher_data)
                res.json(student_data)
            }

        })
    },
    courseData: (req, res) => {

        console.log('Show Course Data')
        var searchtime = req.body.searchtime


        var sql_time = null
        // console.log(req.body)
        if (searchtime != 'null') {
            console.log(searchtime)
            sql_time = `WHERE class_date = '${searchtime}'`

        } else {
            var start = req.body.start
            var end = req.body.end
            sql_time = `WHERE class_date BETWEEN '${start}' AND '${end}'`
        }

        // console.log(req.body)
        if (req.body.searchfinish != 'null') {
            sql_time += ` AND  finish = ${req.body.searchfinish}`
        }
        if (req.body.searchname != '') {
            sql_time += ` AND student.fullname like '%${req.body.searchname}%'`


        }

        sql = `
        SELECT id,course_record.class_date,course_record.class_time,course_record.std_id, student.fullname ,course_record.class_id,course_detail.class_title,teacher_id,teacher.nickname,type_id,IF(finish='0',null,finish) as finish
        FROM hct_cls.course_record 
        left join cls_user as teacher on course_record.teacher_id = teacher.user_id
        left join cls_user as student on course_record.std_id = student.user_id
        left join course_detail on course_record.class_id =course_detail.class_id
        `+

            sql_time
            +
            `
        order by class_date

        `
        // console.log(sql)
        con.query(sql, (err, rows) => {
            if (!err) {
                let course_record = {
                    id: [],
                    class_date: [],
                    class_time: [],
                    std_id: [],
                    fullname: [],
                    class_id: [],
                    class_title: [],
                    teacher_id: [],
                    nickname: [],
                    type_id: [],
                    finish: []
                }

                Array.from(rows).forEach((item, i) => {
                    course_record.id.push(item.id)
                    course_record.class_date.push(item.class_date)
                    course_record.class_time.push(item.class_time)
                    course_record.std_id.push(item.std_id)
                    course_record.fullname.push(item.fullname)
                    course_record.class_id.push(item.class_id)
                    course_record.class_title.push(item.class_title)
                    course_record.teacher_id.push(item.teacher_id)
                    course_record.nickname.push(item.nickname)
                    course_record.type_id.push(item.type_id)
                    course_record.finish.push(item.finish)

                })
                // console.log(course_record)
                res.json(course_record)

            }else{
                console.log("發生錯誤!")
            }

        })





    }
}

module.exports = course
