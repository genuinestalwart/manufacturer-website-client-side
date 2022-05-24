import React, { useEffect } from 'react';
import google from '../../assets/google.png';
import { useAuthState, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Link, Navigate, useLocation } from 'react-router-dom';
import auth from '../../firebase.init';
import useFirebase from '../../hooks/useFirebase';
import LoadingSpinner from '../Shared/Others/LoadingSpinner';
import ErrorModal from '../Shared/Modals/ErrorModal';
const Login = ({ setInfo, setShowToast }) => {
    const {
        errObj, setErrObj,
        email, setEmail,
        password, setPassword,
        validEmail, validPass,
        showModal, setShowModal,
        handleEmail, handlePass
    } = useFirebase();
    const [signInWithEmailAndPassword,
        epUser, epLoading, epError
    ] = useSignInWithEmailAndPassword(auth);
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [user, uLoading] = useAuthState(auth);
    const location = useLocation();

    useEffect(() => {
        if (epError) {
            if (epError.code === 'auth/user-not-found' || epError.code === 'auth/wrong-password') {
                setErrObj({
                    header: 'Invalid email or password!',
                    body: 'Looks like the email/password you entered is incorrect. Please enter any valid email/password.'
                });
                setShowModal(true);
            }
        }

        if (gError) {
            if (gError.code === 'auth/popup-closed-by-user') {
                setErrObj({
                    header: 'Popup Closed by User!',
                    body: 'Looks like you closed the popup tab. Please choose a gmail account to login with.'
                });
                setShowModal(true);
            }
        }
    }, [epError, gError, setErrObj, setShowModal]);

    const handleLogin = (event) => {
        event.preventDefault();

        if (email && password && validEmail && validPass) {
            signInWithEmailAndPassword(email, password)
                .then(() => {
                    // fetch('https://rahman-warehouse-backend.herokuapp.com/auth', {
                    //     method: 'POST',
                    //     headers: {
                    //         'content-type': 'application/json'
                    //     },
                    //     body: JSON.stringify({ email })
                    // })
                    //     .then(res => res.json())
                    //     .then(({ accessToken }) => {
                    //         localStorage.setItem('accessToken', accessToken);
                    //     });
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
                    <div className='flex h-[calc(100vh_-_5rem)] items-center justify-center w-full'>
                        <p className='flex items-center'><LoadingSpinner hw='h-8 w-8'></LoadingSpinner><span className='font-bold ml-2 text-xl text-primary'>Loading...</span></p>
                    </div>
                    : user || epUser || gUser ?
                        <Navigate to={location?.state?.from?.pathname || '/'} state={{ from: location }} replace />
                        : <div>
                            <div className="flex hero justify-center pt-16 pb-20">
                                <div className="hero-content flex w-3/5">
                                    <form className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                                        <div className="card-body">
                                            <div className="form-control">
                                                <label className="font-bold label">
                                                    <span className="label-text text-lg">Email address <span className='text-sm text-red-400'>*</span></span>
                                                </label>
                                                <input onBlur={handleEmail} type="email" placeholder="Enter your email" className="input input-bordered focus:outline-primary" autoComplete='username' />
                                                <p className={validEmail ? 'hidden' : 'mt-2 text-xs text-red-500'}>Please enter a valid email address</p>
                                            </div>

                                            <div className="form-control">
                                                <label className="font-bold label">
                                                    <span className="label-text text-lg">Password <span className='text-sm text-red-400'>*</span></span>
                                                </label>
                                                <input onBlur={handlePass} type="password" placeholder="Enter your password" className="input input-bordered focus:outline-primary" autoComplete='current-password' />
                                                <p className={validPass ? 'hidden' : 'mt-2 text-xs text-red-500'}>Password must contain at least a digit, an uppercase letter, a lowercase letter, a special character and must be within 8 to 23 characters.</p>
                                            </div>

                                            <div className="form-control mt-6">
                                                <button onClick={handleLogin} className="disabled:bg-primary disabled:bg-opacity-60 btn btn-primary text-accent disabled:text-accent" type='submit' disabled={email && password && validEmail && validPass ? false : true}>Log in</button>
                                            </div>
                                        </div>
                                    </form>

                                    <div className="text-center lg:text-left">
                                        <h1 className="text-5xl font-bold">Log in Now!</h1>
                                        <p className="link link-hover py-6 text-primary"><Link to='/signup'>Don't have an account? Create one here.</Link></p>

                                        <div>
                                            <button onClick={handleGoogleLogin} className="btn btn-primary text-accent w-full"><img className='h-3/5 mr-2' src={google} alt="google symbol" /> Log in with Google</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <ErrorModal error={errObj} setShowModal={setShowModal} showModal={showModal}></ErrorModal>
                        </div>
            }
        </section>
    );
};

export default Login;