import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './components/Scene'

export default function App() {
  return (
    <div id="main" className="w-full">
      <div className="bg-black w-full h-screen overflow-hidden">
        <Canvas
          camera={{ fov: 25, near: 0.1, far: 100, position: [0, 0, 21] }}
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
      <div className="bg-zinc-800 w-full h-screen" />
    </div>
  )
}