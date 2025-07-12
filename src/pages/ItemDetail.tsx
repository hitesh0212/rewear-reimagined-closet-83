
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import { itemsAPI, swapRequestsAPI, usersAPI, type Item } from '@/lib/localStorage';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Heart, 
  Share2, 
  MapPin, 
  User, 
  Star, 
  MessageCircle, 
  ArrowLeftRight,
  CreditCard,
  Gift,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Bookmark,
  Flag,
  Wash,
  Calendar
} from 'lucide-react';

const ItemDetail = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [item, setItem] = useState<Item | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [swapMessage, setSwapMessage] = useState('');
  const [selectedAction, setSelectedAction] = useState<'swap' | 'rent' | 'redeem' | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (itemId) {
      const foundItem = itemsAPI.getById(itemId);
      setItem(foundItem);
    }
  }, [itemId]);

  const handleAction = async (action: 'swap' | 'rent' | 'redeem') => {
    if (!user || !item) return;
    
    setLoading(true);
    try {
      if (action === 'swap') {
        const request = swapRequestsAPI.create({
          fromUserId: user.id,
          toUserId: item.userId,
          fromItemId: '', // Would need to select user's item
          toItemId: item.id,
          status: 'pending',
          message: swapMessage
        });
        
        toast({
          title: "Swap Request Sent!",
          description: "Your swap request has been sent to the owner.",
        });
      } else if (action === 'rent') {
        // Implement rental logic
        toast({
          title: "Rental Request Sent!",
          description: `Rental request for ₹${item.rentPrice}/day has been sent.`,
        });
      } else if (action === 'redeem') {
        // Check if user has enough points
        const currentUser = usersAPI.getById(user.id);
        if (currentUser && item.points && currentUser.points >= item.points) {
          // Deduct points and process redemption
          usersAPI.update(user.id, { points: currentUser.points - item.points });
          toast({
            title: "Item Redeemed!",
            description: `You've successfully redeemed this item for ${item.points} points.`,
          });
        } else {
          toast({
            title: "Insufficient Points",
            description: `You need ${item.points} points to redeem this item.`,
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      setSelectedAction(null);
    }
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
      description: isWishlisted ? "Item removed from your wishlist" : "Item added to your wishlist",
    });
  };

  const shareItem = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied!",
      description: "Item link has been copied to clipboard.",
    });
  };

  if (!item) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 dark:from-purple-950 dark:via-pink-950 dark:to-yellow-950">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <p>Item not found</p>
        </div>
      </div>
    );
  }

  const isOwner = user?.id === item.userId;
  const canPerformAction = user && !isOwner;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 dark:from-purple-950 dark:via-pink-950 dark:to-yellow-950">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          ← Back
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                src={item.images[currentImageIndex] || '/placeholder.svg'}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              
              {item.images.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80"
                    onClick={() => setCurrentImageIndex(Math.max(0, currentImageIndex - 1))}
                    disabled={currentImageIndex === 0}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80"
                    onClick={() => setCurrentImageIndex(Math.min(item.images.length - 1, currentImageIndex + 1))}
                    disabled={currentImageIndex === item.images.length - 1}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {item.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex ? 'border-purple-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image || '/placeholder.svg'}
                      alt={`${item.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <Badge className={`${
                    item.type === 'swap' ? 'bg-blue-100 text-blue-800' :
                    item.type === 'rent' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {item.type === 'swap' && '🔄'} 
                    {item.type === 'rent' && '💰'} 
                    {item.type === 'redeem' && '⭐'} 
                    {item.type.toUpperCase()}
                  </Badge>
                  {item.isWashed && (
                    <Badge variant="outline" className="text-green-600">
                      <Wash className="w-3 h-3 mr-1" />
                      Washed
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={toggleWishlist}>
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button variant="outline" size="icon" onClick={shareItem}>
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Flag className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Price/Points */}
            {item.type === 'rent' && item.rentPrice && (
              <div className="text-2xl font-bold text-green-600">
                ₹{item.rentPrice}/day
              </div>
            )}
            
            {item.type === 'redeem' && item.points && (
              <div className="text-2xl font-bold text-purple-600">
                {item.points} points
              </div>
            )}

            {/* Item Info */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Brand:</span> {item.brand || 'Not specified'}
                  </div>
                  <div>
                    <span className="font-medium">Size:</span> {item.size}
                  </div>
                  <div>
                    <span className="font-medium">Category:</span> {item.category}
                  </div>
                  <div>
                    <span className="font-medium">Condition:</span> {item.condition}
                  </div>
                </div>
                
                <div>
                  <span className="font-medium">Description:</span>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">{item.description}</p>
                </div>
                
                {item.tags && item.tags.length > 0 && (
                  <div>
                    <span className="font-medium">Tags:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Owner Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={item.userAvatar} />
                    <AvatarFallback>
                      <User className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.username}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      {item.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {item.location}
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        4.8 (24 reviews)
                      </div>
                    </div>
                  </div>
                  {!isOwner && (
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Chat
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            {canPerformAction && (
              <div className="space-y-3">
                {item.type === 'swap' && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" size="lg">
                        <ArrowLeftRight className="w-4 h-4 mr-2" />
                        Request Swap
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Request Swap</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Textarea
                          placeholder="Add a message (optional)"
                          value={swapMessage}
                          onChange={(e) => setSwapMessage(e.target.value)}
                        />
                        <Button 
                          onClick={() => handleAction('swap')}
                          disabled={loading}
                          className="w-full"
                        >
                          Send Swap Request
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
                
                {item.type === 'rent' && (
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => handleAction('rent')}
                    disabled={loading}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Rent for ₹{item.rentPrice}/day
                  </Button>
                )}
                
                {item.type === 'redeem' && (
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => handleAction('redeem')}
                    disabled={loading}
                  >
                    <Gift className="w-4 h-4 mr-2" />
                    Redeem for {item.points} points
                  </Button>
                )}
                
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline">
                    <Bookmark className="w-4 h-4 mr-2" />
                    Add to Wishlist
                  </Button>
                  <Button variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Reserve
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
