'use client'

import MuxPlayer from '@mux/mux-player-react';

type VideoPlayerProps = {
    playbackId: string;
}

export default function VideoPlayer({ playbackId }: VideoPlayerProps) {
  return (
    <MuxPlayer
      streamType="on-demand"
      playbackId={playbackId}
    />
  );
}