import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useLocalStorage } from '../Utils/customHooks/useLocalStorage';
import {
  DayPlaylistItem,
  Item,
  PlaylistFollowingItem,
  PlaylistItem,
  PlaylistResp,
  SubResp,
  SearchResp,
  Video,
  VideoResp,
} from '../Models';
import { convertDurationToNumber } from '../Utils/functions';

const CLIENT_ID = 'clientId';
const WL_PLAYLIST = 'watchLaterPlaylist';
const DAILY_PLAYLISTS = 'dailyPlaylists';
const PLAYLISTS_FOLLOWING = 'playlistsFollowing';
const SUBSCRIPTIONS = 'subscriptions';
const KILLING = 'killing';
const FOLLOWING = 'following';

type YtContextType = {
  logged: boolean;
  login: () => void;
  clientID: string;
  setClientID: (value: string) => void;
  watchLaterPlaylist: string;
  setWatchLaterPlaylist: (value: string) => void;
  dailyPlaylists: DayPlaylistItem[];
  setDailyPlaylists: (value: DayPlaylistItem[]) => void;
  playlistsFollowing: PlaylistFollowingItem[];
  setPlaylistsFollowing: (value: PlaylistFollowingItem[]) => void;
  subscriptions: Item[];
  setSubscriptions: (value: Item[]) => void;
  killing: Item[];
  setKilling: (value: Item[]) => void;
  following: Item[];
  setFollowing: (value: Item[]) => void;
  loadChannelsFromYT: () => Promise<void>;
  loadAllVideosFromWL: (
    page?: string,
    list?: PlaylistItem[]
  ) => Promise<PlaylistItem[]>;
  loadKillingVideosFromWL: () => Promise<PlaylistItem[]>;
  watchLaterSelectedVideos: PlaylistItem[];
  removeVideoFromKillingSelectedVideos: (pi: PlaylistItem) => void;
  videosFromPlaylistsFollowing: PlaylistItem[];
  loadVideosFromPlaylistsFollowing: (
    dateFrom: string,
    dateUntil: string
  ) => Promise<PlaylistItem[]>;
  removeVideoFromPlaylistsFollowing: (pi: PlaylistItem) => void;
  loadAllVideosFromFollowing: (
    dateFrom: string,
    dateUntil: string
  ) => Promise<any>;
  followingVideoList: Video[];
  removeVideoFromFollowing: (v: Video) => void;
  loadVideosDuration: () => Promise<any>;
  sortFollowingVideoListByDuration: () => void;
  savePlaylistItems: (
    playlistId: string,
    pl1: PlaylistItem[],
    pl2: Video[]
  ) => Promise<any>;
  exportDataAsFile: () => void;
  importDataFromFile: () => void;
};

const YtDefaultValue: YtContextType = {
  logged: false,
  login: () => null,
  clientID: '',
  setClientID: (value: string) => null,
  watchLaterPlaylist: '',
  setWatchLaterPlaylist: (value: string) => null,
  dailyPlaylists: [],
  setDailyPlaylists: (value: DayPlaylistItem[]) => null,
  playlistsFollowing: [],
  setPlaylistsFollowing: (value: PlaylistFollowingItem[]) => null,
  subscriptions: [],
  setSubscriptions: (value: Item[]) => null,
  killing: [],
  setKilling: (value: Item[]) => null,
  following: [],
  setFollowing: (value: Item[]) => null,
  loadChannelsFromYT: () => Promise.resolve(),
  loadAllVideosFromWL: (page?: string, list?: PlaylistItem[]) =>
    Promise.resolve([]),
  loadKillingVideosFromWL: () => Promise.resolve([]),
  watchLaterSelectedVideos: [],
  removeVideoFromKillingSelectedVideos: (pi: PlaylistItem) => null,
  videosFromPlaylistsFollowing: [],
  loadVideosFromPlaylistsFollowing: (dateFrom: string, dateUntil: string) =>
    Promise.resolve([]),
  removeVideoFromPlaylistsFollowing: (pi: PlaylistItem) => null,
  loadAllVideosFromFollowing: (dateFrom: string, dateUntil: string) =>
    Promise.resolve(null),
  followingVideoList: [],
  removeVideoFromFollowing: (v: Video) => null,
  loadVideosDuration: () => Promise.resolve(null),
  sortFollowingVideoListByDuration: () => null,
  savePlaylistItems: (playlistId: string, pl1: PlaylistItem[], pl2: Video[]) =>
    Promise.resolve(null),
  exportDataAsFile: () => null,
  importDataFromFile: () => null,
};

export const YtContext = createContext<YtContextType>(YtDefaultValue);

export const YtContextProvider = ({ children }: any) => {
  const [logged, setLogged] = useState(false);
  const [headers, setHeaders] = useState<any>(null);
  const [clientID, setClientID] = useLocalStorage(CLIENT_ID, '');
  const [watchLaterPlaylist, setWatchLaterPlaylist] = useLocalStorage(
    WL_PLAYLIST,
    ''
  );
  const [dailyPlaylists, setDailyPlaylists] = useLocalStorage(
    DAILY_PLAYLISTS,
    []
  );
  const [playlistsFollowing, setPlaylistsFollowing] = useLocalStorage(
    PLAYLISTS_FOLLOWING,
    []
  );
  const [videosFromPlaylistsFollowing, setVideosFromPlaylistsFollowing] =
    useState<PlaylistItem[]>([]);
  const [subscriptions, setSubscriptions] = useLocalStorage(SUBSCRIPTIONS, []);
  const [killing, setKilling] = useLocalStorage(KILLING, []);
  const [following, setFollowing] = useLocalStorage(FOLLOWING, []);
  const [watchLaterSelectedVideos, setWatchLaterSelectedVideos] = useState<
    PlaylistItem[]
  >([]);
  const [followingVideoList, setFollowingVideoList] = useState<Video[]>([]);

  useEffect(() => {
    const queryString = window.location.hash.substring(1);
    const urlParams = new URLSearchParams(queryString);
    const access_token = urlParams.get('access_token');
    // const expires_in = urlParams.get("expires_in");
    const token_type = urlParams.get('token_type');
    if (access_token) {
      setLogged(true);
      setHeaders({
        Authorization: `${token_type} ${access_token}`,
      });
    } else {
      setLogged(false);
      setHeaders(null);
    }
  }, []);

  const login = () => {
    if (clientID) {
      const redirect_uri = 'https://raphaelratuczne.github.io/yt-playlist-gen/';
      const scope =
        'https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtubepartner';
      const response_type = 'token';
      const url = `https://accounts.google.com/o/oauth2/auth?client_id=${clientID}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=${response_type}`;
      // console.log('url', url);
      window.location.href = url;
    }
  };

  const loadAllSubscriptedPages = async (
    page: string = '',
    lastRes: Item[] = []
  ): Promise<Item[]> => {
    if (logged && headers) {
      try {
        const url = 'https://www.googleapis.com/youtube/v3/subscriptions';
        const params = {
          part: 'snippet',
          mine: 'true',
          maxResults: 50,
          ...(page && { pageToken: page }),
        };
        const resp = await axios.get<SubResp>(url, { headers, params });
        const { data } = resp;
        const items = [...lastRes, ...data.items];
        if (data.nextPageToken) {
          return await loadAllSubscriptedPages(data.nextPageToken, items);
        }
        return items;
      } catch (e) {
        console.log('error', e);
        return [];
      }
    }
    return [];
  };

  const loadChannelsFromYT = async () => {
    if (logged && headers) {
      const subs = await loadAllSubscriptedPages();
      setSubscriptions(subs);
      // verifica canais que posso ter deixado de seguir
      //  e remove das listas de maratonando e acompanhando
      const checkKilling = killing.filter((k: Item) => {
        const check = subs.find(
          (s) =>
            s.snippet.resourceId.channelId === k.snippet.resourceId.channelId
        );
        return check ? true : false;
      });
      setKilling(checkKilling);
      const checkFollowing = following.filter((f: Item) => {
        const check = subs.find(
          (s) =>
            s.snippet.resourceId.channelId === f.snippet.resourceId.channelId
        );
        return check ? true : false;
      });
      setFollowing(checkFollowing);
    }
  };

  const loadAllVideosFromWL = async (
    page: string = '',
    list: PlaylistItem[] = []
  ): Promise<PlaylistItem[]> => {
    try {
      const url = 'https://www.googleapis.com/youtube/v3/playlistItems';
      const params = {
        part: 'snippet',
        playlistId: watchLaterPlaylist,
        mine: 'true',
        maxResults: 50,
        ...(page && { pageToken: page }),
      };
      const resp = await axios.get<PlaylistResp>(url, { headers, params });
      const { data } = resp;
      const items = [...list, ...data.items];
      if (data.nextPageToken) {
        return await loadAllVideosFromWL(data.nextPageToken, items);
      }
      return items;
    } catch (e) {
      console.log('error', e);
      // window.location.href = "/";
      return [];
    }
  };

  const loadKillingVideosFromWL = async () => {
    try {
      const allVideos = await loadAllVideosFromWL();
      const arrVideos: PlaylistItem[] = [];
      killing.forEach((k: Item) => {
        const video = allVideos.find(
          (a) =>
            a.snippet.videoOwnerChannelId === k.snippet.resourceId.channelId
        );
        if (video) {
          arrVideos.push(video);
        }
      });
      setWatchLaterSelectedVideos(arrVideos);
      return arrVideos;
    } catch (e) {
      console.log('error', e);
      return [];
    }
  };

  const removeVideoFromKillingSelectedVideos = ({ id }: PlaylistItem) => {
    setWatchLaterSelectedVideos(
      watchLaterSelectedVideos.filter((w) => w.id !== id)
    );
  };

  const removeVideoFromPlaylistsFollowing = ({ id }: PlaylistItem) => {
    setVideosFromPlaylistsFollowing(
      videosFromPlaylistsFollowing.filter((v) => v.id !== id)
    );
  };

  const loadVideosFromPlaylistsFollowing = async (
    dateFrom: string,
    dateUntil: string
  ) => {
    try {
      const dF = new Date(dateFrom);
      const dU = new Date(dateUntil);
      const url = 'https://www.googleapis.com/youtube/v3/playlistItems';
      const videos: PlaylistItem[] = [];
      for (const playFollow of playlistsFollowing) {
        const params = {
          part: 'snippet',
          playlistId: playFollow.playlistID,
          maxResults: 10,
        };
        const resp = await axios.get<PlaylistResp>(url, { headers, params });
        const {
          data: { items },
        } = resp;
        items.forEach((item) => {
          const publishedAt = new Date(item.snippet.publishedAt);
          if (publishedAt >= dF && publishedAt <= dU) {
            videos.push(item);
          }
        });
      }
      setVideosFromPlaylistsFollowing(videos);
      return videos;
    } catch (e) {
      console.log('error', e);
      setVideosFromPlaylistsFollowing([]);
      return [];
    }
  };

  const loadAllVideosFromFollowing = async (
    dateFrom: string,
    dateUntil: string
  ) => {
    try {
      const url = 'https://www.googleapis.com/youtube/v3/search';
      const params = {
        part: 'id,snippet',
        channelId: '',
        maxResults: 50,
        order: 'date',
        type: 'video',
        publishedAfter: dateFrom + ':00Z',
        publishedBefore: dateUntil + ':00Z',
      };
      // let i = 0;
      for (const channel of following) {
        // if (i++ < 5) {
        params.channelId = channel.snippet.resourceId.channelId;
        const {
          data: { items },
        } = await axios.get<SearchResp>(url, { headers, params });
        if (items.length > 0) {
          setFollowingVideoList((vl) => [...vl, ...items]);
        }
        // }
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  const removeVideoFromFollowing = ({ id: { videoId } }: Video) => {
    setFollowingVideoList(
      followingVideoList.filter((v) => v.id.videoId !== videoId)
    );
  };

  const loadVideosDuration = async (page = '') => {
    const idsPlay = videosFromPlaylistsFollowing.map(
      (v) => v.snippet.resourceId.videoId
    );
    const idsFoll = followingVideoList.map((v) => v.id.videoId);
    const ids = [...idsPlay, ...idsFoll].join(',');
    const url = 'https://www.googleapis.com/youtube/v3/videos';
    const params = {
      part: 'id,contentDetails', // ,snippet,fileDetails,player,processingDetails,recordingDetails,statistics,status,suggestions,topicDetails
      id: ids,
      maxResults: 50,
      ...(page && { pageToken: page }),
    };
    const {
      data: { items, nextPageToken },
    } = await axios.get<VideoResp>(url, { headers, params });
    console.log('items', items, 'nextPageToken', nextPageToken);
    if (items.length > 0) {
      const flv = [...followingVideoList].map((v) => {
        const dur = items.find((i) => v.id.videoId === i.id);
        if (dur) {
          return {
            ...v,
            snippet: {
              ...v.snippet,
              duration: dur.contentDetails.duration,
            },
          };
        }
        return v;
      });
      setFollowingVideoList(flv);
      const vpf = [...videosFromPlaylistsFollowing].map((v) => {
        const dur = items.find((i) => v.snippet.resourceId.videoId === i.id);
        if (dur) {
          return {
            ...v,
            snippet: {
              ...v.snippet,
              duration: dur.contentDetails.duration,
            },
          };
        }
        return v;
      });
      setVideosFromPlaylistsFollowing(vpf);

      if (nextPageToken) {
        await loadVideosDuration(nextPageToken);
      }
    }
  };

  const sortFollowingVideoListByDuration = () => {
    const list = [...followingVideoList];
    setFollowingVideoList([]);
    const sList = list.sort((a, b) => {
      const ta = convertDurationToNumber(a.snippet.duration || '');
      const tb = convertDurationToNumber(b.snippet.duration || '');
      if (ta > tb) return 1;
      else if (ta < tb) return -1;
      else return 0;
    });
    console.log('sList', sList);
    setFollowingVideoList(sList);
  };

  const savePlaylistItems = async (
    playlistId: string,
    pl1: PlaylistItem[],
    pl2: Video[]
  ) => {
    try {
      const url =
        'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet';
      let i = 0;
      for (const pi of pl1) {
        const data = {
          snippet: {
            playlistId,
            resourceId: {
              kind: 'youtube#video',
              videoId: pi.snippet.resourceId.videoId,
            },
            position: i++,
          },
        };
        await axios.post<PlaylistResp>(url, data, { headers });
      }
      for (const v of pl2) {
        const data = {
          snippet: {
            playlistId,
            resourceId: {
              kind: 'youtube#video',
              videoId: v.id.videoId,
            },
            position: i++,
          },
        };
        await axios.post<PlaylistResp>(url, data, { headers });
      }
      console.log('terminou');
    } catch (e) {
      console.log('error', e);
    }
  };

  const exportDataAsFile = () => {
    const data = {
      [CLIENT_ID]: clientID,
      [WL_PLAYLIST]: watchLaterPlaylist,
      [DAILY_PLAYLISTS]: dailyPlaylists,
      [PLAYLISTS_FOLLOWING]: playlistsFollowing,
      [SUBSCRIPTIONS]: subscriptions,
      [KILLING]: killing,
      [FOLLOWING]: following,
    };
    // console.log('data', data);
    const blob = new Blob([JSON.stringify(data)], {
      type: 'text/plain;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'data.json');
    a.click();
  };

  const importDataFromFile = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', '.json');
    input.addEventListener('change', (event) => {
      const target = event.target as HTMLInputElement;
      const fileList = target?.files;
      const reader = new FileReader();
      reader.addEventListener('load', (ev) => {
        const result = ev.target?.result;
        if (result) {
          const data = JSON.parse(String(result));
          if (data[CLIENT_ID]) setClientID(data[CLIENT_ID]);
          if (data[WL_PLAYLIST]) setWatchLaterPlaylist(data[WL_PLAYLIST]);
          if (data[DAILY_PLAYLISTS]) setDailyPlaylists(data[DAILY_PLAYLISTS]);
          if (data[PLAYLISTS_FOLLOWING])
            setPlaylistsFollowing(data[PLAYLISTS_FOLLOWING]);
          if (data[SUBSCRIPTIONS]) setSubscriptions(data[SUBSCRIPTIONS]);
          if (data[KILLING]) setKilling(data[KILLING]);
          if (data[FOLLOWING]) setFollowing(data[FOLLOWING]);
        }
      });
      if (fileList) reader.readAsText(fileList[0]);
    });
    input.click();
  };

  return (
    <YtContext.Provider
      value={{
        logged,
        login,
        clientID,
        setClientID,
        watchLaterPlaylist,
        setWatchLaterPlaylist,
        dailyPlaylists,
        setDailyPlaylists,
        playlistsFollowing,
        setPlaylistsFollowing,
        subscriptions,
        setSubscriptions,
        killing,
        setKilling,
        following,
        setFollowing,
        loadChannelsFromYT,
        loadAllVideosFromWL,
        loadKillingVideosFromWL,
        watchLaterSelectedVideos,
        removeVideoFromKillingSelectedVideos,
        videosFromPlaylistsFollowing,
        loadVideosFromPlaylistsFollowing,
        removeVideoFromPlaylistsFollowing,
        loadAllVideosFromFollowing,
        followingVideoList,
        removeVideoFromFollowing,
        loadVideosDuration,
        sortFollowingVideoListByDuration,
        savePlaylistItems,
        exportDataAsFile,
        importDataFromFile,
      }}
    >
      {children}
    </YtContext.Provider>
  );
};

export const useYtContext = () => React.useContext(YtContext);
