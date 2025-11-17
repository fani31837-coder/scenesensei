import { describe, it, expect } from 'vitest'
import { solveIK, createIKChain, getMorphTargetWeights } from '@/utils/character'

describe('Character utilities', () => {
  it('should create IK chain', () => {
    const chain = createIKChain(['bone1', 'bone2', 'bone3'], [1, 2, 3])
    expect(chain.bones).toHaveLength(3)
    expect(chain.target).toEqual([1, 2, 3])
    expect(chain.positions).toHaveLength(3)
  })

  it('should get phoneme morph targets', () => {
    const weights = getMorphTargetWeights('A')
    expect(weights).toHaveLength(3)
    expect(weights[0]).toBeGreaterThan(0)

    const restWeights = getMorphTargetWeights('REST')
    expect(restWeights).toEqual([0, 0, 0])
  })

  it('should handle unknown phonemes', () => {
    const weights = getMorphTargetWeights('UNKNOWN')
    expect(weights).toEqual([0, 0, 0])
  })
})
