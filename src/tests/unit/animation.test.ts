import { describe, it, expect } from 'vitest'
import { easingFunctions, interpolate, getValueAtTime } from '@/utils/animation'

describe('Animation utilities', () => {
  it('should apply linear easing', () => {
    expect(easingFunctions.linear(0)).toBe(0)
    expect(easingFunctions.linear(0.5)).toBe(0.5)
    expect(easingFunctions.linear(1)).toBe(1)
  })

  it('should apply easeIn easing', () => {
    expect(easingFunctions.easeIn(0)).toBe(0)
    expect(easingFunctions.easeIn(1)).toBe(1)
    expect(easingFunctions.easeIn(0.5)).toBeLessThan(0.5)
  })

  it('should interpolate between values', () => {
    expect(interpolate(0, 100, 0)).toBe(0)
    expect(interpolate(0, 100, 1)).toBe(100)
    expect(interpolate(0, 100, 0.5, 'linear')).toBe(50)
  })

  it('should get value at time from keyframes', () => {
    const keyframes = [
      { time: 0, value: 0, easing: 'linear' },
      { time: 1, value: 100, easing: 'linear' },
    ]

    expect(getValueAtTime(keyframes, 0)).toBe(0)
    expect(getValueAtTime(keyframes, 1)).toBe(100)
    expect(getValueAtTime(keyframes, 0.5)).toBe(50)
  })
})
