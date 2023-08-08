import {Outlet} from 'react-router-dom'
import {Sidebar} from './sidebar/Sidebar'
export function Index(){
    return(
      <>
      
       <div className='row vh-100 text-white'>
          <div className='col-md-2  h-100 bg-dark  shadow'>
            <Sidebar/>

            
          </div>
          <div className='col-md-10 bg-light text-dark vh-100 min-vh-100 ' style={{overflow:"auto"}}>
            <Outlet/>
  
          </div>
  
        </div>
      </>
    )
  }
  