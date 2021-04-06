const Parser = require('rss-parser');

const ALL_TRENDING_URL = 'https://mshibanami.github.io/GitHubTrendingRSS/daily/all.xml';
const JAVA_TRENDING_URL = 'https://mshibanami.github.io/GitHubTrendingRSS/daily/java.xml';
const PYTHON_TRENDING_URL = 'https://mshibanami.github.io/GitHubTrendingRSS/daily/python.xml';

class RssRepository {

    constructor(parser = new Parser()) {
        this.parser = parser;
    }

    async getAllTrending() {
        return await this.get(ALL_TRENDING_URL);
    }

    async getJavaTrending() {
        return await this.get(JAVA_TRENDING_URL);
    }

    async getPythonTrending() {
        return await this.get(PYTHON_TRENDING_URL);
    }

    async get(url) {
        let parsedFeed = await this.parser.parseURL(url);
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