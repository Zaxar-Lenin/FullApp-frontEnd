git checkout main
npm run build
scp -r build/* vboxuser@192.168.0.113:/var/www/192.168.0.113/
