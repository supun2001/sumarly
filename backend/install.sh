#!/bin/bash

# Update package list and install system dependencies
sudo apt-get update
sudo apt-get install -y wget unzip

# Install Google Chrome
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt install ./google-chrome-stable_current_amd64.deb

# Install Chromedriver
wget https://chromedriver.storage.googleapis.com/128.0.5359.71/chromedriver_linux64.zip
unzip chromedriver_linux64.zip
sudo mv chromedriver /usr/local/bin/
sudo chmod +x /usr/local/bin/chromedriver

# Install FFmpeg using Homebrew (for macOS or Linux with brew installed)
if command -v brew &> /dev/null; then
    brew install ffmpeg
else
    # For systems without brew, install ffmpeg using apt
    sudo apt-get install -y ffmpeg
fi
