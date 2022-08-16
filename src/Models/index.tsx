export type DayPlaylistItem = { day: string; name: string; playlist: string };

export type PlaylistFollowingItem = { name: string; playlistID: string };

export type Item = {
  etag: string;
  id: string;
  kind: string;
  snippet: {
    channelId: string;
    description: string;
    publishedAt: string;
    resourceId: {
      channelId: string;
      kind: string;
    };
    title: string;
    thumbnails: {
      default: { url: string };
      high: { url: string };
      medium: { url: string };
    };
  };
};

export type SubResp = {
  etag: string;
  kind: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  };
  items: Item[];
};

export type PlaylistItem = {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      [key: string]: {
        url: string;
        width: number;
        height: number;
      };
    };
    videoOwnerChannelId?: string;
    videoOwnerChannelTitle?: string;
    channelTitle: string;
    playlistId: string;
    position: number;
    resourceId: {
      kind: string;
      videoId: string;
    };
    duration?: string;
  };
  contentDetails: {
    ideoId: string;
    startAt: string;
    endAt: string;
    note: string;
  };
  status: {
    privacyStatus: string;
  };
};

export type PlaylistResp = {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  };
  items: PlaylistItem[];
};

export type SearchResp = {
  etag: string;
  items: Video[];
  kind: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: { totalResults: number; resultsPerPage: number };
  regionCode: string;
};

export type Video = {
  etag: string;
  kind: string;
  id: { kind: string; videoId: string };
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadcastContent: string;
    publishTime: string;
    publishedAt: string;
    thumbnails: {
      default: { url: string; width: number; height: number };
      high: { url: string; width: number; height: number };
      medium: {
        url: string;
        width: number;
        height: number;
      };
    };
    title: string;
    duration?: string;
  };
};

export type VideoResp = {
  etag: string;
  kind: string;
  pageInfo: { totalResults: number; resultsPerPage: number };
  nextPageToken?: string;
  items: Array<{
    etag: string;
    id: string;
    kind: string;
    contentDetails: {
      caption: string;
      contentRating: any;
      definition: string;
      dimension: string;
      duration: string;
      licensedContent: boolean;
      projection: string;
    };
  }>;
};
