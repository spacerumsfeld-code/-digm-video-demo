'use client'

interface BrowserFile {
  name: string
  description: string
  mimetype: string
  encoding: string
  upload: File
}

import { PhotoIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'

const Spinner = () => {
      return (
          <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
      );
};

export default function UploadPage() {
  /** State */
  const [loading, setLoading] = useState(false);

  /** Interactivity */
  const uploadVideo = async (browserFile: BrowserFile) => {
    setLoading(true);
    const { upload } = browserFile;

    let presignedUrl = "";
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/presigned-url`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const body = await response.json();
      presignedUrl = body.url;
    } catch (error) {
      console.error(error);
    }

    try {
      await fetch(presignedUrl as string, {
        body: upload,
        method: "PUT",
        headers: {
          "Content-Type": upload.type,
          "Content-Disposition": `attachment; filename="${upload.name}"`,
        },
      });
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  const onDrop: any = (browserFiles: any[]) => {
    const createFileParams = browserFiles.map((browserFile) => {
      return {
        name: browserFile.name,
        description: browserFile.name,
        mimetype: browserFile.type,
        encoding: "utf8",
        upload: browserFile,
      };
    })[0];

    if (createFileParams !== undefined) {
      uploadVideo(createFileParams);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mp4"],
    },
  });

  /** Render */
  return (
    <div className="bg-gray-900 h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl">
        <div className="border border-white/10 p-8">
          <p className="text-white text-lg mb-4">
            1. Upload an mp4 video. <br />
            2. The file will be uploaded to an S3 bucket, which will trigger a
            lambda directing MUX to encode the video at that location.
            <br />
            3. The response from MUX lets us know the final streamingUrl, so we
            write that to a DB immediately.
            <br />
            4. When MUX is done encoding, it will send a webhook event to another lambda,
            which for our purposes we simply log. However, we can use this to
            handle edge cases, update metadata, create events when videos are ready, etc.
            <br />
            5. Head over to 'View Videos' to demo the MUX Media player! We simply fetch the
            streamingUrls out of the database and drop them into MUX's custom video player
            component. <br />
            6. ??? <br />
            7. Profit <br />
            <br />
            Code available{" "}
            <a
              className="underline text-blue-500 hover:text-blue-700"
              href="https://github.com/spacerumsfeld-code/-digm-video-demo"
            >
              here
            </a>
          </p>
          <div className="flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
            <div className="text-center">
              {loading ? (<Spinner />) : (
                <PhotoIcon
                  className="mx-auto h-16 w-16 text-gray-500"
                  aria-hidden="true"
                />
              )}
              <div
                {...getRootProps()}
                className="mt-8 flex text-base leading-6 text-gray-400"
              >
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-gray-900 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-indigo-500"
                >
                  <span>Upload a video</span>
                  <input
                    {...getInputProps()}
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-sm leading-5 text-gray-400">MP4 up to 10MB</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
