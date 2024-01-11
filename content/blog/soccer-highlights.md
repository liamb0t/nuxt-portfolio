---
title: Reddit Soccer Highlights App
dates:
    published: "2023-12-24"
tags: [Python, Flask, Vue]
---

I love football (soccer for the non-British folk) and [r/soccer](https://reddit.com/r/soccer) is pretty much my go to place for finding recent highlights. And when I mean recent, the folk over there have highlights up seconds after they've happended live. But wouldn't it be nice if there was a place you go to that displayed all the highlights and nothing but highlights? With no deadlinks or copy-striked content? All displayed nicely so you can just scroll and watch them? Say no more, I got you covered. Introducing reddit soccer highlights! (Working title), a little web app I created that gets soccer highlights from Reddit using Flask on the backend and displays them nicely with a little Vue magic on the frontend. In this post I'll talk about how I created the app and some things I encountered along the way. 

You may be wondering why use Flask and Python when I could just grab the JSON using Reddit's API, as after all, if you go to a link like [https://www.reddit.com/r/soccer/hot.json](https://reddit.com/r/soccer), you get all the data returned back in JSON, right? Well, I intially thought about doing this but I needed to process a lot of the data as the JSON data wasn't quite giving me everything I wanted. For example, a while ago Reddit stopped downvotes from being visible on posts and consequently the API stopped providing this too. But we can calculate the number of downvotes using some other data properties we get back from the API. Again, we could just do this in Vue using Javascript but I like the idea of seperating our API and the processing we perform on the raw data from our frontend - Vue is simply going to consume our API and all the dirty work will be done in Python and Flask. Then we'll send nice clean data to our frontend and all we have to worry about in Vue is displaying it. 

So how do we get data from Reddit in Python? If you don't know already, Python has a very nice API wrapper called [PRAW](https://praw.readthedocs.io/en/stable/). It is available for anyone to use with a Reddit account, but you will need to setup a client ID and a client secret which I'm not going to go through in this post. Getting posts is dead simple. 

```python

```

