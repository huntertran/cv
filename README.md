# CV project

## Build

```s
npm run build
```

## Deploy

Delete all files and folder in docs, except `.git` and `README.md`

Then move files and folder from `build` to `docs`

```s
cd docs

find -not -name ".git" -not -name "README.md" -delete

mv ../build/* ../docs/
```

