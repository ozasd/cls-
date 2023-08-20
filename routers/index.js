var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const express = require('express');
const path = require('path');
const router = express.Router();



router.get('/', (req, res) => {
    console.log('有人登陸了 Login 管理平台')
    res.sendFile(path.join(__dirname, '/views/admin/build', 'index.html'));

});
const login = require('../controllers/login')
router.post('/api-login', urlencodedParser,login.loginData);
router.post('/api-check_token', urlencodedParser,login.check_token);
const couseManage = require('../controllers/couseManage')
router.post('/api-teacherData', urlencodedParser,couseManage.teacherData);
router.post('/api-studentData', urlencodedParser,couseManage.studentData);
router.post('/api-courseData', urlencodedParser,couseManage.courseData);
router.post('/api-courseUpdate', urlencodedParser,couseManage.courseUpdate);
router.post('/api-courseAdd', urlencodedParser,couseManage.courseAdd);
router.post('/api-add_record', urlencodedParser,couseManage.add_record);

const couseInit = require('../controllers/courseInit')
router.post('/api-course_history', urlencodedParser,couseInit.course_history);
router.post('/api-course_insert', urlencodedParser,couseInit.course_insert);
router.post('/api-course_update', urlencodedParser,couseInit.course_update);
router.post('/api-course_data', urlencodedParser,couseInit.course_data);
router.post('/api-course_remove', urlencodedParser,couseInit.course_remove);
const courseBuilder = require('../controllers/courseBuilder')
router.post('/api-course_builder', urlencodedParser,courseBuilder.Course_builder)
router.post('/api-nextcourse_remove', urlencodedParser,courseBuilder.Course_remove)

module.exports = router;
