import { useRef, useCallback, useEffect } from 'react'

const useSoundEffects = () => {
  const audioContextRef = useRef(null)
  const isEnabledRef = useRef(false)

  useEffect(() => {
    const initAudio = () => {
      try {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
        isEnabledRef.current = true
      } catch {
        console.warn('Web Audio API not supported')
      }
    }

    const handleInteraction = () => {
      if (!audioContextRef.current) initAudio()
      if (audioContextRef.current?.state === 'suspended') {
        audioContextRef.current.resume()
      }
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('scroll', handleInteraction)
    }

    window.addEventListener('click', handleInteraction)
    window.addEventListener('scroll', handleInteraction)

    return () => {
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('scroll', handleInteraction)
    }
  }, [])

  const playTone = useCallback((frequency, duration, type = 'sine', volume = 0.08) => {
    if (!audioContextRef.current || !isEnabledRef.current) return

    try {
      const ctx = audioContextRef.current
      if (ctx.state === 'suspended') return

      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator.type = type
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime)

      gainNode.gain.setValueAtTime(0, ctx.currentTime)
      gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.02)
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)

      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + duration)
    } catch {
      // Silently fail
    }
  }, [])

  const playScrollTransition = useCallback((categoryIndex) => {
    const baseFreqs = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25]
    const freq = baseFreqs[categoryIndex] || 261.63

    playTone(freq, 0.3, 'sine', 0.06)
    setTimeout(() => playTone(freq * 1.5, 0.2, 'triangle', 0.04), 50)
    setTimeout(() => playTone(freq * 2, 0.15, 'sine', 0.03), 100)
  }, [playTone])

  const playHover = useCallback(() => {
    playTone(800, 0.08, 'sine', 0.03)
  }, [playTone])

  const playClick = useCallback(() => {
    playTone(600, 0.1, 'square', 0.04)
    setTimeout(() => playTone(900, 0.08, 'sine', 0.03), 30)
  }, [playTone])

  return { playScrollTransition, playHover, playClick }
}

export default useSoundEffects
