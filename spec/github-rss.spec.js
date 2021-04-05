describe("Feed Service", function() {
    const FeedService = require('../service/feed-service');

    const TEST_TITLE = 'Test Title';
    const TEST_DESCRIPTION = 'Test Description';

    let feedService;
    let rssRepository;

    beforeEach(function() {
        rssRepository = createMockRepository(TEST_TITLE, TEST_DESCRIPTION);
        feedService = new FeedService(rssRepository);
    });

    it("should return feed with description added to title", async function() {
        let feed = await feedService.getTrending();
        let items = feed.channel.items;
        expect(items[0].title).toEqual(`${TEST_TITLE} - ${TEST_DESCRIPTION}`);
    });

    function createMockRepository(title, description) {
        let channel = {
             items: [{ title, snippet: description }]
        };

        let repository = {};
        repository.getTrending = () => { return { channel } };
        return repository;
    }

});
