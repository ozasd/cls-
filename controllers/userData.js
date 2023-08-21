const con = require("../database/db")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userData = {
    userUpdate: (req, res) => {
        var user_id = req.body.user_id
        var first_class = req.body.first_class
        var second_class = req.body.second_class
        var identity = req.body.identity
        var sql = `
        update cls_user_data
        set first_class = ${first_class} , second_class = ${second_class}
        where user_id = ${user_id}
        `
        con.query(sql,(err,rows)=>{
            if(err){
                res.json({ "狀態": "失敗", "訊息": "資料庫撈取失敗! ，請確認網路環境是否良好" })
            }else{
                var sql2 = `
                update cls_user
                set identity = ${identity}
                where user_id = ${user_id}
                `
                con.query(sql2,(err,rows)=>{
                    if(err){
                        res.json({ "狀態": "失敗", "訊息": "日期更新成功但狀態更新失敗 !" })
                    }else{
                        res.json({ "狀態": "成功", "訊息": "資料更新成功 !" })
                    }
                })
            }
        })
    },
    userData: (req, res) => {
        console.log("userData")
        // console.log(req.body)
        var sql = `
        SELECT cls_user.user_id,fullname,first_class,second_class,cls_user.identity,depiction
        FROM hct_cls.cls_user_data
        left join cls_user on cls_user.user_id = cls_user_data.user_id
        left join cls_identity on cls_identity.identity = cls_user.identity
        where (cls_user.identity = 1 or cls_user.identity = 4)
        order by depiction,fullname
        `
        con.query(sql, (err, rows) => {
            if (err) {
                res.json({ "狀態": "失敗", "訊息": "資料庫撈取失敗! ，請確認網路環境是否良好" })
            } else {
                let userData = {
                    user_id: [],
                    fullname: [],
                    first_class: [],
                    second_class: [],
                    identity: [],
                    depiction: []
                }
                Array.from(rows).forEach((item, i) => {
                    // console.log(item)
                    userData.user_id.push(item.user_id)
                    userData.fullname.push(item.fullname)
                    userData.first_class.push(item.first_class)
                    userData.second_class.push(item.second_class)
                    userData.identity.push(item.identity)
                    userData.depiction.push(item.depiction)
                })
                res.json(userData)
            }
        })
    }
}

module.exports = userData
