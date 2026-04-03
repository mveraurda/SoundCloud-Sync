# -*- mode: python ; coding: utf-8 -*-
from PyInstaller.utils.hooks import collect_all

yt_dlp_datas, yt_dlp_binaries, yt_dlp_hiddenimports = collect_all('yt_dlp')
scdl_datas, scdl_binaries, scdl_hiddenimports = collect_all('scdl')

a = Analysis(
    ['public/sync.py'],
    pathex=[],
    binaries=yt_dlp_binaries + scdl_binaries,
    datas=yt_dlp_datas + scdl_datas,
    hiddenimports=yt_dlp_hiddenimports + scdl_hiddenimports + [
        'certifi', 'urllib3', 'mutagen', 'requests',
        'yt_dlp.cookies',
        'yt_dlp.utils',
        'yt_dlp.extractor',
        'yt_dlp.postprocessor',
        'yt_dlp.downloader',
        'scdl.patches',
        'scdl.patches.trim_filenames',
    ],
    hookspath=['hooks'],
    runtime_hooks=['hooks/rthook_yt_dlp_fix.py'],
    excludes=['curl_cffi'],
    noarchive=False,
)
pyz = PYZ(a.pure)
exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    [],
    name='sync_bin',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=False,
    console=True,
    target_arch='universal2',
)
