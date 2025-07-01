import React from 'react'
import { useState } from 'react'
import { Box, Button, Modal, Paper, TextField, Typography } from '@mui/material'
import { useEffect } from 'react'

function App() {

    const Words = [
  "antidisestablishmentarianism",
  "floccinaucinihilipilification",
  "pseudopseudohypoparathyroidism",
  "thyroparathyroidectomized",
  "psychoneuroendocrinological",
  "radioimmunoelectrophoresis",
  "otorhinolaryngological",
  "immunoelectrophoretically",
  "psychopharmacological",
  "spectrophotometrically",
  "electroencephalographs",
  "pharmacogenetically",
  "microarchitectural",
  "electroencephalography",
  "uncontrollably",
  "misinterpretation",
  "characteristically",
  "counterintuitively",
  "incompatibilities",
  "unconstitutionality",
  "overintellectualized",
  "disenfranchisement",
  "incomprehensibility",
  "oversimplification",
  "representationally",
  "semiautobiographical",
  "indistinguishability",
  "multidimensionality",
  "underappreciated",
  "unrecognizability"
]

    const [TimeLeft, setTimeLeft] = useState(60)

    const [Score, setScore] = useState(0)

    const [CurrentWord, setCurrentWord] = useState("")

    const [UserInput, setUserInput] = useState("")

    const [IsRunning, setIsRunning] = useState(false)

    const TrackLength = 1000    

    const TotalTime = 60

    const OpponentProgress = (TotalTime - TimeLeft)  / TotalTime

    const OpponentCarLeft = OpponentProgress * (TrackLength - 60)

    const GenerateRandomWord = () => {
        const RandomIndex = Math.floor(Math.random() * Words.length)
        setCurrentWord(Words[RandomIndex])
    }

    useEffect(() => {
    if (UserInput && !IsRunning) {
      setIsRunning(true);
    }
  }, [UserInput]);

    useEffect(() => {
        GenerateRandomWord()
    }, [])

    useEffect(() => {
        if (IsRunning && TimeLeft > 0) {
            const Timer = setInterval(() => {
                setTimeLeft((t) => t - 1)
            }, 1000);
            return() => clearInterval(Timer)
        } else if ( TimeLeft === 0) {
            setIsRunning(false)
        }
    }, [IsRunning, TimeLeft])

    const HandleChange = (e) => {
        setUserInput(e.target.value)
        if (e.target.value.trim() === CurrentWord) {
            setScore((prev) => prev + 1)
            setUserInput("")
            GenerateRandomWord()
        }
    }

    const ResetGame = () => {
    setTimeLeft(60);
    setScore(0);
    setUserInput("");
    GenerateRandomWord()
    setIsRunning(false)
  };

  return (
    <div>
        <Box
        sx={{
            textAlign: 'center',
            mt: 5,
            display: 'flex',
            justifyContent: 'center'
        }}
        >
            <Paper
            elevation={3}
            sx={{
                padding: 4,
                width: 400
            }}
            >
                <Typography
                variant='h4'
                >
                    Typing Speed Checker
                </Typography>

                <Typography
                variant='h6'
                fontWeight = "bold"
                >
                    Time Left: {TimeLeft}
                </Typography>

                <Typography
                variant='h6'
                fontWeight = "bold"
                >
                    Score: {Score}
                </Typography>

                <Typography
                variant='body1'
                >
                    Type This Word: 
                    <Typography
                    color = 'primary'
                    fontWeight = "bold"
                    variant = 'h5'
                    >
                        {CurrentWord}
                    </Typography>
                </Typography>

                <TextField
                id="filled-basic"
                label="Type Here"
                variant="outlined"
                value={UserInput}
                onChange={HandleChange}
                disabled = {TimeLeft === 0}
                sx={{
                    mt: 3
                }}/>

            </Paper>
        </Box>

                {TimeLeft === 0 && (
                
                    
        <Modal
        open = {true}
        onClose = {ResetGame}
        >
      <Box
      sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            bgcolor: 'white',
            textAlign: 'center',
            transform: 'translate(-50%, -50%)',
            minWidth: 300,
            p: 4,
            borderRadius: 3,
            border: 'none'
        }}
      >

          <Typography variant="h5">Game Over!</Typography>
          <Typography variant='h6'>Your Final Score Was: {Score}</Typography>
          <Button variant="contained" color="primary" onClick={ResetGame}>
            Reset Game
          </Button>
      </Box>
        </Modal>
        
      )}

      <Box
      sx={{
        height: 100,
        width: "100%",
        bgcolor: "#ddd",
        mt: 5,
        overflow: 'hidden',
        position: 'relative'
      }}
      >
        <img
        src={`${process.env.PUBLIC_URL}/images/Car.png`}
        alt="example"
        style={{
            position: 'absolute',
            height: 60,
            left: `${Score * 45}px`,
            top: 20,
            transition: 'left 0.3s ease'
        }}
        />
      </Box>

      <Box
      sx={{
        height: 100,
        width: "100%",
        bgcolor: "#ddd",
        mt: 5,
        overflow: 'hidden',
        position: 'relative'
      }}
      >
        <img
        src={`${process.env.PUBLIC_URL}/images/Car.png`}
        alt="example"
        style={{
            position: 'absolute',
            height: 60,
            left: `${OpponentCarLeft}px`,
            top: 20,
            transition: 'left 0.3s ease'
        }}
        />
      </Box>

    </div>
  )
}

export default App