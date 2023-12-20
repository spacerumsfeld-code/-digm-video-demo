'use client'

import { PhotoIcon } from '@heroicons/react/24/solid'
import { useDropzone } from 'react-dropzone'

interface BrowserFile {
  name: string
  description: string
  mimetype: string
  encoding: string
  upload: File
}

export default function UploadPage() {
  /** Interactivity */
  const onDrop: any = (browserFiles: any[]) => {
    const createFileParams = browserFiles.map((browserFile) => {
        return {
            name: browserFile.name,
            description: browserFile.name,
            mimetype: browserFile.type,
            encoding: 'utf8',
            upload: browserFile,
        }
    })[0]

    if (createFileParams !== undefined) {
      uploadVideo(createFileParams)
    }
}

      const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
          'image/*': ['.png', '.jpg', '.jpeg'],
            // 'video/*': ['mp4', 'mov', 'avi', 'wmv', 'flv', 'mkv', 'webm'],
        },
    })

    const uploadVideo = async (browserFile: BrowserFile) => {
      const { upload } = browserFile

      let presignedUrl = ''
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/presigned-url`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const body = await response.json()
        presignedUrl = body.url
        console.info('presignedUrl', presignedUrl)
    
      } catch (error) {
        console.error(error)
      }

      try {
        await fetch(presignedUrl as string, {
              body: upload,
              method: 'PUT',
              headers: {
                  'Content-Type': upload.type,
                  'Content-Disposition': `attachment; filename="${upload.name}"`,
              },
          })
      } catch (e) {
          console.log(e)
      }
  }

  /** Render */
  return (
    <div className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
    <form>
      <div className="space-y-12">
        <div className="border-b border-white/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-white">Profile</h2>
          <p className="mt-1 text-sm leading-6 text-gray-400">
            This information will be displayed publicly so be careful what you share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="janesmith"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-white">
                About
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-400">Write a few sentences about yourself.</p>
            </div>

            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-white">
                Upload Your Video
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-500" aria-hidden="true" />
                  <div {...getRootProps()} className="mt-4 flex text-sm leading-6 text-gray-400">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-gray-900 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input {...getInputProps()} id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-400">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-white">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Submit
        </button>
      </div>
    </form>
    </div>
    </div>
  )
}

