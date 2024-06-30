Frontend for `soğan sözlük` project.

# Setting up the project

First, you need [arpacik](https://github.com/sogan-sozluk/arpacik) up and running.

Then, you need to clone this repository and install the dependencies.

```bash
git clone https://github.com/sogan-sozluk/mor
cd mor
nvm use # This will use the correct node version
yarn
```

You need to create a `.env` file in the root of the project. You can copy the `example.env` file and fill in the necessary values.

```bash
PUBLIC_API_URL=http://localhost:8099/api/v1 # This is the url of the arpacik api
```

Finally, you can start the project with the following command:

```bash
yarn dev
```
