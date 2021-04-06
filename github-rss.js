const FeedService = require('./service/feed-service');

const process = require('process')
const express = require('express');

const PORT = 4993;

let app = express();

app.get('/github-rss/trending/daily.rss', async (req, res) => {
    let feed = await new FeedService().getTrending();
    res.send(feed.toRss());
});

app.get('/github-rss/trending/java/daily.rss', async (req, res) => {
    let feed = await new FeedService().getJavaTrending();
    res.send(feed.toRss());
});

app.get('/github-rss/trending/python/daily.rss', async (req, res) => {
    let feed = await new FeedService().getPythonTrending();
    res.send(feed.toRss());
});

app.get('/github-rss/trending/javascript/daily.rss', async (req, res) => {
    let feed = await new FeedService().getJavaScriptTrending();
    res.send(feed.toRss());
});

process.on('SIGINT', () => {
  console.info("Interrupted");
  process.exit(0);
});


console.log('Starting server on port:', PORT);
app.listen(PORT);
