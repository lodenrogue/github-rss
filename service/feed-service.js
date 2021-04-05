const RssRepository = require('../repository/rss-repository');
const FeedConverter = require('../service/feed-converter');

class FeedService {

    constructor(rssRepository = new RssRepository()) {
        this.rssRepository = rssRepository;
    }

    async getTrending() {
        let originalFeed = await this.rssRepository.getTrending();
        originalFeed.channel.items.forEach(this.updateTitle);
        return new FeedConverter(originalFeed).convert();
    }

    updateTitle(item) {
        let snippet = item.snippet ? item.snippet.split('\n')[0] : '';
        item.title = `${item.title} - ${snippet}`;
    }
}

module.exports = FeedService;