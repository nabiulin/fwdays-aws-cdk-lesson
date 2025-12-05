function Main() {

  return (
    <>
      {/* Icon Blocks */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 items-center gap-6 md:gap-10">
          {/* Card */}
          <div className="size-full bg-white shadow-lg rounded-lg p-5">
            <div className="flex items-center gap-x-4 mb-3">
              <div
                className="inline-flex justify-center items-center size-15.5 rounded-full border-4 border-blue-50 bg-blue-100">
                <svg className="shrink-0 size-6 text-blue-600" xmlns="http://www.w3.org/2000/svg"
                     width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="13.5" cy="6.5" r=".5"/>
                  <circle cx="17.5" cy="10.5" r=".5"/>
                  <circle cx="8.5" cy="7.5" r=".5"/>
                  <circle cx="6.5" cy="12.5" r=".5"/>
                  <path
                    d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
                </svg>
              </div>
              <div className="shrink-0">
                <h3 className="block text-lg font-semibold text-gray-800">Build your portfolio</h3>
              </div>
            </div>
            <p className="text-gray-600">Extend your CV with new skills.</p>
          </div>
          {/* End Card */}

          {/* Card */}
          <div className="size-full bg-white shadow-lg rounded-lg p-5">
            <div className="flex items-center gap-x-4 mb-3">
              <div
                className="inline-flex justify-center items-center size-15.5 rounded-full border-4 border-blue-50 bg-blue-100">
                <svg className="shrink-0 size-6 text-blue-600" xmlns="http://www.w3.org/2000/svg"
                     width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h20"/>
                  <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/>
                  <path d="m7 21 5-5 5 5"/>
                </svg>
              </div>
              <div className="shrink-0">
                <h3 className="block text-lg font-semibold text-gray-800">Get first work</h3>
              </div>
            </div>
            <p className="text-gray-600">Get your first position faster.</p>
          </div>
          {/* End Card */}

          {/* Card */}
          <div className="size-full bg-white shadow-lg rounded-lg p-5">
            <div className="flex items-center gap-x-4 mb-3">
              <div
                className="inline-flex justify-center items-center size-15.5 rounded-full border-4 border-blue-50 bg-blue-100">
                <svg className="shrink-0 size-6 text-blue-600" xmlns="http://www.w3.org/2000/svg"
                     width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/>
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                  <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/>
                  <path d="M2 7h20"/>
                  <path
                    d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/>
                </svg>
              </div>
              <div className="shrink-0">
                <h3 className="block text-lg font-semibold text-gray-800">Build new skills</h3>
              </div>
            </div>
            <p className="text-gray-600">Build new skills and extend your knowledge base.</p>
          </div>
          {/* End Card */}

          {/* Card */}
        </div>
      </div>
      {/* End Icon Blocks */}
    </>
  )
}

export default Main
