# SoundCloud to Apple Music Sync

Download SoundCloud playlists and import them directly into Apple Music on macOS — no terminal, no Python, no setup required.

---

## Features

- Downloads entire SoundCloud playlists as MP3s
- Imports songs straight into your Apple Music library as an album
- Saves your token and settings so you only configure once
- Real-time download progress and status in the app
- Fully self-contained — no Python or dependencies needed

---

## Requirements

- macOS (Apple Silicon — M1/M2/M3/M4)
- Apple Music app installed and open when syncing

---

## Installation

1. Download the latest `.dmg` file from [Releases](../../releases)
2. Open the DMG and drag the app to your Applications folder
3. Launch the app

### First Launch — macOS Security Warning

macOS blocks apps from unidentified developers by default. If you see a warning:

1. Open **System Settings → Privacy & Security**
2. Scroll down to the Security section — you'll see a message about the app being blocked
3. Click **Open Anyway**
4. Confirm when prompted

---

## How to Use

> Full instructions are also available inside the app — click **"How to Use"** in the top bar.

### Before You Start

Make sure **Apple Music is open** before clicking Start Sync.

To sync your library across iPhone and iPad:
- Open Apple Music → **Music → Settings → General**
- Turn on **Sync Library**
- Songs will appear on your other devices within a few minutes after syncing

### Steps

1. **Get your SoundCloud token** — click **"How to Get?"** next to the token field for a step-by-step walkthrough
2. **Paste your token** into the SoundCloud Auth Token field
3. **Paste your playlist URL** (must be a direct playlist link, not a search)
4. **Create a new folder** for this album — never reuse an existing folder
5. **Enter an album name** and optionally an artist name
6. **Click Start Sync** and watch the progress in the terminal output
7. **Check Apple Music** — your songs will appear in your library as an album

---

## Important Notes

- **Each playlist needs its own folder.** Reusing a folder will cause duplicate songs in Apple Music.
- Your token is saved after clicking **Save Config** — you won't need to enter it again unless it expires.
- If songs don't appear in Apple Music, check that:
  - Your SoundCloud token is valid
  - The playlist URL is a direct link (e.g. `soundcloud.com/user/sets/playlist-name`)
  - Your download folder isn't empty
  - Apple Music is running

---

## License

MIT