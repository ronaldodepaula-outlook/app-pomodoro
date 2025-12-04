import { useCallback } from 'react'

// Mantemos um único AudioContext compartilhado para evitar criar muitos contextos
let sharedAudioContext = null

function getAudioContext() {
  if (!sharedAudioContext) {
    try {
      sharedAudioContext = new (window.AudioContext || window.webkitAudioContext)()
    } catch (err) {
      console.warn('AudioContext não disponível:', err)
      sharedAudioContext = null
    }
  }
  return sharedAudioContext
}

export default function useSound() {
  const playNotificationSound = useCallback(() => {
    try {
      const audioContext = getAudioContext()
      if (!audioContext) return

      // Garantir que o contexto esteja em estado 'running' (políticas de autoplay)
      // Chamamos resume() e só então criamos/schedulamos os osciladores
      Promise.resolve(audioContext.state === 'running' ? null : audioContext.resume())
        .then(() => {
          const now = audioContext.currentTime
          const notes = [
            { freq: 800, start: now + 0.01, duration: 0.18 },
            { freq: 1000, start: now + 0.25, duration: 0.18 },
            { freq: 1200, start: now + 0.5, duration: 0.28 }
          ]

          notes.forEach(({ freq, start, duration }) => {
            const osc = audioContext.createOscillator()
            const gain = audioContext.createGain()

            osc.connect(gain)
            gain.connect(audioContext.destination)

            osc.frequency.value = freq
            osc.type = 'sine'

            gain.gain.setValueAtTime(0.0001, start)
            gain.gain.linearRampToValueAtTime(0.3, start + 0.01)
            gain.gain.exponentialRampToValueAtTime(0.001, start + duration)

            osc.start(start)
            osc.stop(start + duration + 0.02)
          })
        })
        .catch((err) => {
          console.warn('Não foi possível resumir AudioContext:', err)
        })
    } catch (err) {
      console.warn('Não foi possível reproduzir som:', err)
    }
  }, [])

  const playWarningSound = useCallback(() => {
    try {
      const audioContext = getAudioContext()
      if (!audioContext) return

      Promise.resolve(audioContext.state === 'running' ? null : audioContext.resume())
        .then(() => {
          const now = audioContext.currentTime
          const osc = audioContext.createOscillator()
          const gain = audioContext.createGain()

          osc.connect(gain)
          gain.connect(audioContext.destination)

          osc.frequency.value = 1500
          osc.type = 'sine'

          gain.gain.setValueAtTime(0.0001, now)
          gain.gain.linearRampToValueAtTime(0.2, now + 0.01)
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3)

          osc.start(now)
          osc.stop(now + 0.32)
        })
        .catch((err) => {
          console.warn('Não foi possível resumir AudioContext para som de aviso:', err)
        })
    } catch (err) {
      console.warn('Não foi possível reproduzir som de aviso:', err)
    }
  }, [])

  return { playNotificationSound, playWarningSound }
}
