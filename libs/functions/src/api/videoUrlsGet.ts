import { VideoService } from '../../../../libs/core/src/video.service';

export const handler = async (event: any) => {
    const videoService = new VideoService();
    
    const videos = [];
    try {
        const getVideosResponse = await videoService.getVideos();
        videos.push(...getVideosResponse);
    } catch (error) {
        console.log('woops!')
    }

    return {
        status: 200,
        body: JSON.stringify({
            videos
        }),
    }
}
