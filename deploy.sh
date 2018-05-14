# sudo curl -s https://raw.githubusercontent.com/developersworkspace/video-sharing-platform/master/deploy.sh | bash -s

# Remove Directory
rm -rf /opt/video-sharing-platform

# Clone Repository
git clone https://github.com/developersworkspace/video-sharing-platform.git /opt/repositories/video-sharing-platform

# Copy NGINX Configuration
cp -r /opt/repositories/video-sharing-platform/nginx/. /etc/nginx/sites-enabled

# Restart NGINX
systemctl restart nginx

# Install NPM Packages
npm install -g gulp
npm install -g typescript
npm install --prefix /opt/repositories/video-sharing-platform

# Build
npm run --prefix /opt/repositories/video-sharing-platform build

# Copy
cp -r /opt/repositories/video-sharing-platform/dist /opt/video-sharing-platform

# Remove Directory
rm -rf /opt/repositories/video-sharing-platform

# Install NPM Packages
npm install --prefix /opt/video-sharing-platform

# Run
pm2 start --name video-sharing-platform /opt/video-sharing-platform/app.js