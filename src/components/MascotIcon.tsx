
import { Canvas } from '@react-three/fiber';
import { Float, MeshWobbleMaterial } from '@react-three/drei';
import { useRef } from 'react';
import { Mesh } from 'three';

const SimpleCuteMascot = () => {
  const meshRef = useRef<Mesh>(null);

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
      {/* Cute character head */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 16, 16]} />
        <MeshWobbleMaterial factor={0.2} speed={1} color="#FFE4E1" />
      </mesh>
      
      {/* Big cute eyes */}
      <mesh position={[-0.3, 0.2, 0.8]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.3, 0.2, 0.8]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Eye highlights */}
      <mesh position={[-0.28, 0.25, 0.88]}>
        <sphereGeometry args={[0.03, 6, 6]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0.32, 0.25, 0.88]}>
        <sphereGeometry args={[0.03, 6, 6]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      
      {/* Happy smile */}
      <mesh position={[0, -0.2, 0.8]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.25, 0.04, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#FF69B4" />
      </mesh>
      
      {/* Cute blush */}
      <mesh position={[-0.6, -0.1, 0.6]} rotation={[0, 0.3, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#FFB6C1" transparent opacity={0.6} />
      </mesh>
      <mesh position={[0.6, -0.1, 0.6]} rotation={[0, -0.3, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#FFB6C1" transparent opacity={0.6} />
      </mesh>
    </Float>
  );
};

interface MascotIconProps {
  size?: number;
  className?: string;
}

const MascotIcon: React.FC<MascotIconProps> = ({ size = 60, className = "" }) => {
  return (
    <div className={`${className}`} style={{ width: size, height: size }}>
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <pointLight position={[-2, 2, 2]} intensity={0.3} color="#FFB6C1" />
        <SimpleCuteMascot />
      </Canvas>
    </div>
  );
};

export default MascotIcon;
