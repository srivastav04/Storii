'use client';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { Button } from "@heroui/react";
import styles from './style.module.scss';

export default function Landing() {
  return (
    <section className={styles.landing}>

      {/* Hero Section */}
      <div className={styles.hero}>
        <h1 className='text-7xl font-bold lg:text-9xl'>Storii</h1>
        <p className="text-lg font-bold lg:text-2xl">Where every story deserves to be heard. Share your journey, inspire the world.</p>

        <div className='mt-4 flex'>
          <SignInButton redirectUrl={'/check-auth'} forceRedirectUrl="/check-auth">
            <Button
              className="mr-4 bg-gray-900 text-zinc-300 font-bold hover:bg-zinc-300 hover:text-gray-900 border border-gray-900"
            >
              Sign In
            </Button></SignInButton>

          <SignUpButton redirectUrl={'/check-auth'} forceRedirectUrl="/check-auth">
            <Button
              className="bg-zinc-300 text-gray-900 font-bold hover:bg-gray-950 hover:text-zinc-300 border border-gray-900"
            >
              Sign Up
            </Button></SignUpButton>
        </div>



      </div>
    </section >
  );
}
