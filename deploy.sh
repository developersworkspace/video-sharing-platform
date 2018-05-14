# Remove Directory
rm -rf /opt/video-sharing-platform

# Clone Repository
git clone https://github.com/developersworkspace/video-sharing-platform.git /opt/repositories/video-sharing-platform

# Install NPM Packages
npm install -g gulp
npm install --prefix /opt/repositories/video-sharing-platform

# Build
npm run --prefix /opt/repositories/video-sharing-platform build

# Copy dist
cp -r /opt/repositories/video-sharing-platform/dist /opt/video-sharing-platform

# Remove Directory
rm -rf /opt/repositories/video-sharing-platform