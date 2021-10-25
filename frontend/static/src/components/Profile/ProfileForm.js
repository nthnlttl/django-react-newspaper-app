import {useState} from 'react';
import {withRouter} from 'react-router-dom';
import Cookies from 'js-cookie';

function ProfileForm(props) {
    const [profile, setProfile] = useState({
        alias:'',
        avatar: null,
    });


    const [preview, setPreview] = useState('');

    const handleChange = (event) => {
        const {name, value} = event.target;
        setProfile({...profile, [name]:value})
    }

    const handleImage = (event) => {
        const file = event.target.files[0];
        setProfile({
            ...profile,
            avatar: file,
        });
        
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        }
        reader.readAsDataURL(file);
    }

    function handleError(error) {
        console.warn(Error);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('alias', profile.alias);
        formData.append('avatar', profile.avatar);

        const options = {
            method: 'POST',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: formData,
        };

        const response = await fetch('/api_v1/accounts/', options).catch(handleError);
        if(!response) {
            console.log(response);
        } else {
            const data = await response.json();
            props.history.push('/');
        }
    };

    return (
        <div className='ProfileForm'>
            <form onSubmit={handleSubmit}>
                <input type='text' name='alias' value={profile.alias} onChange={handleChange}/>
                <input type='file' name='avatar' onChange={handleImage}/>
                {profile.avatar && <img src={preview} alt=''/>}
                <button type='submit'>Save Profile</button>
            </form>
        </div>
    )

}

export default withRouter(ProfileForm)