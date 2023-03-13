import React, {useEffect} from 'react';
import { GoogleButton } from 'react-google-button';
import GithubButton from 'react-github-login-button'
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

  useEffect(()=>{
    if(user != null){
      navigate('/')
    }
  }, [user])

  return (
    <div>
      <h1 className='text-center text-3xl font-bold py-8'>Sign In</h1>
      <div className='max-w-[240px] m-auto py-4'>
        <GoogleButton onClick={handleGoogleSignIn} />
        <GithubButton onClick={handleGithubSignIn} />
      </div>
    </div>
  );
};

export default SignIn;
