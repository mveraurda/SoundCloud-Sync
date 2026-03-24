# SoundCloud to Apple Music Sync

Download SoundCloud playlists and automatically sync them to Apple Music on macOS.

## Features

- Download entire SoundCloud playlists as MP3 files
- Automatically create playlists in Apple Music
- Add downloaded songs to your Apple Music library
- Save configuration for easy re-syncing
- Real-time sync status and terminal output

## Requirements

- macOS (Intel or Apple Silicon)
- Python 3.9+
- Required Python packages: scdl, yt-dlp, ffmpeg-python

## Installation

1. Download the latest DMG file
2. Drag the app to your Applications folder
3. Run the app

## First Time Setup

opening the app on mac

macOS will block apps from unidentified developers by default. if this happens:

1. open System Settings → Privacy & Security
2. under Security, you’ll see a message about the app being blocked
3. click Open Anyway
4. confirm you want to open it

after this, you can launch it normally.

##Install Dependencies 
Install pip install first 

Before syncing, install required tools (used by app) by opening Terminal and running:
```
pip install scdl yt-dlp ffmpeg-python --break-system-packages
```

This only needs to be done once.

## How to Use

1. Get your SoundCloud token:
   - Open soundcloud.com and log in
   - Open Developer Tools (F12 on Windows, Cmd+Option+I on Mac)
   - Go to Network tab
   - Filter for "api"
   - Refresh the page or navigate to a playlist
   - Click any API request and find the Authorization header
   - Copy the token after "token="

2. Enter your SoundCloud token in the app

3. Paste your SoundCloud playlist URL

4. Create a NEW folder for each album (important: don't reuse folders)

5. Enter the album name and artist

6. Click "Start Sync"

7. Check Apple Music for your new songs

## Important

Each album MUST have its own download folder. If you sync different playlists to the same folder, songs will be re-added to Apple Music and create duplicates.

## Troubleshooting

If you see "scdl: command not found", install dependencies:
```
pip install scdl yt-dlp ffmpeg-python --break-system-packages
```

If songs don't appear in Apple Music, check:
- Your SoundCloud token is correct
- Your playlist URL is direct (not a search)
- Your download folder has songs in it
- Apple Music app is running

## License

MIT
