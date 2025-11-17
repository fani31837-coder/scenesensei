// Character rigging and IK utilities
export const createIKChain = (bones: string[], target: [number, number, number]) => {
  return {
    bones,
    target,
    positions: bones.map(() => [0, 0, 0] as [number, number, number]),
  }
}

export const solveIK = (chain: any, maxIterations: number = 10): boolean => {
  const target = chain.target
  const epsilon = 0.01

  for (let iteration = 0; iteration < maxIterations; iteration++) {
    const endPos = chain.positions[chain.positions.length - 1]
    
    if (
      Math.hypot(
        target[0] - endPos[0],
        target[1] - endPos[1],
        target[2] - endPos[2]
      ) < epsilon
    ) {
      return true
    }

    // Forward and backward reaching IK (FABRIK)
    for (let i = chain.positions.length - 1; i > 0; i--) {
      const direction = [
        target[0] - chain.positions[i][0],
        target[1] - chain.positions[i][1],
        target[2] - chain.positions[i][2],
      ]
      const dist = Math.hypot(direction[0], direction[1], direction[2])
      const boneLength = 1 // simplified

      chain.positions[i - 1] = [
        chain.positions[i][0] - (direction[0] / dist) * boneLength,
        chain.positions[i][1] - (direction[1] / dist) * boneLength,
        chain.positions[i][2] - (direction[2] / dist) * boneLength,
      ]
    }
  }

  return false
}

// Lip sync utilities
export const phonemeMap: Record<string, number[]> = {
  'A': [0.8, 0.2, 0.1],
  'E': [0.9, 0.15, 0.05],
  'I': [0.3, 0.8, 0.2],
  'O': [0.6, 0.3, 0.4],
  'U': [0.5, 0.2, 0.5],
  'M': [0.0, 0.9, 0.3],
  'P': [0.0, 0.9, 0.3],
  'B': [0.0, 0.9, 0.3],
  'F': [0.2, 0.7, 0.0],
  'V': [0.2, 0.7, 0.0],
  'N': [0.1, 0.8, 0.2],
  'L': [0.5, 0.5, 0.1],
  'R': [0.4, 0.6, 0.15],
  'S': [0.3, 0.6, 0.05],
  'T': [0.2, 0.7, 0.1],
  'D': [0.2, 0.7, 0.1],
  'Z': [0.3, 0.6, 0.05],
  'SH': [0.4, 0.5, 0.05],
  'CH': [0.3, 0.6, 0.1],
  'NG': [0.1, 0.8, 0.2],
  'TH': [0.4, 0.5, 0.0],
  'REST': [0.0, 0.0, 0.0],
}

export const getMorphTargetWeights = (phoneme: string): number[] => {
  return phonemeMap[phoneme.toUpperCase()] || phonemeMap['REST']
}
