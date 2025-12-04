import React from 'react'

function formatTime(sec) {
  const mm = Math.floor(sec / 60).toString().padStart(2,'0')
  const ss = (sec % 60).toString().padStart(2,'0')
  return `${mm}:${ss}`
}

export default function TimerDisplay({ seconds }) {
  return (
    <div className="text-center text-6xl font-mono py-6">
      {formatTime(seconds)}
    </div>
  )
}
