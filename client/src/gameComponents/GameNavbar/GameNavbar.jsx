import React, { useState } from 'react'
import './GameNavbar.css'
import CreateScene from '../CreateScene';
export default function GameNavbar() {
const {timer, setTimer} = useState(60);
  

  return (
    <>
    <header className='gameHeader'>
      <div className='stats'>
        <div className='coins'>
          <i className="fa-solid fa-gem text-blue-300"></i>
          <p className='text-white font-semibold'>5</p>
        </div>

        <div className='bucket'>
          <i className="fa-solid fa-fill-drip text-blue-500"></i>
        
          <div className="bg-blue-100 my-2">
            <div className='bg-blue-500 h-[10px] w-1/2'></div>
          </div>
        </div>
        <div>
          <div className='my-4 px-2'>
            <span className='text-white'>Lv: </span><span className='text-white'> 5</span>
          </div>
        </div>
        
      </div>

      <div>
          <div><span className='text-white'>Next Rain In : </span><span className='text-white'>{" Hours : "+ " Minutes"} </span></div>
      </div>

      <div>
        <button className='bg-white rounded-md px-[24px] py-[10px] shadow-lg'>Logout</button>
      </div>
    </header>

    <div className="eventsContainer">
    <div className="eventItem">
      <h2 onClick={()=>{alert("Ads will be shown on clicking on the watch ads") }}>Watch Ads</h2>
    </div> 
    <div className="eventItem">
      <h2 onClick={()=>{alert("Quiz Of The Day will be shown on clicking on the Quiz Of The Day") }}>Quiz Of The Day</h2>
    </div>   
    <div className="eventItem">
      <h2 onClick={()=>{alert("Latest Events will be shown on clicking on the Latest Events")}}>Latest Events</h2>
    </div>  
    </div>

    <div className="h-1/2">
     <CreateScene/>
      <h1>Game Window</h1>
      <h2>Features game will be containing are listed below:</h2>
      {/* <div className="gameAssets">
      <i className="fa-brands fa-stack-exchange text-white"></i>
      <i className="fa-solid fa-house text-amber-900"></i>
      <i className="fa-brands text-blue-400 fa-bitbucket tankIcon"></i>
      </div> */}
    </div>
    
    </>
  )
}
