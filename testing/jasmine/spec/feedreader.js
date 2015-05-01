/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('URLs configured', function(){

            allFeeds.forEach( function(rss) { 
                expect(rss.url).toBeDefined();
                expect(rss.url.length).not.toBe(0);
            })
         });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('Feeds contain names', function(){

            allFeeds.forEach( function(rss) { 
                expect(rss.name).toBeDefined();
                expect(rss.name.length).not.toBe(0);
            })
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('Menu Test', function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('Menu Is Hidden', function() {
            expect($('.menu').position().left).not.toBe(0);
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('Menu Display and Hide', function() {
             $('.menu-icon-link').trigger( "click" );
             expect(document.body.classList.contains('menu-hidden')).toBeFalsy();            
             $('.menu-icon-link').trigger( "click" );
             expect(document.body.classList.contains('menu-hidden')).toBeTruthy();            
           });
     });


    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        beforeEach(function (done) {
            // Make an async call, passing the special done callback        
            loadFeed(0,done);
        });

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it("loadFeed successful all feeds loaded", function (done) {
            expect($('.entry-link').length).toBe(4);
            expect($('.header-title').html()).toBe("Udacity Blog");
            done();
        });
    });
    
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        var hdrTitle;
        beforeEach(function(done) {
            hdrTitle = $('.header-title').html();
            loadFeed(1,done);
        });

         /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it("Feed content changes", function(done) {
            expect($('.header-title').html()).not.toBe(hdrTitle);
            done();
        });

    });

}());
