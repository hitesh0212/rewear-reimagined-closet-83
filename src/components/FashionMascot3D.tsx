
import { useState, useEffect } from 'react';

interface FashionMascot3DProps {
  className?: string;
  height?: string;
  showText?: boolean;
  category?: string;
}

const FashionMascot3D: React.FC<FashionMascot3DProps> = ({ 
  className = "", 
  height = "400px", 
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
    console.log('Failed to load mascot image:', mascotImage);
    setImageError(true);
  };

  console.log('👗 Rendering Fashion Mascot with image:', mascotImage, 'for category:', category);

  return (
    <div className={`${className} relative animate-fade-in flex items-center justify-center`} style={{ height, width: '100%' }}>
      {!imageError ? (
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={mascotImage}
            alt={`Fashion mascot for ${category}`}
            className="max-w-full max-h-full object-contain animate-float hover:scale-105 transition-transform duration-300"
            onError={handleImageError}
            style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))' }}
          />
          
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
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg">
          <div className="text-6xl mb-4">👗</div>
          <p className="text-sm text-gray-500">Mascot image loading...</p>
          <p className="text-xs text-gray-400 mt-2">Place {mascotImage.substring(1)} in public folder</p>
        </div>
      )}
    </div>
  );
};

export default FashionMascot3D;
