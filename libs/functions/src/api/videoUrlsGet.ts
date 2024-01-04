import { VideoService } from '../../../../libs/core/src/video.service';

export const handler = async () => {
    const videoService = new VideoService();
    
    const videos = []; 
    try {
        const getVideosResponse = await videoService.getVideos();
        videos.push(...getVideosResponse);
    } catch (error) {
        return {
            status: 500,
            body: 'something went wrong',
        }
    }

    return {
        status: 200,
        data: videos,
    }
}
