# P5-Neighborhood-Map
Project 5 Neighborhood Map / Front-End Web Developer Nanodegree

4-20-2015 - Third Submission Date
4-16-2015 - Second Submission Date
4-16-2015 - First Submission Date

Student

	Gordon Seeler
	Front-end Web Developer
	Cohort 2
	gs6687@att.com

Summary Objective

	This project enforces skills learned in the JavaScript Design Patterns course.
	Skills for asynchronously accessing remote APIs. But most importantly, skills
	focused on separation of concerns where logic for presentational viewing is
	set apart from the logic used for implementing the business logic. This was
	demonstrated using Model-View-Controller concepts. Lastly, third party libraries
	and frameworks like Knockout were demonstrated as a plugin MVVM model. This
	project implements the Knockout JavaScript library and interfaces asynchronously
	with Google Maps, Google Places, Wikipedia, and Flickr.

	This project uses downtown Atlanta, Georgia as the mapped neighborhood.

Note To Evaluator

	4-20-2015
	1.  Last evaluation indicated the UI wasn't working. I do not know exactly why. I have
	been downloading my project from Github on several machines, and it works for both
	Chrome and IE. What I did in this submission was created a status at the very bottom
	of the page, and if any issue were to occur in AJAX calls to Google, Flickr, or
	Wiki, it will be displayed at the bottom left corner of the window in red font. I
	successfully tested this for both Flickr and Wiki.
	2.  The logic for handling the searching in the Key Locations list was questioned by
	reviewer. I re-examined the code and put in place a better process than prior submissions.
	3.  The prior evaluation indicated that the page did not look great on smaller devices
	and suggested using media queries. I added those to improve the smaller screen appearance.
	4.  The application JavaScript file was run through JSHint site.

	4-16-2015
	I access the Flickr API to bring in a photo of each location that I am presenting
	to you. I individually selected each photo and added to a personal 'Gallery'.
	I call the Flicker API Galleries.GetPhotos method to get the neccessary meta
	information about each photo which is used to build the URL to the image. You
	can view this image when clicking on a location marker.

	I also access Wikipedia's API to search on each location I highlight in my
	neighborhood.

	This project uses Bootstrap to manage the screen sizes for different devices.

Installation Instructions

	GitHub address: https://github.com/linden416/P5-Neighborhood-Map.git

	Download GitHub repository and open local index.html

Instructions

	1. Key in character(s) in the 'Search' input to narrow down the locations list.

	2. Mouse over each key location to highlight where they are marked on the map.

	3. Click on a location in the key location list to view detailed information.

	4. Click on each read Marker in the map to also view detailed information.

Resources

	* Udacity Discussion Forum for Front-End NanoDegree

	* Knockout Website Documentation: http://knockoutjs.com/index.html

	* jQuery Website Documentation: http://api.jquery.com/jquery.ajax/

	* JavaScript Website Documentaion: https://developer.mozilla.org/en-US/docs/Web/API/document

	* https://developers.google.com/maps/documentation/javascript/infowindows

	* http://www.adamthings.com/post/2013/08/26/find-element-observable-array-knockoutjs/

	* http://recurial.com/programming/understanding-callback-functions-in-javascript/

	* https://www.flickr.com/services/api/

	* http://stackoverflow.com/questions/11141865/toggle-hide-show-google-map-markers

	* https://developers.google.com/maps/documentation/staticmaps/

	* https://developers.google.com/places/

