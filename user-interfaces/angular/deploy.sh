# sudo curl -s https://raw.githubusercontent.com/developersworkspace/video-sharing-platform/master/user-interfaces/angular/deploy.sh | bash -s

# Remove Directory
rm -rf /opt/video-sharing-platform-ui

# Clone Repository
git clone https://github.com/developersworkspace/video-sharing-platform.git /opt/repositories/video-sharing-platform

# Install NPM Packages
npm install -g typescript
npm install -g @angular/cli
npm install --prefix /opt/repositories/video-sharing-platform/user-interfaces/angular

# Build
npm run --prefix /opt/repositories/video-sharing-platform/user-interfaces/angular build

# Copy
cp -r /opt/repositories/video-sharing-platform/user-interfaces/angular/dist /opt/video-sharing-platform-ui

# Remove Directory
rm -rf /opt/repositories/video-sharing-platform
