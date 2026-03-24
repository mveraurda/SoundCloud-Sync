const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const { spawn } = require('child_process');
const express = require('express');
const fs = require('fs');
const os = require('os');

let mainWindow;
let expressApp;

function getPythonPath() {
    const pyenvPath = path.join(os.homedir(), '.pyenv/shims/python3');
    if (fs.existsSync(pyenvPath)) {
        return pyenvPath;
    }
    return 'python3';
}

function createServer() {
    expressApp = express();
    expressApp.use(express.json());
    expressApp.use(express.static(path.join(__dirname, '.')));

    const CONFIG_FILE = path.join(os.homedir(), 'Projects/music downloader/config.txt');

    expressApp.post('/api/config/save', (req, res) => {
        const { authToken, playlistUrl, albumName, albumArtist, downloadPath } = req.body;
        
        const dir = path.dirname(CONFIG_FILE);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const configContent = `AUTH_TOKEN=${authToken}
PLAYLIST_URL=${playlistUrl}
DOWNLOAD_PATH=${downloadPath}
ALBUM_NAME=${albumName}
ALBUM_ARTIST=${albumArtist}`;
        
        fs.writeFileSync(CONFIG_FILE, configContent);
        res.json({ success: true });
    });

    expressApp.get('/api/config/get', (req, res) => {
        try {
            if (fs.existsSync(CONFIG_FILE)) {
                const content = fs.readFileSync(CONFIG_FILE, 'utf8');
                const config = {};
                content.split('\n').forEach(line => {
                    const [key, value] = line.split('=');
                    if (key && value) {
                        config[key.toLowerCase()] = value;
                    }
                });
                res.json(config);
            } else {
                res.json({});
            }
        } catch (err) {
            res.json({});
        }
    });

    expressApp.post('/api/sync/start', (req, res) => {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        const { authToken, playlistUrl, albumName, albumArtist, downloadPath } = req.body;

        const pythonPath = getPythonPath();
        const pythonScript = path.join(__dirname, 'sync.py');

        const python = spawn(pythonPath, [
            pythonScript,
            '--auth-token', authToken,
            '--playlist-url', playlistUrl,
            '--album-name', albumName,
            '--album-artist', albumArtist,
            '--download-path', downloadPath
        ]);

        python.stdout.on('data', (data) => {
            const text = data.toString();
            const lines = text.split('\n');
            lines.forEach(line => {
                if (line.trim()) {
                    res.write(`data: ${JSON.stringify({ type: 'log', message: line })}\n\n`);
                }
            });
        });

        python.stderr.on('data', (data) => {
            const text = data.toString();
            const lines = text.split('\n');
            lines.forEach(line => {
                if (line.trim()) {
                    res.write(`data: ${JSON.stringify({ type: 'log', message: line })}\n\n`);
                }
            });
        });

        python.on('close', (code) => {
            if (code !== 0) {
                res.write(`data: ${JSON.stringify({ type: 'error', message: `Process exited with code ${code}` })}\n\n`);
            } else {
                res.write(`data: ${JSON.stringify({ type: 'complete', message: 'Sync complete!' })}\n\n`);
            }
            res.end();
        });

        python.on('error', (err) => {
            res.write(`data: ${JSON.stringify({ type: 'error', message: err.message })}\n\n`);
            res.end();
        });
    });

    expressApp.get('/health', (req, res) => {
        res.json({ status: 'ok' });
    });

    return expressApp.listen(3001, () => {
        console.log('Server running on http://localhost:3001');
    });
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1200,
        minHeight: 700,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    mainWindow.loadURL(`file://${path.join(__dirname, 'index.html')}`);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

ipcMain.handle('select-directory', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory', 'createDirectory'],
        defaultPath: path.join(os.homedir(), 'Music')
    });
    
    if (!result.canceled && result.filePaths.length > 0) {
        return result.filePaths[0];
    }
    return null;
});

app.on('ready', () => {
    createServer();
    createWindow();

    const template = [
        {
            label: 'SoundCloud Sync',
            submenu: [
                {
                    label: 'About',
                    click: () => {
                        dialog.showMessageBox(mainWindow, {
                            type: 'info',
                            title: 'SoundCloud to Apple Music Sync',
                            message: 'SoundCloud to Apple Music Sync',
                            detail: 'Download SoundCloud playlists and automatically sync to Apple Music\n\nVersion 1.0'
                        });
                    }
                },
                { type: 'separator' },
                {
                    label: 'Quit',
                    accelerator: 'Cmd+Q',
                    click: () => {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' }
            ]
        }
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

process.on('exit', () => {});
