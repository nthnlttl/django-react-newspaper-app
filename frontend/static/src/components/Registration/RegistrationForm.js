import {useState} from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import Cookies from 'js-cookie';

function RegistrationForm(props) {
    const [user,setUser] = useState({
        username: '',
        email: '',
        password1: '',
        password2: '', 
    });

    const [error, setError] = useState(null)

    function handleInput(event) {
        const {name, value} = event.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    function handleError(error) {
        console.warn(error)
    };

    async function handleSubmit(event) {
        event.preventDefault();
        if(user.password1 !== user.password2) {
            setError('Passwords do not match.')
        } else {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                    'X-CSFRToken':Cookies.get('csfrtoken'),
                },
                body: JSON.stringify(user)
            };

            const response = await fetch('/rest-auth/registration/', options).catch(handleError);
            if(!response) {
                console.log(response);
            } else {
                const data = await response.json();
                Cookies.set('Authorization', `Token ${data.key}`);
                props.setIsAuth(true);
                props.history.push('/');
            }
        }
    }

    if(props.isAuth) {
        return <Redirect to='/' />
    }

    return (
        <form className='mt-3 col-6' onSubmit={handleSubmit}>
            <div className='form-group text-left mb-3'>
                <label htmlFor='username'>Username</label>
                <input
                    type='text'
                    className='form-control'
                    id='username'
                    placeholder='Enter Username'
                    onChange={handleInput}
                    required
                    name='username'
                    value={user.username}
                    />
            </div>
            <div className='form-group text-left mb-3'>
                <label htmlFor='email'>Email</label>
                <input
                    type='email'
                    className='form-control'
                    id='email'
                    placeholder='Enter Email'
                    onChange={handleInput}
                    required
                    name='email'
                    value={user.email}
                    />
            </div>
            <div className='form-group text-left mb-3'>
                <label htmlFor='password1'>Password</label>
                <input
                    type='password'
                    className='form-control'
                    id='password1'
                    placeholder='Enter Password'
                    onChange={handleInput}
                    required
                    name='password1'
                    value={user.password1}
                    />
            </div>
            <div className='form-group text-left mb-3'>
                <label htmlFor='password2'>Confirm Password</label>
                <input
                    type='password'
                    className='form-control'
                    id='password2'
                    placeholder='Confirm Password'
                    onChange={handleInput}
                    required
                    name='password2'
                    value={user.password2}
                    />
            </div>
            <button type='submit' className='btn btn-primary mt-3'>Register</button>
        </form>
    )
}

export default withRouter(RegistrationForm)