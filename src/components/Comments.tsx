
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Star, MessageCircle } from "lucide-react";

interface Comment {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

interface CommentsProps {
  productId: string;
}

const Comments = ({ productId }: CommentsProps) => {
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);

  // Mock comments data
  const [comments] = useState<Comment[]>([
    {
      id: "1",
      user: "Carlos Mendez",
      avatar: "/placeholder.svg",
      rating: 5,
      comment: "Excelentes planos, muy detallados y fáciles de seguir. La mesa quedó perfecta.",
      date: "Hace 2 días"
    },
    {
      id: "2", 
      user: "Ana García",
      avatar: "/placeholder.svg",
      rating: 4,
      comment: "Muy buenos planos, aunque algunas medidas podrían ser más específicas. En general muy satisfecha.",
      date: "Hace 1 semana"
    },
    {
      id: "3",
      user: "Miguel Torres",
      avatar: "/placeholder.svg", 
      rating: 5,
      comment: "Increíble trabajo. Los planos son profesionales y el resultado final es espectacular.",
      date: "Hace 2 semanas"
    }
  ]);

  const handleSubmitComment = () => {
    if (newComment.trim() && newRating > 0) {
      // Here you would normally submit to your backend
      console.log("Submitting comment:", { comment: newComment, rating: newRating, productId });
      setNewComment("");
      setNewRating(0);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <MessageCircle className="w-5 h-5 text-gray-600" />
        <h2 className="text-xl font-bold text-gray-900">
          Comentarios y Reseñas ({comments.length})
        </h2>
      </div>

      {/* Add Comment Form */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900">Agregar Comentario</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Calificación
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setNewRating(star)}
                  className="p-1"
                >
                  <Star 
                    className={`w-6 h-6 ${
                      star <= newRating 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comentario
            </label>
            <Textarea
              placeholder="Comparte tu experiencia con este plano..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
            />
          </div>

          <Button onClick={handleSubmitComment} className="bg-amber-600 hover:bg-amber-700">
            Publicar Comentario
          </Button>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Avatar className="w-10 h-10">
                  <img src={comment.avatar} alt={comment.user} className="w-full h-full object-cover rounded-full" />
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{comment.user}</h4>
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star}
                              className={`w-4 h-4 ${
                                star <= comment.rating 
                                  ? 'fill-yellow-400 text-yellow-400' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{comment.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">{comment.comment}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Comments;
