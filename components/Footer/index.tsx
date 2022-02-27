import React from 'react'

const Footer = () => {
  return (
    <footer className="px-4 py-8 text-white flex flex-col items-center justify-center">
      <span>{`Sreejit's Tech Blog | © ${new Date().getFullYear()}`}</span>
      <p className="text-gray-500 text-sm mt-2">P.S: All posts on this website are sample posts.</p>
    </footer>
  )
}

export default Footer