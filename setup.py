#!/usr/bin/env python3
"""
Setup script for SoundCloud to Apple Music Sync
Installs all required dependencies
"""

import subprocess
import sys
import os

def run_command(cmd, description=""):
    """Run command and print output"""
    if description:
        print(f"📦 {description}...")
    try:
        result = subprocess.run(cmd, shell=True, capture_output=False, text=True)
        if result.returncode == 0:
            print(f"   ✓ Done")
            return True
        else:
            print(f"   ✗ Failed")
            return False
    except Exception as e:
        print(f"   ✗ Error: {str(e)}")
        return False

def check_installed(cmd, name):
    """Check if command is installed"""
    result = subprocess.run(f"which {cmd}", shell=True, capture_output=True)
    if result.returncode == 0:
        print(f"✓ {name} is installed")
        return True
    else:
        print(f"✗ {name} is NOT installed")
        return False

def main():
    print("=" * 50)
    print("🎵 SoundCloud Sync Setup")
    print("=" * 50)
    print()

    # Check Python
    print("Checking Python...")
    if not check_installed("python3", "Python 3"):
        print("ERROR: Python 3 is required")
        sys.exit(1)

    # Check Node.js
    print("\nChecking Node.js...")
    if not check_installed("node", "Node.js"):
        print("ERROR: Node.js is required")
        sys.exit(1)

    # Install scdl
    print("\nInstalling SoundCloud downloader (scdl)...")
    if not run_command("pip3 install scdl --break-system-packages", "Installing scdl"):
        print("WARNING: scdl installation may have issues")

    # Install yt-dlp
    print("\nInstalling yt-dlp...")
    if not run_command("pip3 install yt-dlp --break-system-packages", "Installing yt-dlp"):
        print("WARNING: yt-dlp installation may have issues")

    # Install Node dependencies
    print("\nInstalling Node.js dependencies...")
    if not run_command("npm install", "Installing npm packages"):
        print("ERROR: npm install failed")
        sys.exit(1)

    print()
    print("=" * 50)
    print("✓ Setup complete!")
    print("=" * 50)
    print()
    print("Next: Run 'npm start' to start the app")
    print()

if __name__ == '__main__':
    main()
