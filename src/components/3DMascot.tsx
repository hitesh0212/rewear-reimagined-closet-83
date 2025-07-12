
import { Canvas } from '@react-three/fiber';
import { OrbitControls, MeshWobbleMaterial, Float, Environment, Text } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import { Mesh } from 'three';

const CuteMascot = () => {
  const bodyRef = useRef<Mesh>(null);
  const headRef = useRef<Mesh>(null);

  return (
    <Float speed={1.2} rotationIntensity={0.8} floatIntensity={1.5}>
      <group>
        {/* Main Body - Rounded and comfy */}
        <mesh ref={bodyRef} position={[0, 0, 0]}>
          <sphereGeometry args={[1.2, 16, 16]} />
          <MeshWobbleMaterial 
            factor={0.4} 
            speed={0.8} 
            color="#FFB6C1" 
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>
        
        {/* Head - Bigger and rounder */}
        <mesh ref={headRef} position={[0, 1.8, 0]}>
          <sphereGeometry args={[1, 20, 20]} />
          <MeshWobbleMaterial 
            factor={0.2} 
            speed={0.6} 
            color="#FFE4E1" 
            roughness={0.2}
            metalness={0.05}
          />
        </mesh>
        
        {/* Big cute eyes */}
        <mesh position={[-0.35, 2.1, 0.7]}>
          <sphereGeometry args={[0.15, 12, 12]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        <mesh position={[0.35, 2.1, 0.7]}>
          <sphereGeometry args={[0.15, 12, 12]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        
        {/* Eye highlights for cuteness */}
        <mesh position={[-0.32, 2.15, 0.82]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
        <mesh position={[0.38, 2.15, 0.82]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
        
        {/* Cute blush spots */}
        <mesh position={[-0.7, 1.8, 0.5]} rotation={[0, 0.3, 0]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#FFB6C1" transparent opacity={0.6} />
        </mesh>
        <mesh position={[0.7, 1.8, 0.5]} rotation={[0, -0.3, 0]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#FFB6C1" transparent opacity={0.6} />
        </mesh>
        
        {/* Happy smile */}
        <mesh position={[0, 1.6, 0.7]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.25, 0.04, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#FF69B4" />
        </mesh>
        
        {/* Cute little arms */}
        <mesh position={[-1.1, 0.3, 0]} rotation={[0, 0, -0.3]}>
          <capsuleGeometry args={[0.2, 1, 8, 16]} />
          <MeshWobbleMaterial 
            factor={0.6} 
            speed={1.2} 
            color="#FFB6C1" 
          />
        </mesh>
        <mesh position={[1.1, 0.3, 0]} rotation={[0, 0, 0.3]}>
          <capsuleGeometry args={[0.2, 1, 8, 16]} />
          <MeshWobbleMaterial 
            factor={0.6} 
            speed={1.2} 
            color="#FFB6C1" 
          />
        </mesh>
        
        {/* Cute little hands */}
        <mesh position={[-1.5, -0.3, 0]}>
          <sphereGeometry args={[0.25, 12, 12]} />
          <MeshWobbleMaterial 
            factor={0.8} 
            speed={1.5} 
            color="#FFE4E1" 
          />
        </mesh>
        <mesh position={[1.5, -0.3, 0]}>
          <sphereGeometry args={[0.25, 12, 12]} />
          <MeshWobbleMaterial 
            factor={0.8} 
            speed={1.5} 
            color="#FFE4E1" 
          />
        </mesh>
        
        {/* Cute little feet */}
        <mesh position={[-0.4, -1.1, 0.2]}>
          <capsuleGeometry args={[0.15, 0.4, 8, 16]} />
          <meshStandardMaterial color="#DDA0DD" />
        </mesh>
        <mesh position={[0.4, -1.1, 0.2]}>
          <capsuleGeometry args={[0.15, 0.4, 8, 16]} />
          <meshStandardMaterial color="#DDA0DD" />
        </mesh>
        
        {/* Cute bow on head */}
        <mesh position={[0, 2.6, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.6, 0.2, 0.3]} />
          <meshStandardMaterial color="#FF1493" />
        </mesh>
        <mesh position={[0, 2.6, 0]} rotation={[0, 0, 0]}>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshStandardMaterial color="#FFB6C1" />
        </mesh>
      </group>
    </Float>
  );
};

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
    <span className="ml-3 text-purple-600">Loading cute mascot...</span>
  </div>
);

interface MascotProps {
  className?: string;
  height?: string;
  showText?: boolean;
}

const Mascot3D: React.FC<MascotProps> = ({ 
  className = "", 
  height = "300px", 
  showText = false 
}) => {
  console.log('🎭 Rendering Cute 3D Mascot with height:', height);
  
  return (
    <div className={`${className} relative`} style={{ height, width: '100%' }}>
      <Suspense fallback={<LoadingFallback />}>
        <Canvas 
          camera={{ position: [0, 0, 6], fov: 50 }}
          style={{ background: 'transparent' }}
          gl={{ alpha: true, antialias: true }}
        >
          <Environment preset="dawn" />
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FFB6C1" />
          <pointLight position={[10, 5, 10]} intensity={0.3} color="#DDA0DD" />
          
          <CuteMascot />
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI * 0.75}
            minPolarAngle={Math.PI * 0.25}
          />
        </Canvas>
      </Suspense>
      
      {showText && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
              Hi! I'm ReWear Bot! 🌟
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mascot3D;
