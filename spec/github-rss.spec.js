describe("Feed Service", function() {
    const FeedService = require('../service/feed-service');
    const RssRepository = require('../repository/rss-repository');

    const TEST_TITLE = 'Test Title';
    const TEST_DESCRIPTION = 'Test Description';

    let feedService;

    beforeEach(function() {
        let parser = createMockParser(TEST_TITLE, TEST_DESCRIPTION);
        let rssRepository = new RssRepository(parser);
        feedService = new FeedService(rssRepository);
    });

    it("should return all trending feed with description added to title", async function() {
        let feed = await feedService.getTrending();
        let items = feed.channel.items;
        expect(items[0].title).toEqual(`${TEST_TITLE} - ${TEST_DESCRIPTION}`);
    });

    it("should return Java trending feed with description added to title", async function() {
        let feed = await feedService.getJavaTrending();
        let items = feed.channel.items;
        expect(items[0].title).toEqual(`${TEST_TITLE} - ${TEST_DESCRIPTION}`);
    });

    it("should return Python trending feed with description added to title", async function() {
        let feed = await feedService.getPythonTrending();
        let items = feed.channel.items;
        expect(items[0].title).toEqual(`${TEST_TITLE} - ${TEST_DESCRIPTION}`);
    });

    function createMockParser(title, description) {
        return {
            parseURL : function(url) {
                return createParsedFeed(title, description);
            }
        };
    }

    function createParsedFeed(title, description) {
        return {
            title: title,
            items: [{ title: title, contentSnippet: description }]
        };
    }


    function createMockRepository(title, description) {
        let channel = {
             items: [{ title, snippet: description }]
        };

        let getMethod = () => { return { channel } };

        let repository = {
            getAllTrending: getMethod,
            getJavaTrending: getMethod
        };

        return repository;
    }

});
