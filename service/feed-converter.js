const Feed = require('feed').Feed;
const _ = require('lodash');

class FeedConverter {
    
    constructor(feed) {
        this.feed = feed;
    }

    convert() {
        let result = _.cloneDeep(this.feed);
        let channel = result.channel;

        let convertedFeed = new Feed({
            title: channel.title,
            description: channel.description,
            link: channel.link
        });

        channel.items.forEach(convertedFeed.addItem);
        
        result.toRss = convertedFeed.rss2;
        return result;
    }
}

module.exports = FeedConverter;