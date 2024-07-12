#!/bin/sh

# Replace the placeholder port in the Nginx configuration
if [ -n "$PORT" ]; then
  sed -i "s/listen 80;/listen $PORT;/" /etc/nginx/nginx.conf
fi

# Start Nginx
nginx -g 'daemon off;'