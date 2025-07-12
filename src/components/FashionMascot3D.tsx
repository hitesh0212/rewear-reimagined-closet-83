
import { Canvas } from '@react-three/fiber';
import { OrbitControls, MeshWobbleMaterial, Float, Environment, Text } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import { Mesh, Group } from 'three';

const FashionableMascot = () => {
  const groupRef = useRef<Group>(null);

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.2}>
      <group ref={groupRef}>
        {/* Head */}
        <mesh position={[0, 2.5, 0]}>
          <sphereGeometry args={[0.4, 20, 20]} />
          <meshStandardMaterial color="#FDBCB4" />
        </mesh>
        
        {/* Hair - Stylish bob cut */}
        <mesh position={[0, 2.8, 0]}>
          <sphereGeometry args={[0.45, 16, 16]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        
        {/* Eyes */}
        <mesh position={[-0.15, 2.6, 0.35]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        <mesh position={[0.15, 2.6, 0.35]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        
        {/* Eye highlights */}
        <mesh position={[-0.13, 2.63, 0.38]}>
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
        <mesh position={[0.17, 2.63, 0.38]}>
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
        
        {/* Smile */}
        <mesh position={[0, 2.4, 0.35]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.12, 0.02, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#FF69B4" />
        </mesh>
        
        {/* Body/Torso */}
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.4, 0.5, 1.2, 12]} />
          <meshStandardMaterial color="#4A90E2" />
        </mesh>
        
        {/* Fashionable Jacket/Blazer */}
        <mesh position={[0, 1.3, 0.05]}>
          <cylinderGeometry args={[0.42, 0.52, 1.1, 12]} />
          <MeshWobbleMaterial factor={0.3} speed={0.8} color="#2C3E50" />
        </mesh>
        
        {/* Jacket Buttons */}
        <mesh position={[0, 1.5, 0.48]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="#FFD700" />
        </mesh>
        <mesh position={[0, 1.2, 0.48]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="#FFD700" />
        </mesh>
        <mesh position={[0, 0.9, 0.48]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="#FFD700" />
        </mesh>
        
        {/* Arms */}
        <mesh position={[-0.7, 1.4, 0]} rotation={[0, 0, -0.3]}>
          <cylinderGeometry args={[0.12, 0.12, 0.8, 8]} />
          <meshStandardMaterial color="#FDBCB4" />
        </mesh>
        <mesh position={[0.7, 1.4, 0]} rotation={[0, 0, 0.3]}>
          <cylinderGeometry args={[0.12, 0.12, 0.8, 8]} />
          <meshStandardMaterial color="#FDBCB4" />
        </mesh>
        
        {/* Sleeve cuffs */}
        <mesh position={[-0.7, 1.0, 0]}>
          <cylinderGeometry args={[0.14, 0.14, 0.15, 8]} />
          <meshStandardMaterial color="#2C3E50" />
        </mesh>
        <mesh position={[0.7, 1.0, 0]}>
          <cylinderGeometry args={[0.14, 0.14, 0.15, 8]} />
          <meshStandardMaterial color="#2C3E50" />
        </mesh>
        
        {/* Hands */}
        <mesh position={[-0.7, 0.8, 0]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial color="#FDBCB4" />
        </mesh>
        <mesh position={[0.7, 0.8, 0]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial color="#FDBCB4" />
        </mesh>
        
        {/* Fashionable Belt */}
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.51, 0.51, 0.08, 16]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        
        {/* Belt Buckle */}
        <mesh position={[0, 0.6, 0.48]}>
          <boxGeometry args={[0.15, 0.1, 0.05]} />
          <meshStandardMaterial color="#FFD700" />
        </mesh>
        
        {/* Legs/Pants */}
        <mesh position={[-0.2, -0.1, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 1.2, 8]} />
          <meshStandardMaterial color="#34495E" />
        </mesh>
        <mesh position={[0.2, -0.1, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 1.2, 8]} />
          <meshStandardMaterial color="#34495E" />
        </mesh>
        
        {/* Stylish Shoes */}
        <mesh position={[-0.2, -0.85, 0.1]}>
          <boxGeometry args={[0.2, 0.1, 0.4]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        <mesh position={[0.2, -0.85, 0.1]}>
          <boxGeometry args={[0.2, 0.1, 0.4]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        
        {/* Shoe heels */}
        <mesh position={[-0.2, -0.9, -0.05]}>
          <cylinderGeometry args={[0.03, 0.05, 0.15, 8]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        <mesh position={[0.2, -0.9, -0.05]}>
          <cylinderGeometry args={[0.03, 0.05, 0.15, 8]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        
        {/* Fashionable Accessories */}
        {/* Watch */}
        <mesh position={[0.7, 0.9, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.02, 16]} />
          <meshStandardMaterial color="#C0C0C0" />
        </mesh>
        
        {/* Earrings */}
        <mesh position={[-0.25, 2.5, 0.35]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="#FFD700" />
        </mesh>
        <mesh position={[0.25, 2.5, 0.35]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="#FFD700" />
        </mesh>
        
        {/* Stylish bag strap */}
        <mesh position={[0.6, 1.0, 0]} rotation={[0, 0, 0.5]}>
          <cylinderGeometry args={[0.02, 0.02, 1.5, 8]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        
        {/* Small fashionable bag */}
        <mesh position={[0.8, 0.5, 0]}>
          <boxGeometry args={[0.2, 0.15, 0.1]} />
          <MeshWobbleMaterial factor={0.2} speed={1.0} color="#E74C3C" />
        </mesh>
      </group>
    </Float>
  );
};

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-full animate-pulse">
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gradient-to-r from-purple-500 to-pink-500"></div>
      <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        Loading fashion mascot...
      </span>
    </div>
  </div>
);

interface FashionMascot3DProps {
  className?: string;
  height?: string;
  showText?: boolean;
}

const FashionMascot3D: React.FC<FashionMascot3DProps> = ({ 
  className = "", 
  height = "400px", 
  showText = false 
}) => {
  console.log('👗 Rendering Fashion Mascot 3D with height:', height);
  
  return (
    <div className={`${className} relative animate-fade-in`} style={{ height, width: '100%' }}>
      <Suspense fallback={<LoadingFallback />}>
        <Canvas 
          camera={{ position: [0, 0, 4], fov: 60 }}
          style={{ background: 'transparent' }}
          gl={{ alpha: true, antialias: true }}
        >
          <Environment preset="city" />
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1.0} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#FFB6C1" />
          <pointLight position={[10, 5, 10]} intensity={0.2} color="#DDA0DD" />
          <spotLight position={[0, 10, 0]} intensity={0.5} angle={0.3} penumbra={1} />
          
          <FashionableMascot />
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.8}
            maxPolarAngle={Math.PI * 0.7}
            minPolarAngle={Math.PI * 0.3}
          />
        </Canvas>
      </Suspense>
      
      {showText && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-slide-up">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-full px-6 py-3 shadow-xl border border-purple-200 dark:border-purple-700">
            <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Hi! I'm your ReWear fashion assistant! ✨👗
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FashionMascot3D;
