# Use a Python 3.9 slim image
FROM python:3.9-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    libnss3 \
    libxss1 \
    libappindicator3-1 \
    fonts-liberation \
    libappindicator1 \
    libgbm1 \
    libgconf-2-4 \
    chromium \
    chromium-driver \
    ffmpeg \
    # Clean up to reduce image size
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy and set up the Django app
COPY . /app
WORKDIR /app

# Expose the application port (optional)
EXPOSE 8000
