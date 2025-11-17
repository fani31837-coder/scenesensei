// Animation easing functions
export const easingFunctions = {
  linear: (t: number): number => t,
  
  easeIn: (t: number): number => t * t,
  
  easeOut: (t: number): number => t * (2 - t),
  
  easeInOut: (t: number): number => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  
  cubicBezier: (p0: number, p1: number, p2: number, p3: number, t: number): number => {
    const mt = 1 - t
    return mt * mt * mt * p0 + 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t * p3
  },
}

export const interpolate = (
  start: number,
  end: number,
  t: number,
  easing: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' = 'linear'
): number => {
  const normalizedT = Math.max(0, Math.min(1, t))
  const easingFunc = easingFunctions[easing]
  const easedT = easingFunc(normalizedT)
  return start + (end - start) * easedT
}

export const findKeyframes = (keyframes: any[], time: number) => {
  let lower = null
  let upper = null

  for (const kf of keyframes) {
    if (kf.time <= time) {
      lower = kf
    }
    if (kf.time >= time && upper === null) {
      upper = kf
    }
  }

  return { lower, upper }
}

export const getValueAtTime = (keyframes: any[], time: number): number => {
  if (keyframes.length === 0) return 0
  if (time <= keyframes[0].time) return keyframes[0].value

  const { lower, upper } = findKeyframes(keyframes, time)

  if (!lower) return keyframes[0].value
  if (!upper) return lower.value
  if (lower.time === upper.time) return lower.value

  const t = (time - lower.time) / (upper.time - lower.time)
  return interpolate(lower.value, upper.value, t, lower.easing || 'linear')
}
