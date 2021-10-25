import { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

const status = {
    draft: 'DFT',
    submitted: 'SUBM',
    published: 'PUBL',
    rejected: 'REJ',
}

function MyArticleList(props) {
    const [myarticles, setMyArticlesList] = useState([]);

    useEffect(() => {
        const status_selection = props.match.params.status;
        let url = '/api_v1/articles/?status=ALL';
        if (status_selection) {
            url = `/api_v1/articles/?status=${status[status_selection]}`;
        }

        async function getMyArticleList() {
            const response = await fetch(url);
            const data = await response.json();

            setMyArticlesList(data);
        }
    getMyArticleList();
    }, []);

    const MyArticleListHTML = myarticles.map(article =>
        <div key={article.id} className='article'>
            <img className='fit-picture' src={article.image} alt=''/>
            <h3>{article.title}</h3>
            <p>{article.body}</p>
            <p>{article.status}</p>
        </div>
        );

    return (
        <>
        {MyArticleListHTML}
        </>
    )
}

export default withRouter(MyArticleList)