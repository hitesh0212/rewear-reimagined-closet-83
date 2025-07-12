
import { useState, useEffect } from 'react';

interface MascotIconProps {
  size?: number;
  className?: string;
  category?: string;
}

const MascotIcon: React.FC<MascotIconProps> = ({ 
  size = 60, 
  className = "",
  category = "general"
}) => {
  const [mascotImage, setMascotImage] = useState<string>('');
  const [imageError, setImageError] = useState<boolean>(false);

  // Map categories to specific mascot images (same mapping as FashionMascot3D)
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
    console.log('Failed to load mascot icon:', mascotImage);
    setImageError(true);
  };

  return (
    <div className={`${className} flex items-center justify-center`} style={{ width: size, height: size }}>
      {!imageError ? (
        <img
          src={mascotImage}
          alt={`Mascot icon for ${category}`}
          className="w-full h-full object-contain rounded-lg hover:scale-110 transition-transform duration-200"
          onError={handleImageError}
          style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg">
          <span className="text-2xl">👗</span>
        </div>
      )}
    </div>
  );
};

export default MascotIcon;
