import React, { useEffect } from 'react';
import { GoogleButton } from 'react-google-button';
import GithubButton from 'react-github-login-button';
import { UserAuth } from '../store/contextStore/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const { googleSignIn, githubSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await githubSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate('/');
    }
  }, [user]);

  return (
    <div className='pt-56 pb-72 bg-white'>
      <h1 className='text-center text-3xl font-bold py-2'>Sign In</h1>
      <div className='max-w-[240px] m-auto py-2'>
        <div className='mb-2'>
          <GoogleButton onClick={handleGoogleSignIn} />
        </div>
        <div>
          <GithubButton onClick={handleGithubSignIn} />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
