const util = require('util');
const con = require("../database/db")
const query = util.promisify(con.query).bind(con);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const login = {
    loginData: (req, res) => {
        con.query('SELECT nickname,pwd,identity,user_id FROM cls_user WHERE act = ? ', req.body.user, function (err, rows) {
            if (err) {
                console.log("SQL ERROR")
                res.json({
                    "狀態": false
                })
            } else {
                if (rows.length == 0) {
                    console.log('查無帳號密碼')
                    res.json({
                        "狀態": false
                    })
                } else {
                    if (bcrypt.compareSync(req.body.password, rows[0].pwd)) {
                        console.log("帳號密碼輸入正確 !")
                        const formatDate = (current_datetime) => {
                            let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
                            return formatted_date;
                        }
                        const payload = {
                            userAccount: req.body.user,
                            userPassword: req.body.password,
                        }
                        var token = jwt.sign({ payload }, "my_secret_key", {
                            algorithm: "HS256",
                            expiresIn: 200,
                        })
                        var date = new Date();
                        con.query('UPDATE cls_user SET token = ?,last_login = ? WHERE user_id = ?', [token, formatDate(date), rows[0].user_id],()=>{
                            if(err){
                                console.log("token 設置失敗")
                            }else{
                                console.log("token 設置成功")
                            }
                        })
                        
                        res.json({
                            "狀態":true,
                            "nickname":rows[0].nickname,
                            "identify":rows[0].identity,
                            "token":token,
                            "user_id":rows[0].user_id
                        })

                    } else {
                        console.log('帳號密碼錯誤')
                        res.json({
                            "狀態": false
                        })
                    }
                }
            }
        })

    },
    check_token:(req,res)=>{
        console.log("check_token")
        con.query('SELECT * FROM hct_cls.cls_user where user_id = ? and token = ? ', [req.body.user_id,req.body.token], function (err, rows) {
            if (rows.length != 0 ){
                res.json({
                    "狀態": true
                })
            }else{
                res.json({
                    "狀態": false
                })

            }
        })
    }
}

module.exports = login

