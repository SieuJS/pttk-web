import React from 'react'

function CenterCard({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className="mt-10 flex items-center justify-center w-full dark:bg-gray-950">
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
            {children}
        </div>
    </div>
  )
}

export default CenterCard