import { Appwrite } from 'fake-appwrite'

const appwrite = new Appwrite();

appwrite
    .setEndpoint('https://aw.matejbaco.eu/v1')
    .setProject('spotifyHistory');

export const AppwriteService = {
    login() {
        appwrite.account.createOAuth2Session('spotify', `${window.location.origin}/app`, `${window.location.origin}/`, ['user-read-currently-playing', 'user-read-playback-state', 'user-read-recently-played']);
    },
    async logout() {
        appwrite.account.deleteSession('current');
    },
    async getMe() {
        return await appwrite.account.get();
    },
    async getSession() {
        return await appwrite.account.getSession('current');
    },
    async getRecentTracks() {
        // Get all OAuth info
        let session = await this.getSession();
        const oauthExpiryDate = session.providerAccessTokenExpiry;

        // If token is expired, let's renew it
        if (true || Date.now() > (oauthExpiryDate * 1000) - 5000) { // 5 seconds time-sync and networking safe-gap
            session = await appwrite.account.updateSession('current');
        }

        // We are now sure access token is 100% valid
        const accessToken = session.providerAccessToken;

        // Fire Spotify request for recently played tracks
        const spotifyResponse: { items: any[] } = await (await fetch('https://api.spotify.com/v1/me/player/recently-played', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        })).json();

        // Map only data required for frontend
        const tracks = spotifyResponse.items.map((track) => {
            return {
                id: track.played_at,
                playedAt: new Date(track.played_at),
                url: track.track.external_urls.spotify,
                name: track.track.name,
                duration: track.track.duration_ms,
                image: track.track.album.images[0].url
            }
        });

        // Return Spotify tracks
        return tracks;
    }
};