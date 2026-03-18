import React from 'react'

export default function Loading() {
   return <div className="bg-gray-200">
            <div className="bg-gray-100 min-h-screen w-1/2 mx-auto flex justify-center py-80">
                <h2 className="text-blue-950 font-bold"><span className="pageloader"></span> Loading...</h2>
            </div>
        </div>
}
