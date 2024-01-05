import VideoPlayer from "@/ui/VideoPlayer"
import { PlusIcon } from "@heroicons/react/24/outline"

export default async function VideoPage() {
    /** Data */
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/video-urls`, {
        method: 'GET',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    const body = await response.json()
    const videos = body.data

    /** Render */
    const videosExist = videos && videos.length > 0
    return (
        <div className="bg-gray-900" style={{ minHeight: '100vh' }}> 
        <ul role="list" className="p-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                {videosExist ? videos.map((video: any) => (
                    <li key={video.id}>
                        <VideoPlayer playbackId={video.playbackId} />
                    </li>
                )) : (
    <div className="text-center">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
      </svg>
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No Videos</h3>
      <p className="mt-1 text-sm text-gray-500">Get started by uploading a video..</p>
      <div className="mt-6">
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          Upload Video
        </button>
      </div>
    </div>
  )}
  </ul>
        </div>
    )
}