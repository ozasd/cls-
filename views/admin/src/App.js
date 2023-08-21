import './App.css';
import { Index } from './views/Index'
import { Route, Routes } from 'react-router-dom';
import { Course_manage } from './views/pages/admin/Course_manage'

import { useSelector, useDispatch } from 'react-redux';

import { Login } from './views/pages/Login'
import { setLogin } from './views/DataSlice'
import {Error404} from './views/pages/user/Error404'
import {Course_builder} from './views/pages/admin/Course_builder'
import {Course_init} from './views/pages/admin/Course_init'
import {Course_time} from './views/pages/admin/Course_time'
const ipconfig = require('./ipconfig')
const path = ipconfig.webhost + ":" + ipconfig.port
function App() {
  const dispatch = useDispatch()
  const isLogin = useSelector((state) => (state.Data.Login))
  const identify = useSelector((state) => (state.Data.identify))
  const keep = localStorage.getItem('keep')
  const user_id = localStorage.getItem('user_id')
  const token = localStorage.getItem('token')
  if (keep === 'true') {

    var href = path + '/api-check_token'

    fetch(href, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        'user_id': user_id,
        'token': token
      })
    }).then(response => response.json())
      .then(data => {
        var userData = {
          'user': localStorage.getItem('nickname'),
          'identify': localStorage.getItem('identify')
        }
        dispatch(setLogin(userData))
      }).catch((err)=>{
        alert(err)
      })
  }

  return (
    <>


      <Routes>
        {isLogin !== true ? (
          <Route path='/' element={<Login />}></Route>

        ) : (
          <>
            {identify == "2" ? (
              <>
                <Route element={<Index />}>
                  <Route path='/' element={<Course_manage />}></Route>
                  <Route path='/Course_builder' element={<Course_builder />}></Route>
                  <Route path='/Course_init' element={<Course_init />}></Route>
                  <Route path='/Course_time' element={<Course_time />}></Route>


                  
                </Route>
              </>
            ) : (
              <>
                <Route path='/' element={<Error404 />}></Route>

              
              </>
            )}

          </>

        )

        }



      </Routes>

    </>
  )

}




export default App;
