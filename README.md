# Matlo client - CSV stream

Create new dashboard then send data from csv stream to it.

## Why ?

Because [Matlo-client](https://github.com/Matlo-dev/matlo-client) needs some example.

## What ?

Data sample provided in this example is the list of the first ten commits from
the [Matlo-client](https://github.com/Matlo-dev/matlo-client) repository.

You can generate your own commit list with the same format using this command :

```bash
git log --date=format:'%Y-%m-%d %H:%M:%S' --pretty=format:'%h;%an;%ad;%s' > [YOUR_FILE].csv`
```

## How ?

### At first

- Clone this repo.
- Run `npm i`.
- Edit `config.json` to match your credentials.
- Run `npm start`.
- Connect to Matlo and play with the new dashboard.

### Then

- Get your own CSV to process.
- Edit `data/metadata.json` to match your needs.
- Edit `config.json` to adapt :
  - Dashboard title and tags.
  - Bulk size.
  - CSV file path.
- Run `npm start`.

## License

Matlo-client is under [MIT license](./LICENSE).