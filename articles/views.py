from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser
from .models import Article
from .serializers import ArticleSerializer
from .permissions import IsOwnerOrReadOnly


class ArticleListAPIView(generics.ListCreateAPIView):
    # queryset = Article.objects.order_by('created_at')
    serializer_class=ArticleSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        # logic for an authenticated user
        if not self.request.user.is_anonymous:
            status_text = self.request.query_params.get('status')
            if status_text is not None:
                if status_text == 'ALL': # api_v1/articles/?status=ALL
                    return Article.objects.filter(author=self.request.user).order_by('-created_at')
                else: # e.g. api_v1/articles/?status=DFT
                    return Article.objects.filter(status=status_text, author=self.request.user).order_by('-created_at')
           
        category_text = self.request.query_params.get('category')
        if category_text is not None:
            return Article.objects.filter(status='PUBL', category=category_text).order_by('-created_at')
        return Article.objects.filter(status='PUBL').order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class ArticleDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.order_by('created_at')
    serializer_class = ArticleSerializer
    permission_classes = (IsOwnerOrReadOnly,)


class ArticleListAdminAPIView(generics.ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (IsAdminUser,)

    def get_queryset(self):
        status_text = self.request.query_params.get('status')
        if status_text is None or status_text == 'ALL':
            return Article.objects.exclude(status='DFT')
        else:
            return Article.objects.filter(status=status_text)
            

        # 

class ArticleDetailAdminAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (IsAdminUser,)