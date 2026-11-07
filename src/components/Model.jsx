import { useRef, useEffect, useLayoutEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

const INITIAL_ROTATION = [Math.PI / 3, Math.PI / 4, 0]

const ORIGINAL_COLORS = {
  'Material.004': [0.00419, 0.01984, 0.17928],
  'Material.005': [0, 0.78093, 1],
  'Material.003': [0, 0.05361, 0.16979],
  'Material.002': [0.04906, 0.01688, 0.40825],
  'Material.001': [1, 0.2709, 0.99436],
  'Material.007': [0.84055, 0, 1],
  'Material_007': [0, 0.00041, 0.00855],
}

const REMOVE_KEYWORDS = ['circle', 'base', 'platform', 'ground']

export default function Model() {
  const group = useRef()
  const mouse = useRef({ x: 0, y: 0 })
  const autoRotationY = useRef(0)
  const quick = useRef({ x: null, y: null })

  const { scene, animations } = useGLTF('/models/scene.gltf')
  const { actions } = useAnimations(animations, group)

  // play all animation clips
  useEffect(() => {
    Object.values(actions).forEach((action) => action?.play())
  }, [actions])

  // restore material colors + remove the circular base
  useLayoutEffect(() => {
    const toRemove = []

    scene.traverse((child) => {
      if (!child.isMesh) return

      const materials = Array.isArray(child.material) ? child.material : [child.material]
      materials.forEach((material) => {
        const color = ORIGINAL_COLORS[material.name]
        if (color) material.color.setRGB(...color)
        material.needsUpdate = true
      })

      const name = child.name.toLowerCase()
      if (REMOVE_KEYWORDS.some((k) => name.includes(k))) toRemove.push(child)
    })

    toRemove.forEach((obj) => obj.parent?.remove(obj))
  }, [scene])

  // gsap quickTo setters + mouse listener
  useGSAP(() => {
    const rot = group.current.rotation
    quick.current.x = gsap.quickTo(rot, 'x', { duration: 0.5, ease: 'power2.out' })
    quick.current.y = gsap.quickTo(rot, 'y', { duration: 0.5, ease: 'power2.out' })

    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * Math.PI * 0.2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * Math.PI * 0.2
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // per-frame: auto-rotate + follow the mouse
  useFrame((_, delta) => {
    autoRotationY.current += delta * 0.3
    quick.current.y?.(INITIAL_ROTATION[1] + mouse.current.x + autoRotationY.current)
    quick.current.x?.(INITIAL_ROTATION[0] + mouse.current.y)
  })

  return (
    <group ref={group} rotation={INITIAL_ROTATION}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/models/scene.gltf')