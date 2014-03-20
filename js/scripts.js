$('document').ready(function() {

    // smooth scrolling for nav items
    $('nav a').click( function(e){
        e.preventDefault();
        $('nav a').removeClass('on');
        $(this).addClass('on');
        var navdestination = $(this).attr('href');
        var navoffset = $(navdestination).offset().top - 80;
        $('html, body').animate({
            scrollTop: navoffset
        }, 500);
    });

    var updatenav = function(e) {
        // var navoffsettwitter = $('a#twitter').offset().top - $(window).scrollTop();
        // if (navoffsettwitter <= 80) {
        //     $('nav a').removeClass('on');
        //     $('nav a.twitter').addClass('on');
        // }

        var navoffsettumblr = $('a#tumblr').offset().top - $(window).scrollTop();
        if (navoffsettumblr <= 80) {
            $('nav a').removeClass('on');
            $('nav a.tumblr').addClass('on');
        }

        var navoffsetprojects = $('a#projects').offset().top - $(window).scrollTop();
        if (navoffsetprojects <= 80) {
            $('nav a').removeClass('on');
            $('nav a.projects').addClass('on');
        }

        var navoffsetabout = $('a#about').offset().top - $(window).scrollTop();
        if (navoffsetabout <= 80) {
            $('nav a').removeClass('on');
            $('nav a.about').addClass('on');
        }

        var navoffsetfindme = $('a#findme').offset().top - $(window).scrollTop();
        if (navoffsetfindme <= 80) {
            $('nav a').removeClass('on');
            $('nav a.findme').addClass('on');
        }
    };

    $(window).scroll( function() {
        updatenav();
    });

    // set up underscore templating to use {{ }}
    _.templateSettings = {
        interpolate : /\{\{(.+?)\}\}/g
    };

    var contenttemplates = {
        "tweet": "<div class='tweet'><div class='text'>{{ text }}</div>{{ dateandtimepermalink }}</div>",
        "posttext": "<div class='post text'><div class='title'>{{ title }}</div><div class='body'>{{ body }}</div>{{ dateandtime }}</div>",
        "postphoto": "<div class='post photo'><a class='image' href='{{ linkurl }}'><img src='{{ imgurl }}' /></a><div class='caption'>{{ caption }}</div><div class='source'><a href='{{ sourceurl }}'>{{ source }}</a></div>{{ dateandtime }}</div>",
        "postquote": "<div class='post quote'><div class='text'>{{ text }}<div class='source'>&#8212; {{ source }}</div></div>{{ dateandtime }}</div>",
        "postlink": "<div class='post link'><a href='{{ url }}' class='url'>{{ title }}</a><div class='description'>{{ description }}</div>{{ dateandtime }}</div>",
        "postchat": "<div class='post chat'><div class='title'>{{ title }}</div><div class='body'><pre>{{ body }}</pre></div>{{ dateandtime }}</div>",
        "postaudio": "<div class='post audio'><img src='{{ albumarturl }}' /><div class='player'>{{ player }}</div><div class='meta'>{{ trackname }} by {{ artist }} from <em>{{ album }}</em></div><div class='caption'>{{ caption }}</div>{{ dateandtime }}</div>",
        "postvideo": "<div class='post video'><div class='player'>{{ player }}</div><div class='caption'>{{ caption }}</div>{{ dateandtime }}</div>",
        "dateandtime": "<div class='dateandtime'><span class='month'>{{ month }}/</span><span class='day'>{{ day }}/</span><span class='year'>{{ year }} </span><span class='hour'>{{ hour }}:</span><span class='minute'>{{ minute }}</span><span class='ampm'>{{ ampm }}</span></div>",
        "dateandtimepermalink": "<div class='dateandtime'><a href='{{ permalink }}'><span class='month'>{{ month }}/</span><span class='day'>{{ day }}/</span><span class='year'>{{ year }} </span><span class='hour'>{{ hour }}:</span><span class='minute'>{{ minute }}</span><span class='ampm'>{{ ampm }}</span></a></div>",
        "empty": "<div class='empty'>{{ empty }}</div>"
    };

    // underscore templates
    // these don't take a jq object, only a string, so we need to handle that with jqtostring()
    var templatetweet = _.template(contenttemplates.tweet);
    var templatetumblrtext = _.template(contenttemplates.posttext);
    var templatetumblrphoto = _.template(contenttemplates.postphoto);
    var templatetumblrquote = _.template(contenttemplates.postquote);
    var templatetumblrlink = _.template(contenttemplates.postlink);
    var templatetumblrchat = _.template(contenttemplates.postchat);
    var templatetumblraudio = _.template(contenttemplates.postaudio);
    var templatetumblrvideo = _.template(contenttemplates.postvideo);
    // var templatetumblranswer = _.template(contenttemplates.postanswer);
    
    var templatedateandtime = _.template(contenttemplates.dateandtime);
    var templatedateandtimepermalink = _.template(contenttemplates.dateandtimepermalink);
    var templateempty = _.template(contenttemplates.empty);

    // get latest tweets
    // var $twitterdiv = $('.content.twitter');
    // var twitterhtml;
    // var parseddate;

    // $.ajax({
    //     url: 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=travhimself&include_entities=true&exclude_replies=true&include_rts=true&count=4',
    //     dataType: "jsonp",
    //     success: function(data) {
    //         $.each(data, function(i, n){
    //             twitcreated = n.created_at;
    //             parseddate = new Date(
    //                 twitcreated.replace(/^\w+ (\w+) (\d+) ([\d:]+) \+0000 (\d+)$/, "$1 $2 $4 $3 UTC")
    //             );

    //             var humanmonth = parseddate.getMonth() + 1;
    //             var humanhour = parseddate.getHours();
    //             var humanminute = parseddate.getMinutes();
    //             var meridian = 'am';
                
    //             if (humanhour >= 12) {
    //                 meridian = 'pm';
    //             }

    //             if (humanhour > 12) {
    //                 humanhour -= 12;
    //             } else if (humanhour == 0) {
    //                 humanhour = 12;
    //             }
                
    //             if (String(humanminute).length == 1) {
    //                 humanminute = '0' + humanminute;
    //             }

    //             twitterhtml = templatetweet({
    //                 text: ify.clean(n.text),
    //                 dateandtimepermalink: templatedateandtimepermalink({
    //                     permalink: 'https://twitter.com/' + n.user.screen_name + '/status/' + n.id_str,
    //                     month: humanmonth,
    //                     day: parseddate.getDate(),
    //                     year: parseddate.getFullYear(),
    //                     hour: humanhour,
    //                     minute: humanminute,
    //                     ampm: meridian
    //                 })
    //             });

    //             $twitterdiv.append(twitterhtml);
    //         });
    //     },
    //     error: function(data) {
    //         console.log('error grabbing latest tweets.');
    //     }
    // });

    // get latest tumblr entries
    var $tumblrdiv = $('.content.tumblr');
    var tumblrdata;
    var tumblrhtml;

    $.ajax({
        url: 'http://api.tumblr.com/v2/blog/travhimself.tumblr.com/posts?api_key=oWYm3pASzH4Lj2kQKCZh6z4W4X86IvVzLspQ5KEJKBGLS6JySZ&limit=5&jsonp=gettumblr',
        dataType: "jsonp",
        success: function(data) {
            // jsonp is weird, so this ajax hit will never actually 'succeed'...
        },
        error: function(data) {
            // ...and this error will always occur...
        }
    });

    // ...so instead, we handle the returned tumblr data here.
    gettumblr = function(data) {
        // data == tumblr response json
        $.each(data.response.posts, function(i, n){
            parseddate = new Date(n.timestamp*1000);
            
            var humanmonth = parseddate.getMonth() + 1;
            var humanhour = parseddate.getHours();
            var humanminute = parseddate.getMinutes();
            var meridian = 'am';
            
            if (humanhour >= 12) {
                meridian = 'pm';
            }

            if (humanhour > 12) {
                humanhour -= 12;
            } else if (humanhour == 0) {
                humanhour = 12;
            }
            
            if (String(humanminute).length == 1) {
                humanminute = '0' + humanminute;
            }

            if (n.type == 'text') {

                tumblrhtml = templatetumblrtext({
                    title: n.title,
                    body: n.body,
                    dateandtime: templatedateandtime({
                        month: humanmonth,
                        day: parseddate.getDate(),
                        year: parseddate.getFullYear(),
                        hour: humanhour,
                        minute: humanminute,
                        ampm: meridian
                    })
                });

            } else if (n.type == 'photo') {

                tumblrhtml = templatetumblrphoto({
                    linkurl: n.link_url,
                    imgurl: n.photos[0].original_size.url,
                    caption: n.caption,
                    source: n.source_title,
                    sourceurl: n.source_url,
                    dateandtime: templatedateandtime({
                        month: humanmonth,
                        day: parseddate.getDate(),
                        year: parseddate.getFullYear(),
                        hour: humanhour,
                        minute: humanminute,
                        ampm: meridian
                    })
                });

            } else if (n.type == 'quote') {

                tumblrhtml = templatetumblrquote({
                    text: n.text,
                    source: n.source,
                    dateandtime: templatedateandtime({
                        month: humanmonth,
                        day: parseddate.getDate(),
                        year: parseddate.getFullYear(),
                        hour: humanhour,
                        minute: humanminute,
                        ampm: meridian
                    })
                });

            } else if (n.type == 'link') {

                tumblrhtml = templatetumblrlink({
                    url: n.url,
                    title: n.title,
                    description: n.description,
                    dateandtime: templatedateandtime({
                        month: humanmonth,
                        day: parseddate.getDate(),
                        year: parseddate.getFullYear(),
                        hour: humanhour,
                        minute: humanminute,
                        ampm: meridian
                    })
                });

            } else if (n.type == 'chat') {

                tumblrhtml = templatetumblrchat({
                    title: n.title,
                    body: n.body,
                    dateandtime: templatedateandtime({
                        month: humanmonth,
                        day: parseddate.getDate(),
                        year: parseddate.getFullYear(),
                        hour: humanhour,
                        minute: humanminute,
                        ampm: meridian
                    })

                });
            } else if (n.type == 'audio') {

                tumblrhtml = templatetumblraudio({
                    album: n.album,
                    albumarturl: n.album_art,
                    artist: n.artist,
                    caption: n.caption,
                    player: n.player,
                    trackname: n.track_name,
                    dateandtime: templatedateandtime({
                        month: humanmonth,
                        day: parseddate.getDate(),
                        year: parseddate.getFullYear(),
                        hour: humanhour,
                        minute: humanminute,
                        ampm: meridian
                    })
                });

            } else if (n.type == 'video') {

                tumblrhtml = templatetumblrvideo({
                    player: n.player[2].embed_code,
                    caption: n.caption,
                    dateandtime: templatedateandtime({
                        month: humanmonth,
                        day: parseddate.getDate(),
                        year: parseddate.getFullYear(),
                        hour: humanhour,
                        minute: humanminute,
                        ampm: meridian
                    })
                });

            } else if (n.type == 'answer') {
                // should never exist, as i've got q&a disabled
            } else {
                // render an empty div to prevent any wacky display issues if a post doesn't exist
                tumblrhtml = templateempty({
                    empty: ''
                });
            }

            $tumblrdiv.append(tumblrhtml)
        });
    };
});