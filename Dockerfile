# Gunakan image nginx ringan
FROM nginx:alpine

# Copy semua file HTML, CSS, JS ke folder nginx
COPY . /usr/share/nginx/html

# Expose port 80 agar Railway bisa akses
EXPOSE 80

# Jalankan nginx
CMD ["nginx", "-g", "daemon off;"]
