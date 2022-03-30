const express = require('express')
const ytdl = require('ytdl-core')

const app = express()


app.get('/', (req, res) => res.sendStatus(200))

app.get('/downloadMp3', async (req, res, next) => {
    try {
      const url = req.query.url;
      if (!ytdl.validateURL(url)) {
        return res.sendStatus(400);
      }

      res.header('Content-Disposition', `attachment; filename="audio.mp3"`);
      ytdl(url, {
        format: 'mp3',
        filter: 'audioonly',
      }).pipe(res);

    } catch (err) {
      console.error(err);
    }
  })

app.listen(process.env.PORT || 4000, () => console.log(`Server is running...`))

