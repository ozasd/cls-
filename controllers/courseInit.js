const util = require('util');
const con = require("../database/db")
const query = util.promisify(con.query).bind(con);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const course = {
    course_remove: (req, res) => {
        try {
            var sql = `
        DELETE FROM course_history 
        WHERE std_id = '${req.body.std_id}'
        AND course_id = '${req.body.course_id}'
        `
            // console.log(sql)
            con.query(sql, (err, rows) => {
                if (!err) {
                    res.json({ "狀態": "成功", "訊息": "已將學生刪除 !" })

                } else {
                    res.json({ "狀態": "失敗", "訊息": "發生了不明意外，再刪除時發生了錯誤 !" })
                }
            })

        } catch (error) {
            res.json({ "狀態": "失敗", "訊息": "發生了不明意外，再刪除時發生了錯誤 !" })

        }


    },
    course_history: (req, res) => {

        sql = `
        SELECT id,std_id,cls_user.fullname,class_id,course_history.course_id,course_name,count,type,duration
        FROM hct_cls.course_history,cls_user,course_list
        WHERE course_history.std_id = cls_user.user_id
        AND course_list.course_id = course_history.course_id

        `
        var data = req.body

        if (data.searach_course != '') {
            sql += `AND course_name like "%${data.searach_course}%" `
        }
        if (data.searach_name != '') {
            sql += `AND fullname like "%${data.searach_name}%" `
        }
        if (data.searach_type != '') {
            sql += `AND type = "${data.searach_type}" `
        }
        sql += `order by  std_id`
        con.query(sql, (err, rows) => {
            if (err) {
                console.log(err)
            } else {
                // console.log(rows)
                let course_history = {
                    id: [],
                    std_id: [],
                    fullname: [],
                    class_id: [],
                    course_id: [],
                    course_name: [],
                    count: [],
                    type: [],
                    duration: []

                }

                Array.from(rows).forEach((item, i) => {
                    course_history.id.push(item.id)
                    course_history.std_id.push(item.std_id)
                    course_history.fullname.push(item.fullname)
                    course_history.class_id.push(item.class_id)
                    course_history.course_id.push(item.course_id)
                    course_history.course_name.push(item.course_name)
                    course_history.count.push(item.count)
                    course_history.type.push(item.type)
                    course_history.duration.push(item.duration)
                })
                res.json(course_history)
            }

        })
    },
    course_data: (req, res) => {
        sql = `
        SELECT course_list.course_id,course_name,class_id 
        FROM hct_cls.course_list
        left join hct_cls.course_detail on hct_cls.course_detail.course_id = hct_cls.course_list.course_id
        WHERE class_id like "%01"
        order by course_name

        `
        con.query(sql, (err, rows) => {
            if (err) {
                console.log(err)
            } else {
                let course_data = {
                    course_id: [],
                    course_name: [],
                    class_id: [],

                }

                Array.from(rows).forEach((item, i) => {
                    course_data.course_id.push(item.course_id)
                    course_data.course_name.push(item.course_name)
                    course_data.class_id.push(item.class_id)

                })
                res.json(course_data)
            }

        })
    },
    course_insert: (req, res) => {
        sql_serach = `
        select *
        from course_history
        WHERE std_id = ${req.body.std_id} 
        AND course_id = ${req.body.course_id}
        `
        con.query(sql_serach, (err, rows) => {
            if (err) {
                console.log(err)

            } else {
                if (rows.length > 0) {
                    res.json({ "狀態": "失敗", "訊息": "該學生已有加入此課程，不需要再加入 !" })

                } else {
                    if (req.body.std_id != "" || req.body.course_id != "" || req.body.class_id != "" || req.body.type != "") {

                        var sql = `
                                INSERT INTO course_history(std_id,course_id,class_id,count,type)
                                VALUES ('${req.body.std_id}','${req.body.course_id}','${req.body.class_id}',${1},'${req.body.type}')
                                `
                        con.query(sql, (err, rows) => {
                            if (err) {
                                console.log(err)
                                res.json({ "狀態": "失敗", "訊息": "課程新增失敗，請再重試一次 !" })

                            } else {
                                res.json({ "狀態": "成功", "訊息": "課程新增成功 !" })
                            }
                        })
                    }
                }
            }
        })
    },
    course_update: (req, res) => {
        console.log("course_update")
        var sql = `
        update course_history
        set count = '${req.body.count}' , type = '${req.body.type}',class_id = '${req.body.class_id}'
        where std_id = '${req.body.std_id}'
        AND course_id = '${req.body.course_id}'
        `
        con.query(sql, (err, rows) => {
            if (err) {
                console.log(err)
                res.json({ "狀態": "失敗", "訊息": "課程更新失敗，請再重試一次 !" })

            } else {
                res.json({ "狀態": "成功", "訊息": "課程更新成功 !" })
            }
        })
    }
}
module.exports = course
