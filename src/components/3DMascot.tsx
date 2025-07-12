
import { useState, useEffect } from 'react';

interface MascotProps {
  className?: string;
  height?: string;
  showText?: boolean;
  category?: string;
}

const Mascot3D: React.FC<MascotProps> = ({ 
  className = "", 
  height = "300px", 
  showText = false,
  category = "general"
}) => {
  const [mascotImage, setMascotImage] = useState<string>('');
  const [imageError, setImageError] = useState<boolean>(false);

  // Map categories to specific mascot images
  const getMascotForCategory = (category: string): string => {
    const categoryMascotMap: { [key: string]: string } = {
      'men': '/mascot1.png',
      'women': '/mascot2.png',
      'sports': '/mascot3.png',
      'sporty': '/mascot3.png',
      'vintage': '/mascot4.png',
      'oldies': '/mascot4.png',
      'formal': '/mascot5.png',
      'casual': '/mascot6.png',
      'tops': '/mascot2.png',
      'bottoms': '/mascot1.png',
      'dresses': '/mascot2.png',
      'jackets': '/mascot5.png',
      'shoes': '/mascot3.png',
      'accessories': '/mascot6.png',
      'sets': '/mascot2.png',
      'general': '/mascot1.png'
    };

    return categoryMascotMap[category.toLowerCase()] || '/mascot1.png';
  };

  useEffect(() => {
    const imagePath = getMascotForCategory(category);
    setMascotImage(imagePath);
    setImageError(false);
  }, [category]);

  const handleImageError = () => {
    console.log('Failed to load 3D mascot image:', mascotImage);
    setImageError(true);
  };

  console.log('🎭 Rendering Cute 3D Mascot with image:', mascotImage, 'for category:', category);

  return (
    <div className={`${className} relative flex items-center justify-center`} style={{ height, width: '100%' }}>
      {!imageError ? (
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={mascotImage}
            alt={`3D mascot for ${category}`}
            className="max-w-full max-h-full object-contain animate-bounce hover:scale-105 transition-all duration-300"
            onError={handleImageError}
            style={{ filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))' }}
          />
          
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
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg">
          <div className="text-4xl mb-2">🤖</div>
          <p className="text-sm text-gray-500">Mascot loading...</p>
          <p className="text-xs text-gray-400 mt-1">Place {mascotImage.substring(1)} in public folder</p>
        </div>
      )}
    </div>
  );
};

export default Mascot3D;
