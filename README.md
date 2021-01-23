# kalufs-recept

Frontend for recAPI recipe data base.

## Project setup
```
npm install
```

* add symlinks from backend image directories to `public/img_medium` and `public/img_thumb` e.g.:
```
ln -s ../recapi/instance/img_medium public/img_medium
ln -s ../recapi/instance/img_thumb public/img_thumb
```

### Compile and hot-reload for development
```
npm run serve
```

### Compile and minify for production
```
npm run build
```

### Lint and fix files
```
npm run lint
```
