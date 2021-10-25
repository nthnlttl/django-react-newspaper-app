import {useState} from 'react';
import Cookies from 'js-cookie';
import {withRouter} from 'react-router-dom';



function ArticleForm(props) {
    const [article, setArticle] = useState({
        image: null,
        title: '',
        body: '',
        category: '',
    });

    const [preview, setPreview] = useState('');

    const handleChange = (event) => {
        const {name, value} = event.target;
        setArticle({...article, [name]:value})
    }

    const handleImage = event => {
        const file = event.target.files[0];
        setArticle({
            ...article,
            image: file,
        });

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        }
        reader.readAsDataURL(file);
    }

    function handleError(error) {
        console.warn(error);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();

        formData.append('image', article.image);
        formData.append('title', article.title);
        formData.append('body', article.body);
        formData.append('category', article.category);

        const options = {
            method: 'POST',
            headers: {
                'X-CSRFToken' : Cookies.get('csrftoken'),
            },
            body: formData    
        };

        const response = await fetch('/api_v1/articles/', options).catch(handleError);
        if(!response) {
            console.log(response);
        } else {
            const data = await response.json();
            props.history.push('/');
        }
    }

    return(
        <form className='mt-3 col-6' onSubmit={handleSubmit}>
            <div className='form-group text-left mb-2'>
                <label htmlFor='image'>Image</label>
                <input
                    type='file'
                    name='image'
                    onChange={handleImage}/>
                <img src={preview} alt=''/>
            </div>
            <div className='form-group text-left mb-2'>
                <label htmlFor='title'>Title</label>
                <input
                    type='text'
                    name='title'
                    value={article.title}
                    onChange={handleChange}/>
            </div>
            <div className='form-group text-left mb-2'>
                <label htmlFor='body'>Body</label>
                <input
                    type='text'
                    name='body'
                    value={article.body}
                    onChange={handleImage}/>
            </div>
            <select onChange={handleChange} name="category" value={article.category}>
                <option>Open selection menu</option>
                <option value="NEWS">Cat Mews</option>
                <option value="VET">Veterinarian</option>
                <option value="TOYS">Cat Toys</option>
                <option value="RNDM">Random Cat Thoughts</option>
            </select>
                <button type='submit'>Save as Edit</button>
                <button type='submit'>Submit for Publication</button>
        </form>
    );
}


export default withRouter(ArticleForm)