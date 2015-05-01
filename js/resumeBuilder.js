//This script contains key resume data objects for: BIO, WORK HISTORY, PROJECTS HISTORY,
//and EDUCATION. A mix of functions both internal to the objects and external are 
//available for formatting the object data into strings which are added to the 
//index.html page.

//Data about myself
var bio = {
    "name":"Gordon Seeler",
    "role":"Web Developer",
    "contacts":{
        "email":"linden416@gmail.com",
        "github":"linden416",
        "mobile":"678.230.1122",
        "location":"Atlanta"
    },
    "picture URL":"images/gs.jpg",
    "welcome message":"IT Professionals-- Enable and Automate!",
    "skills":["CSS", "HTML", "JavaScript", "jQuery", "JSON", "Bootstrap", "Responsive Web Design"]
}

//Function to format the BIO data object into strings defined in the header.js script.
function displayBIO()
{
    $("#header").prepend(HTMLheaderRole.replace("%data%", bio.role));
    $("#header").prepend(HTMLheaderName.replace("%data%", bio.name));
    $("#header").append(HTMLbioPic.replace("%data%", bio["picture URL"]));

    $("#topContacts").append(HTMLemail.replace("%data%", bio.contacts.email));
    $("#topContacts").append(HTMLgithub.replace("%data%", bio.contacts.github));
    $("#topContacts").append(HTMLmobile.replace("%data%", bio.contacts.mobile));
    $("#topContacts").append(HTMLtwitter.replace("%data%", "&nbsp;"));
    $("#topContacts").append(HTMLblog.replace("%data%", "&nbsp;"));
    $("#topContacts").append(HTMLlocation.replace("%data%", bio.contacts.location));
    
    $("#header").append(HTMLWelcomeMsg.replace("%data%", bio["welcome message"]));

    if (bio.skills.length > 0)
    {
        $("#header").append(HTMLskillsStart);
        for (i = 0; i < bio.skills.length; i++)
        {
            $("#skills").append(HTMLskills.replace("%data%",bio.skills[i]));
            console.log(HTMLskills.replace("%data%",bio.skills[i]));
        }
    }
}

//My WORK HISTORY
var work = {
    "jobs":[
        {
            "employer":"AT&amp;T",
            "title":"Principle Member of Tech Staff",
            "location":"Atlanta",
            "dates":"2006-present",
            "description":"Lead developer in group that customizes eGRC Governance, Risk, and Compliance solutions"
        },
        {
            "employer":"Nielsen Media",
            "title":"Network Tech",
            "location":"Atlanta",
            "dates":"2003-2005",
            "description":"Supported remote office network, desktops, and servers"
        },
        {
            "employer":"Prudential",
            "title":"Lead Systems Analyst",
            "location":"Newark, NJ",
            "dates":"1986-2003",
            "description":"IT programmer, administrator, and team lead building and supporting new and existing systems"
        }
    ]
}

//Function which formats the WORK object data into strings in the header.js script.
function displayWORK()
{
    for(job in work.jobs)
    {
        $("#workExperience").append(HTMLworkStart);
        $(".work-entry:last").append(HTMLworkEmployer.replace("%data%",work.jobs[job].employer) +
                HTMLworkTitle.replace("%data%",work.jobs[job].title) +
                HTMLworkDates.replace("%data%", work.jobs[job].dates) +
                HTMLworkLocation.replace("%data%", work.jobs[job].location) +
                HTMLworkDescription.replace("%data%", work.jobs[job].description));
    }
}

//My EDUCATION
var education = {
    "schools": [
        {
            "name": "Moravian College",
            "location": "Bethlehem, PA",
            "degree": "BS",
            "majors": ["CompSci/Econ"],
            "dates": "1983",
            "url":"http://www.moravian.edu"
        },
        {
            "name": "Seton Hall",
            "location": "South Orange, NJ",
            "degree": "MS",
            "majors": ["InfoSys"],
            "dates": "2001",
            "url": "http://www.shu.edu"
        }
    ],
    "onlineCourses": [
        {
            "title": "Intro to HTML and CSS",
            "school": "Udacity",
            "dates": 2015,
            "url": "https://www.udacity.com/course/c-ud304-nd"
        },
        {
            "title": "JavaScript Basics",
            "school": "Udacity",
            "dates": 2015,
            "url": "https://www.udacity.com/course/c-ud804-nd"
        },
        {
            "title": "JavaScript Design Patterns",
            "school": "Udacity",
            "dates": 2015,
            "url": "https://www.udacity.com/course/c-ud989-nd"
        },
        {
            "title": "Object-Oriented JavaScript",
            "school": "Udacity",
            "dates": 2015,
            "url": "https://www.udacity.com/course/c-ud015-nd"
        },
        {
            "title": "Intro to jQuery",
            "school": "Udacity",
            "dates": 2015,
            "url": "https://www.udacity.com/course/c-ud245-nd"
        },
        {
            "title": "Intro to AJAX",
            "school": "Udacity",
            "dates": 2015,
            "url": "https://www.udacity.com/course/c-ud110-nd"
        },
        {
            "title": "Website Performance Optimization",
            "school": "Udacity",
            "dates": 2015,
            "url": "https://www.udacity.com/course/c-ud884-nd"
        },
        {
            "title": "JavaScript Testing",
            "school": "Udacity",
            "dates": 2015,
            "url": "https://www.udacity.com/course/c-ud549-nd"
        },
        {
            "title": "HTML5 Canvas",
            "school": "Udacity",
            "dates": 2015,
            "url": "https://www.udacity.com/course/c-ud292-nd"
        },
        {
            "title": "How to USe Git and GitHub",
            "school": "Udacity",
            "dates": 2015,
            "url": "https://www.udacity.com/course/c-ud775-nd"
        }
    ],
    "display": function(){
        for(school in education.schools)
        {
            var myHTMLschoolName = HTMLschoolName.replace("#", education.schools[school].url);
            myHTMLschoolName = myHTMLschoolName.replace("%data%",education.schools[school].name);

            $("#education").append(HTMLschoolStart);
            $(".education-entry:last").append(
                myHTMLschoolName  +
                HTMLschoolDegree.replace("%data%",education.schools[school].degree) +
                HTMLschoolDates.replace("%data%", education.schools[school].dates) +
                HTMLschoolLocation.replace("%data%", education.schools[school].location) +
                HTMLschoolMajor.replace("%data%", education.schools[school].majors[0]));
        }

        $(".education-entry:last").append(HTMLonlineClasses);
        for(oschool in education.onlineCourses)
        {
            var myHTMLonlineTitle = HTMLonlineTitle.replace("#", education.onlineCourses[oschool].url);
            myHTMLonlineTitle = myHTMLonlineTitle.replace("%data%",education.onlineCourses[oschool].title);

            $(".education-entry:last").append(
                myHTMLonlineTitle + 
                HTMLonlineSchool.replace("%data%",education.onlineCourses[oschool].school) +
                HTMLonlineDates.replace("%data%", education.onlineCourses[oschool].dates));
        }
    }
}

//My PROJECT history
var projects = {
   "projects": [
    {
        "title":"Intro to HTML5",
        "dates":"2015",
        "description":"This project uses CSS3 and Twitter Bootstrap Library skills to craft a one page website. The site had to match exactly to a PDF specification and be web responsive to different media devices.",
        "images":["images/P1.jpg"],
        "url":"http://linden416.github.io/intro/"
    },
    {
        "title":"Online Resume",
        "dates":"2015",
        "description":"This project uses JavaScript and the jQuery library to manipulate the HTML DOM by dynamically adding content.",
        "images":["images/P2.jpg"],
        "url":"#"
    },
    {
        "title":"Classic Arcade Game Clone",
        "dates":"2015",
        "description":"This project implements HTML5 Canvas and animation with a focus on object oriented development.",
        "images":["images/P3.jpg"],
        "url":"http://linden416.github.io/frogger/"
    },
    {
        "title":"Website Optimization",
        "dates":"2015",
        "description":"This project takes advantage of Chrome Developer Tools and solid programming principles, technical saavy for enhancing the download speed and page refresh rates of a poorly developed and complex website.",
        "images":["images/P4.jpg"],
        "url":"http://linden416.github.io/portfolio/"
    },
    {
        "title":"Neighborhood Map Project",
        "dates":"2015",
        "description":"This project focuses on asynchronous programming accessing APIs to third party resources and JavaScript Frameworks for designing Model-View-Controller concepts into the application.",
        "images":["images/P5.jpg"],
        "url":"http://linden416.github.io/mymap/"
    },
    {
        "title":"Feed Reader Testing",
        "dates":"2015",
        "description":"This project uses a Behavior-Driven Development Framework for building a series of test cases to measure the quality of a prepared website.",
        "images":["images/P6.jpg"],
        "url":"http://linden416.github.io/testing/"
    },
    {
        "title":"Highland Oaks Home Owners Assoc.",
        "dates":"2015",
        "description":"The web portal 'myHighlandOaks.com' supports the needs of the a community of over 500 residences. It provides important messages from the president's desk, calendar events, contact information, schools, important forms, by-laws, covenants, and a little history about the area.",
        "images":["images/hoa.jpg"],
        "url":"http://myHighlandOaks.com/"
    },
    {
        "title":"Knights of Columbus",
        "dates":"2015",
        "description":"The website for promoting council events, documenting past activities, and identifying current members.",
        "images":["images/kofc.jpg"],
        "url":"http://kofc12905.org/"
    }
   ],
   "display": function(){
    for(projX in projects.projects)
    {
        $("#projects").append(HTMLprojectStart);

        var projTitle = HTMLprojectTitle.replace("%data%",projects.projects[projX].title);
        projTitle = projTitle.replace("#",projects.projects[projX].url);
        $(".project-entry:last").append(
                //HTMLprojectTitle.replace("%data%",projects.projects[projX].title) +
                projTitle +
                HTMLprojectDates.replace("%data%", projects.projects[projX].dates) +
                HTMLprojectDescription.replace("%data%", projects.projects[projX].description) +
                HTMLprojectImage.replace("%data%", projects.projects[projX].images[0]));
    }
   }
}

//Invoke the functions which format the object's data and replaces the data into the specific
//strings defined in the header.js script which provides HTML content to the index.html page.
displayBIO();
displayWORK();
projects.display();
education.display();

//Add the html object 'internationalize' button to the index.html page
$("#main").append(internationalizeButton);

//Add the Google Maps to the index.html page
$("#mapDiv").append(googleMap);

//Internationalize the BIO.name. Make the lastname all uppercase.
function inName(sFullName)
{
    sFullName = bio.name;
    if (!sFullName)
        return "";

    var namesArr = sFullName.split(" ");

    var fNameLower = namesArr[0].substr(1);
    fNameLower = fNameLower.toLowerCase();

    var fInitial = namesArr[0].substring(0,1);
    fInitial = fInitial.toUpperCase();

    return fInitial + fNameLower + " " + namesArr[1].toUpperCase();
}

