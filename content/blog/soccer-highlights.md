---
title: Vuelites - a soccer highlights web app built with Flask, Vue.js and Reddit (part 1)
dates:
    published: "2024-01-15"
tags: [Python, Flask, Vue]
---

I love football (soccer for the non-British folk) and [r/soccer](https://reddit.com/r/soccer) is pretty much my go to place for finding recent highlights. And when I mean recent, the folk over there have highlights up seconds after they've happended live. But wouldn't it be nice if there was a place you go to that displayed all the highlights and nothing but highlights? With no deadlinks or copy-striked content? All displayed nicely so you can just scroll and watch them? Say no more, I got you covered. Introducing [Vuelites](https://soccer-highlights-frontend.onrender.com)! (couldn't think of a better name), a little web app I created that gets soccer highlights from Reddit using Flask on the backend and displays them nicely with a little Vue magic on the frontend. In this post I'll talk about how I created the app and some things I encountered along the way. 

## Fetching Posts from Reddit in Python

You may be wondering why use Flask and Python when I could just grab the JSON using Reddit's API, as after all, if you go to a link like https://www.reddit.com/r/soccer/hot.json, you get all the data returned back in JSON, right? Well, I intially thought about doing this but I needed to process a lot of the data as the JSON data wasn't quite giving me everything I wanted. For example, a while ago Reddit stopped downvotes from being visible on posts and consequently the API stopped providing this too. But we can calculate the number of downvotes using some other data properties we get back from the API. Again, we could just do this in Vue using Javascript but I like the idea of seperating our API and the processing we perform on the raw data - Vue is simply going to consume our API and all the dirty work will be done in Python and Flask. Then we'll send nice clean data to our frontend and all we have to worry about in Vue is displaying it. 

So how do we get posts from Reddit in Python? Well unlike how you would fetch data normally using an API by sending a request to a URL, in PRAW you create object instances and retreive data by using the methods and attributes on those objects. PRAW handles everything under the hood. For example, let's get some posts from the [r/soccer](https://www.reddit.com/r/soccer) subreddit. First we need to create a [Reddit instance](https://praw.readthedocs.io/en/stable/code_overview/reddit_instance.html). 

```py
import praw

reddit = praw.Reddit(
    client_id="CLIENT_ID",
    client_secret="CLIENT_SECRET",
    password="PASSWORD",
    user_agent="USERAGENT",
    username="USERNAME",
)
```

Once we have our Reddit instance, we can access the subreddit method of the Reddit instance and pass in as an argument the subreddit we want to search as a string. In this case, the subreddit we want to look through is 'soccer'. 

```python
for submission in reddit.subreddit("soccer").hot(limit=10):
    print(submission.title)

# Output: 10 submissions

```

We can loop through submissions from the subreddit, which are objects, and access those submissions attributes. We can also specificy some filters like whether we want the newest submissions, top, hottest, and so on. We can also specify how many submissions we want returned using `limit`. 

But notice this will return all types of submissions, including video, text, images, links etc. Since we only want video submissions, we need a way to only get back video submissions. Fortunately, submissions have lots of attributes, one of which is the `is_video` property, which is a boolean specifying `True` if the submission is a video and `False` if not. So we just need to check if the submission is video or not. 

```python
for submission in reddit.subreddit("soccer").hot(limit=10):
    if submission.is_video:
        print(submission.title)

# Output: 10 submissions

```

**Sidenote**:   Of course on r/soccer, there are "video submissions" containing external links to video hosting sites outside of reddit, which `is_video` will return `False` since these are just link posts. Vuelites ignores these sites and only retreives submissions strictly from Reddit. In a lot of cases, external links get taken down for copyright reasons and while we could easily write some code to accomodate these links to check to see if they are status 200, for copyright reasons and just for sake of simplicity, Vuelites does not handle these external sites and only retreives video uploaded and hosted on Reddit. 

It might also be a good idea to see if the post still exists and wasn't removed. 

```py
def is_removed(post):
    if post.removed_by_category is None:
        return False
    elif post.removed_by_category in ('author', 'moderator', 'deleted', 'copyright_takedown'):
       return True
    else:
        print(f"Unknown post state: {post.removed_by_category}")
```

Now our function to get highlights might look something like this:

```py
def get_highlights(r):
    highlights = []
    for submission in reddit.subreddit(r).hot(limit=10):
        if submission.is_video and not is_removed(submission):
            highlights.append(submission)
    return highlights

```

So great, we can check if a submission is a video by using `is_video` and ignore everything other type of submission. We can then get the url of the video using the `fallback_url` from the media attribute on the submission. 

```py
    print(submission.media['reddit_video']['fallback_url'])

    #output example: https://v.redd.it/akhb9vmuhvac1/DASH_360.mp4?source=fallback
```

If you open the link in your browser, you can watch the video. But you might notice something strange - there is no sound. And this is where things get interesting. Reddit streams it's video and audio files seperately! I have not really dived into the details of this and why (its called DASH afaik) but what this means for Vuelites is that we need to get the URL for the video AND the URL for the audio and combine them in our HTML player. This certainly complicates things a little. 

But wait! It gets even more complicated because Reddit often changes how audio files are named over time. For example. if you open Vuelites and inspect a video highlight, you will see a video element and an audio element. A video elements URL will look like https://v.redd.it/akhb9vmuhvac1/DASH_360.mp4?source=fallback, and the audio element might look something like https://v.redd.it/akhb9vmuhvac1/DASH_AUDIO_64.mp4". Its the same base URL but we just changed the DASH_360 to DASH_AUDIO. And if you open the audio file in the browser, it will work. But this won't work for every video. This naming convention for audio files only works for recently uploaded files. Older video files will need to use DASH_audio.mp4 suffix. 

The exact dates of when the new convention was introduced I can't find on the internet, but it seems like very early 2023 the new convention started being used. So in the code to solve this issue, we can just check if the video file was uploaded before or after 2023. If it was before 2023, we can use the `DASH_audio.mp4` suffix, otherwise we use the `DASH_AUDIO_64.mp4` suffix. 

```python
def get_audio_url(video_url, video_date):
    if video_date < 1672531200:
        return video_url.split('DASH_')[0] + 'DASH_audio.mp4'
    else:
        return video_url.split('DASH_')[0] + 'DASH_AUDIO_64.mp4'
```

Now our function to get highlights with some very basic serializing might look like this:

```py
    def serialize(submission):
        title = submission.title
        score = submission.score
        author = submission.author.name if submission.author is not None else 'Deleted'
        video_URL = submission.media['reddit_video']['fallback_url']
        audio_URL = get_audio_url(video_URL)

        return {
            'title': title,
            'author': author,
            'score': score,
            'audio_URL': audio_URL,
            'video_URL': video_URL
        }

    def get_highlights(subreddit):
        highlights = []
        for submission in reddit.subreddit(subreddit).hot(limit=10):
            if submission.is_video and not is_removed(submission):
                highlights.append(serialize(submission))
        return highlights
```

Great, so we know how to get a video URL and audio URL from a subreddit. But Vuelites is cool because you can browse highlights not just from r/soccer but whole leagues! For example, if you want to browse highlights just from Premier League teams, you can browse all the highlights from all the Premier League team's subreddits all at once! 

<div style="display: flex; flex-direction: row; align-items: center; justify-content: center; margin-top: 1rem;">
    <figure>
        <img style="width: 100%;" src="/img/vuelites/browse-highlights.png" />
        <figcaption style="text-align:center">In Vuelites you can browse highlights from the most popular leagues</figcaption>
    </figure>
</div>

And this is the power of PRAW. PRAW makes it possible to search and get submissions from multiple subreddits using a single function call! No need to run multiple calls on each subreddit individually (I'm not sure how it operates under the hood but I'm just talking from a higher-level). For example, say we want to get the top 10 submissions from r/LiverpoolFC and r/Reddevils (Manchester United's subreddit). We can write a function like this:

```python
for submission in reddit.subreddit("liverpoolFC+reddevils").hot(limit=10):
    print(submission.title)
```

Here we combine multiple subreddits into one string and seperate them using the `+` operator. And there is no limit to how many subreddits we want to combine. To get all the subreddits from a league, I used ChatGPT to make a list of all the subreddit names for a certain league. Since at the time of writing this ChatGPT-3's knowledge ends in 2021, it returned some teams that has since been relegated, so it needed a bit of guidance. To do this, I just copied team names from some up-to-date league tables I found on Google and told it to get the subreddits for those teams and put them in a list. And I was actually surprised at how well it did here, since it got all the subreddits correct first time. 

```python
premier_league = [
    "coys",                   # Tottenham Hotspur
    "Gunners",                # Arsenal
    "MCFC",                   # Manchester City
    "LiverpoolFC",            # Liverpool
    "avfc",                   # Aston Villa
    "NUFC",                   # Newcastle United
    "BrightonHoveAlbion",     # Brighton and Hove Albion
    "reddevils",              # Manchester United
    "Hammers",                # West Ham United
    "BrentfordFC",            # Brentford
    "fulhamfc",               # Fulham
    "chelseafc",              # Chelsea
    "WWFC",                   # Wolverhampton Wanderers
    "crystalpalace",          # Crystal Palace
    "Everton",                # Everton
    "nffc",                   # Nottingham Forest
    "afcbournemouth",         # Bournemouth
    "LutonTown",              # Luton Town
    "Burnley",                # Burnley
    "SheffieldUnited",        # Sheffield United
]
```

Now, if we want to get submissions from all the Premier League teams, we can just combine each subreddit name into a single string from the list. 

```python
subreddits_string = '+'.join([team for team in premier_league])
for submission in reddit.subreddit(subreddits_string).hot(limit=10):
    print(submission.title)
```

To do multiple leagues, we can just do the same thing and make a dictionary of leagues. 

```py
leagues = {
    'PremierLeague': premier_league, 
    'LaLiga': la_liga, 
    'Bundesliga': bundesliga,
    'SerieA': serie_a,
    'Ligue1': ligue_1,
    'MLS': mls,
    'EFL': efl,
    'Eredivisie': eredivisie,
    }
```

Each value in the dictionary is a list of subreddit names for each team in the league. 

So our route in Flask then might look something like this. 

```py
@app.route("/highlights/league/<string:league>", methods=["GET"])
def highlights_league(league):
    subreddits_string = '+'.join([team for team in leagues[league]])
    highlights = get_highlights(subreddits_string)
    return jsonify({
        'highlights': highlights
    })
```

If we access this URL, each highlight will be a JSON object. Later we will pass these objects as props into our video player component in Vue:

```js
highlights: [
    {
        audio_url: "https://v.redd.it/akhb9vmuhvac1/DASH_AUDIO_64.mp4",
        author: "aronrodge",
        date: "Jan 6, 2024",
        downs: 161,
        fullname: "t3_1908605",
        has_audio: true,
        id: "1908605",
        nsfw: false,
        num_comments: 332,
        score: 15915,
        subreddit: "soccer",
        title: "Chelsea debutant Micheal Golding thinks the official is trying to shake his hand",
        ups: 15915,
        video_url: "https://v.redd.it/akhb9vmuhvac1/DASH_360.mp4?source=fallback"
    },
]

```

One downside of using the mutliple subreddits trick however, is that since naturally the bigger teams have more subscribers and posts on those subreddits will have more upvotes and go to the top, smaller teams highlights get thrown to the bottom of the pile. In Vuelites you can browse highlights by subreddit though. Also, some leagues, particularly the Bundesliga are full of private subreddits, meaning if you try to access them you get a 403 forbidden error. There is no work around this unfortunately.

That pretty much covers the basics of the backend. In part 2 I will be going over the frontend and show you in Vue how to take the data that we got from Reddit and display it using Vue's reactivity. 