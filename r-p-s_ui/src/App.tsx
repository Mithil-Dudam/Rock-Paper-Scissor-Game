import { useEffect, useState } from 'react'
import './App.css'
import api from './api'

function App() {

  const [choice,setChoice] = useState<string>("")
  const [computerChoice,setComputerChoice] = useState<string>("")
  const [gamesPlayed,setGamesPlayed] = useState<number|"">("")
  const [wins,setWins] = useState<number|"">("")
  const [losses,setLosses] = useState<number|"">("")
  const [ties,setTies] = useState<number|"">("")
  const [message,setMessage] = useState<string>("")
  const [result,setResult] = useState<string>("")
  const [error,setError] = useState<string|null>(null)

  useEffect(() => {
    const ResetStats = async () =>{
      try{
        await api.post("/reset-stats")
        setGamesPlayed(0)
        setWins(0)
        setLosses(0)
        setTies(0)
      }catch(error:any){
        console.error("Error: Couldnt reset stats")
      }
    }  
    ResetStats()
  },[])
  
  const UserChoice = (e:React.MouseEvent<HTMLButtonElement>) => {
    setChoice(e.currentTarget.value)
  }

  const HandleSubmit = async (e:React.MouseEvent<HTMLButtonElement>) =>{
    setError(null)
    try{
      const response = await api.post("/r-p-s",{choice:choice})
      if(response.status === 200){
        setComputerChoice(response.data.Computer_Choice)
        setResult(response.data.Result)
        setMessage(response.data.Message)
        setGamesPlayed(response.data.Games_Played)
        setWins(response.data.Wins)
        setLosses(response.data.Losses)
        setTies(response.data.Ties)
      }
    }catch(error:any){
      console.error("Error: ",error)
      if(error.response){
        setError(error.response.data.detail)
      }else{
      setError("Error: Choice not selected")
      }
    }
  }

  return (
    <div className='min-w-screen min-h-screen bg-black'>
      <div className='pt-10'>
        <h1 className='text-6xl text-black text-center mx-80 bg-white rounded-full border-9 border-yellow-100 font-semibold pb-3'>Rock-Paper-Scissors</h1>
      </div>
      <div className='mx-50 text-black border-9 border-yellow-100 bg-white mt-10 pl-5 rounded-full text-center text-2xl pb-1 font-semibold'>
        <p>The rules are simple!</p>
        <p>Rock beats Scissor, Paper beats Rock and Scissor beats Paper</p>
      </div>
      <div className='text-black border-9 border-yellow-100 bg-white mt-10 pl-5 rounded-full py-2 mx-5'>
        <div className='flex justify-between'>
          <p className='w-200 mr-5 text-xl font-semibold rounded'>Select your Choice:</p>
          <button className={`w-full mr-5 bg-gray-200 border-2 font-semibold rounded cursor-pointer py-1 ${choice === "r" ? "border-black":"border-transparent"}`} onClick={UserChoice} value="r">Rock</button>
          <button className={`w-full mr-5 bg-blue-100 border-2 font-semibold rounded cursor-pointer py-1 ${choice === "p" ? "border-black":"border-transparent"}`} onClick={UserChoice} value="p">Paper</button>
          <button className={`w-full mr-5 bg-red-200 border-2 font-semibold rounded cursor-pointer py-1 ${choice === "s" ? "border-black":"border-transparent"}`} onClick={UserChoice} value="s">Scissor</button>
        </div>
        <div className='pt-4 flex justify-center'>
          <button className='w-50 mr-5 bg-green-200 font-semibold rounded cursor-pointer py-2' onClick={HandleSubmit}>Select Choice</button>
        </div>
      </div>
      <div className='bg-white mt-10 mx-5 border-9 border-yellow-100 rounded-full flex justify-between'>
        <h1 className='w-100 text-center pt-8 text-4xl font-semibold'>Result</h1>
        <div className='w-full flex flex-col items-center justify-center font-semibold text-lg'>
          <p className={`${error ? "pb-1 text-red-500":""}`}>{error||""}</p>
          <p className='pb-1'>Computer's Choice: {computerChoice||""}</p>
          <p className='pb-1'>{message||""}</p>
          <p>{result||"Waiting for input"}</p>
        </div>
        <div className='w-full flex items-center font-semibold text-lg justify-center'>
          <div className='flex flex-col'>
            <p>Games Played: {gamesPlayed||0}</p>
            <p>Wins: {wins||0}</p>
            <p>Losses: {losses||0}</p>
            <p>Ties: {ties||0}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
