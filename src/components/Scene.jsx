import * as THREE from 'three'
import { Environment } from '@react-three/drei'
import { EffectComposer, ChromaticAberration } from '@react-three/postprocessing'
import Model from './Model'

// defined outside the component so it isn't recreated on every render
const RGB_SHIFT_OFFSET = new THREE.Vector2(0.0015, 0)

export default function Scene() {
  return (
    <>
      <Environment
        files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/spaichingen_hill_1k.hdr"
        environmentIntensity={2}
      />

      <Model />

      <EffectComposer>
        <ChromaticAberration
          offset={RGB_SHIFT_OFFSET}
          radialModulation={false}
          modulationOffset={0}
        />
      </EffectComposer>
    </>
  )
}