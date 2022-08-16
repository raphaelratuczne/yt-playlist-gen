import React from 'react';
import './Home.scss';
import Accordion from '../../Components/Accordion/Accordion';
import WatchLaterPlaylist from '../../Components/WatchLaterPlaylist/WatchLaterPlaylist';
import DailyPlaylists from '../../Components/DailyPlaylists/DailyPlaylists';
import PlaylistsFollowing from '../../Components/PlaylistsFollowing/PlaylistsFollowing';
import Subscriptions from '../../Components/Subscriptions/Subscriptions';
import KillingVideos from '../../Components/KillingVideos/KillingVideos';
import PlaylistsFollowingVideos from '../../Components/PlaylistsFollowingVideos/PlaylistsFollowingVideos';
import FollowingVideos from '../../Components/FollowingVideos/FollowingVideos';
import PlaylistOfDay from '../../Components/PlaylistOfDay/PlaylistOfDay';

const Home = () => {
  return (
    <div className="home">
      <h2>Home</h2>
      <Accordion label="Playlist Maratonando">
        <WatchLaterPlaylist />
      </Accordion>
      <Accordion label="Playlists diárias">
        <DailyPlaylists />
      </Accordion>
      <Accordion label="Playlists que acompanho">
        <PlaylistsFollowing />
      </Accordion>
      <Accordion label="Canais que sou inscrito">
        <Subscriptions />
      </Accordion>
      <Accordion label="Videos de Maratonando">
        <KillingVideos />
      </Accordion>
      <Accordion label="Videos das playlists que acompanho">
        <PlaylistsFollowingVideos />
      </Accordion>
      <Accordion label="Videos de acompanhando">
        <FollowingVideos />
      </Accordion>
      <Accordion label="Playlist do dia">
        <PlaylistOfDay />
      </Accordion>
    </div>
  );
};

export default Home;
