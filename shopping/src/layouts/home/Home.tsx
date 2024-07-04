import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <div className='relative isolate overflow-hidden bg-home bg-no-repeat bg-center bg-cover py-24 sm:py-32 '>
      <div
        className='hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl'
        aria-hidden='true'
      >
        <div
          className='aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20'
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }}
        />
      </div>
      <div
        className='absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu'
        aria-hidden='true'
      >
        <div
          className='aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20'
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }}
        />
      </div>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='max-w-2xl lg:mx-0'>
          <h2 className='text-4xl font-bold tracking-tight text-white sm:text-6xl'>Discover Our Products</h2>
          <p className='mt-6 text-lg leading-8 text-white'>
            Explore our wide range of products designed to meet your needs. Whether you're looking for something
            specific or just browsing, we have something for everyone.
          </p>
        </div>
        <div className='mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none'>
          <div className='grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10'>
            <Link to='/product'>
              Shopping Go <span aria-hidden='true'>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
