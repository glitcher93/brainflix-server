export interface Video {
    id: string
    name: string
    title: string
    image: string
    channel: string
    description: string
    views: string
    likes: number
    duration: string
    video: string
    timestamp: number
    comments: Comment[]
}

export interface Comment {
    id: string
    name: string
    comment: string
    likes: number
    timestamp: number
}