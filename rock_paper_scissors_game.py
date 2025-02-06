# Rock-Paper-Scissors Game

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random

app=FastAPI()

origins = ['http://localhost:5173']
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Choice(BaseModel):
    choice:str

options = ["p","r","s"]
choice_names = {"r": "Rock", "p": "Paper", "s": "Scissors"}
count = 0
wins = 0
losses = 0
ties = 0

@app.post("/r-p-s",status_code=status.HTTP_200_OK)
async def r_p_s(user:Choice):
    global count,wins,losses,ties
    if user.choice == "":
        raise HTTPException(status_code=422,detail="Please Select a choice!")
    count += 1
    computer_choice = random.choice(options)
    if computer_choice == user.choice:
        ties+=1
        return{"Result":"Tie","Computer_Choice":choice_names[computer_choice], "Games_Played":count, "Wins":wins, "Losses":losses, "Ties":ties}    
    elif computer_choice == 'p':
        if user.choice == 'r':
            losses +=1
            return {"Result":"Computer Wins!", "Message":"Paper beats Rock!","Computer_Choice":choice_names[computer_choice], "Games_Played":count, "Wins":wins, "Losses":losses, "Ties":ties}
        else:
            wins +=1 
            return {"Result":"You Win!", "Message":"Scissor beats Paper!","Computer_Choice":choice_names[computer_choice], "Games_Played":count, "Wins":wins, "Losses":losses, "Ties":ties}
    elif computer_choice == 'r':
        if user.choice == 'p':
            wins +=1
            return {"Result":"You Win!", "Message":"Paper beats Rock!","Computer_Choice":choice_names[computer_choice], "Games_Played":count, "Wins":wins, "Losses":losses, "Ties":ties}
        else:
            losses +=1
            return {"Result":"Computer Wins!", "Message":"Rock beats Scissor!","Computer_Choice":choice_names[computer_choice], "Games_Played":count, "Wins":wins, "Losses":losses, "Ties":ties}
    else:
        if user.choice == 'p':
            losses +=1
            return {"Result":"Computer Wins!", "Message":"Scissor beats Paper!","Computer_Choice":choice_names[computer_choice], "Games_Played":count, "Wins":wins, "Losses":losses, "Ties":ties}
        else:
            wins +=1
            return {"Result":"You Win!", "Message":"Rock beats Scissor!","Computer_Choice":choice_names[computer_choice], "Games_Played":count, "Wins":wins, "Losses":losses, "Ties":ties}

@app.post("/reset-stats")
async def reset_stats():
    global count,wins,losses,ties
    count=0
    wins=0
    losses=0
    ties=0
    return {"Message":"Stats reset successfully"}