import React, { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { BufferGeometry, Float32BufferAttribute, Points as ThreePoints } from 'three'
import { useTheme } from '../hooks/useTheme'

const StarPoints: React.FC = React.memo(() => {
  const ref = useRef<ThreePoints>(null)

  const geometry = useMemo(() => {
    const geo = new BufferGeometry()
    const positions = new Float32Array(2000 * 3)
    for (let i = 0; i < 2000; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 500
      positions[i * 3 + 1] = (Math.random() - 0.5) * 500
      positions[i * 3 + 2] = (Math.random() - 0.5) * 500
    }
    geo.setAttribute('position', new Float32BufferAttribute(positions, 3))
    return geo
  }, [])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.03
  })

  return (
    <Points ref={ref} geometry={geometry} frustumCulled={false}>
      <PointMaterial color="#fff" size={1} sizeAttenuation />
    </Points>
  )
})

const StarBackground: React.FC = React.memo(() => {
  const { theme } = useTheme()
  if (theme !== 'dark') return null

  return (
    <Canvas className="fixed inset-0 -z-20 pointer-events-none">
      <group position={[0, 0, -100]}>
        <StarPoints />
      </group>
    </Canvas>
  )
})

export default StarBackground
