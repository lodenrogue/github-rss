const Parser = require('rss-parser');

const ALL_LANUAGE_TRENDING_URL = 'https://mshibanami.github.io/GitHubTrendingRSS/daily/all.xml';

class RssRepository {

    async getTrending() {
        let parsedFeed = await new Parser().parseURL(ALL_LANUAGE_TRENDING_URL);
        return this.toFeed(parsedFeed);
    }

    toFeed(parsedFeed) {
        let items = parsedFeed.items.map(this.mapToFeedItem);

        let channel = {
            title: parsedFeed.title,
            description: parsedFeed.description,
            link: parsedFeed.link,
            items: items
        };

        return { channel };
    }

    mapToFeedItem(parsedItem) {
        return {
            title: parsedItem.title,
            link: parsedItem.link,
            snippet: parsedItem.contentSnippet,
            description: parsedItem.content
        };
    }

}

module.exports = RssRepository;