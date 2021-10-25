import { useState,useEffect } from 'react';
import { NavLink, withRouter, useLocation } from 'react-router-dom';

function Home(props) {
    const [articles, setArticleList] = useState([]);
    const location = useLocation();

    const categories = {
        cat_mews: 'NEWS',
        veterinarian: 'VET',
        cat_toys: 'TOYS',
        random: 'RNDM',
    }

    useEffect(() => {
        const category_selection = props.match.params.category;
        let url = '/api_v1/articles/';
        if(category_selection) {
            url = `/api_v1/articles/?category=${categories[category_selection]}`;
        }
        async function getArticles(){
            const response = await fetch(url);
            const data = await response.json();
            console.log("articles", data);

            setArticleList(data);
        }
        getArticles();
    }, [location]);

    const ArticleListHTML = articles.map(article =>
        <div key={article.id} className='article'>
            <img className='fit-picture' src={article.image} alt=''/>
            <h3>{article.title}</h3>
            <p>{article.username}</p>
            <p>{article.body}</p>
        </div>
);

return(
    <>
    <header className='home-header'>Local Alley Cat Mews</header>
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <div className='container d-flex justify-content-center'>
            <ul className='navbar-nav' id='secondary-nav'>
                <li className='nav-item'>
                    <NavLink to='/cat_mews'>Cat Mews</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink to='/veterinarian'>Vet</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink to='/cat_toys'>Toys</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink to='/random'>Random Cat Thoughts</NavLink>
                </li>
            </ul>
        </div>
    </nav>
    <section className='article-section'>
        {ArticleListHTML}
    </section>
    </>
)
}

export default withRouter(Home);