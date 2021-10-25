from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Article
from .serializers import ArticleSerializer
from .permissions import IsOwnerOrReadOnly
# Create your views here.

class ArticleListAPIView(generics.ListCreateAPIView):
    queryset = Article.objects.order_by('-created_at')
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        if not self.request.user.is_anonymous:
            status_text = self.request.query_params.get('status')
            if status_text is not None:
                if status_text == 'ALL':
                    return Article.objects.filter(author=self.request.user)
                else: 
                    return Article.objects.filter(options=status_text, author=self.request.user)

            category_text = self.request.query_params.get('category')
            if category_text is not None:
                return Article.objects.filter(status='PUBL', category=category_text)
            return Article.objects.filter(status='PUBL')

        def perform_create(self, serializer):
            serializer.save(author=self.request.user)            

class ArticleDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.order_by('-created_at')
    serializer_class = ArticleSerializer
    permission_classes = (IsOwnerOrReadOnly)