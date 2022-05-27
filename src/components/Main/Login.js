import React from 'react';
import google from '../../assets/google.png';
import { useAuthState, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Link, Navigate, useLocation } from 'react-router-dom';
import auth from '../../firebase.init';
import useFirebase from '../../hooks/useFirebase';
import LoadingSpinner from '../Shared/Others/LoadingSpinner';
const Login = () => {
    const {
        email, setEmail,
        password, setPassword,
        validEmail, validPass,
        handleEmail, handlePass,
        errorify
    } = useFirebase();
    const [signInWithEmailAndPassword,
        epUser, epLoading, epError
    ] = useSignInWithEmailAndPassword(auth);
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [user, uLoading] = useAuthState(auth);
    const location = useLocation();

    const handleLogin = (event) => {
        event.preventDefault();

        if (email && password && validEmail && validPass) {
            signInWithEmailAndPassword(email, password)
                .then(() => {
                    fetch('http://localhost:5000/auth', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({ email })
                    })
                        .then(res => res.json())
                        .then(({ accessToken }) => {
                            localStorage.setItem('accessToken', accessToken);
                        });
                    setEmail('');
                    setPassword('');
                });
        }
    };

    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then(() => {
                setEmail('');
                setPassword('');
            });
    };

    return (
        <section>
            {
                uLoading || epLoading || gLoading ?
                    <LoadingSpinner height='[calc(100vh_-_5rem)]'></LoadingSpinner>
                    : user || epUser || gUser ?
                        <Navigate to={location?.state?.from?.pathname || '/'} state={{ from: location }} replace />
                        : <div>
                            <div className="flex hero justify-center pt-16 pb-20">
                                <div className="hero-content flex w-3/5">
                                    <form className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                                        <div className="card-body">
                                            <div className="form-control">
                                                <label className="font-bold label">
                                                    <span className="label-text text-lg">Email address <span className='text-sm text-accent-focus'>*</span></span>
                                                </label>
                                                <input onBlur={handleEmail} type="email" placeholder="Enter your email" className="input input-bordered focus:outline-primary" autoComplete='username' />
                                                <p className={validEmail ? 'hidden' : 'mt-2 text-xs text-accent-focus'}>Please enter a valid email address</p>
                                            </div>

                                            <div className="form-control">
                                                <label className="font-bold label">
                                                    <span className="label-text text-lg">Password <span className='text-sm text-accent-focus'>*</span></span>
                                                </label>
                                                <input onBlur={handlePass} type="password" placeholder="Enter your password" className="input input-bordered focus:outline-primary" autoComplete='current-password' />
                                                <p className={validPass ? 'hidden' : 'mt-2 text-xs text-accent-focus'}>Password must contain at least a digit, an uppercase letter, a lowercase letter, a special character and must be within 8 to 23 characters.</p>
                                            </div>

                                            <div className="form-control">
                                                <p className={`font-medium ${epError ? '' : 'invisible'} my-2 text-sm text-accent-focus`}>{errorify(epError?.code)}</p>
                                                <button onClick={handleLogin} className="disabled:bg-primary disabled:bg-opacity-60 btn btn-primary text-accent disabled:text-accent" type='submit' disabled={email && password && validEmail && validPass ? false : true}>Log in</button>
                                            </div>
                                        </div>
                                    </form>

                                    <div className="text-center lg:text-left">
                                        <h1 className="text-5xl font-bold">Log in Now!</h1>
                                        <p className="link link-hover pt-4 pb-2 text-primary"><Link to='/signup' state={{ from: location }}>Don't have an account? Create one here.</Link></p>
                                        <p className={`font-medium ${gError ? '' : 'invisible'} py-2 text-sm text-accent-focus`}>{errorify(gError?.code)}</p>

                                        <div>
                                            <button onClick={handleGoogleLogin} className="btn btn-primary text-accent w-full"><img className='h-3/5 mr-2' src={google} alt="google symbol" /> Log in with Google</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            }
        </section>
    );
};

export default Login;