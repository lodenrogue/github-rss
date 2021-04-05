const FeedService = require('./service/feed-service');

const process = require('process')
const express = require('express');

const PORT = 8081;

let app = express();

app.get('/github-rss/trending/daily.rss', async (req, res) => {
    let feed = await new FeedService().getTrending();
    res.send(feed.toRss());
});

process.on('SIGINT', () => {
  console.info("Interrupted");
  process.exit(0);
});


console.log('Starting server on port:', PORT);
app.listen(PORT);
