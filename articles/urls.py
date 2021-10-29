from django.urls import path
from .views import ArticleListAPIView, ArticleDetailAPIView, ArticleListAdminAPIView, ArticleDetailAdminAPIView

app_name = 'articles'

urlpatterns = [
    path('admin/<int:pk>/', ArticleDetailAdminAPIView.as_view(), name='article_list'),
    path('admin/', ArticleListAdminAPIView.as_view(), name='article_list'),
    path('<int:pk>/', ArticleDetailAPIView.as_view(), name='article_detail'),
    path('', ArticleListAPIView.as_view(), name='article_list'),
]