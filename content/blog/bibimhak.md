---
title: Bibimbap and AI - creating a better filesharing website for ESL teachers in South Korea
dates:
    published: "2023-12-24"
---
**bi·bim·bap**
/ˈbēbimˌbäp/
noun
*A Korean dish consisting of rice topped with sautéed vegetables, chili paste, and beef or other meat sometimes with the addition of a raw or fried egg.*

I created a file-sharing and community [website](https://bibimhak.com) for ESL teachers in South Korea and the name I chose for the site was inspired by this popular Korean dish. Bibim (비빔) in Korean means "mix". Before eating bibimbap you typically mix all the ingredients together. Hak (학) is the Chinese character written in Korean meaning "education" or "learning". You will see the character used in lots of Korean words relating to education or learning, like 학생 (student), 학교 (school), 학원 (a private education institution), and so on. 

So together bibimhak is:

**bibim** (to mix) + **hak** (learning/education) = **bibimhak**, a place where teachers mix, share and learn. 

There was already a popular filesharing website that existed at the time I made the website and a lot of teachers asked me: "why did you want to make your own website when there was already an established place for teachers to get their materials from?" To that there are two reasons why I wanted to build a new website. The first was personal and had nothing to do with the other site really: I was learning web development and I wanted to build my first full web application from the ground up, but I also wanted to provide some real world value while doing it (The jury is still out on the latter part with only around 150 users currently signed up after about 2 months ). But the project which took around 3 months to get to a deployable, production ready state certainly helped me learn a lot about building a full stack web app (and the pitfalls/virtues of not using using a Javascript framework. Vanilla JS can get messy when things grow if you're not careful). I could have just built a clone website of some popular web app and call it a day, and you could argue maybe I could have gained more or less the same knowledge. But I think knowing there would be actual end users using my site once I completed the project, who were from the same community as me and lived around me, kept me motivated in a way that might not have been true if I just made another Reddit or Facebook clone. And I think this led to a lot of self-learning and creativity. 

<div style="display: flex; flex-direction: row; align-items: center; justify-content: center; margin-top: 1rem;">
    <figure style="display: flex; flex-direction: column; align-items: center; justify-content: center">
        <img style="width: 80%;" src="/img/bibimhak/bibimhak.png" />
        <figcaption style="text-align:center">Bibimhak is a file-sharing and community platform for ESL teachers in South Korea. The name, logo and colors are inspired by the popular Korean dish called <i> bibimbap</i></figcaption>
    </figure>
</div>

&nbsp;  

Secondly, as much as the other websites that are around for teachers in Korea are useful, and there is a lot of materials to glean from them (I have gleaned many), I found the user experience on them ranged from awful to sometimes downright frustrating. Navigating materials and filtering materials were tedious as you had to click multiple links to get to the page you wanted to rather that simply just clicking the page you want from a dropdown or in a sidebar. And even when you did land on the page you wanted, pages are organized in a forum style, so you would have to scroll and read through each post on the page to find what you were looking for. No filters, nothing. Ugh! I hated it.

&nbsp;  

Bibimhak makes finding materials super effortless though. I wanted users to be able to find exactly what they are looking for with minimal effort. To this, I went for a minimalist design with a ton of filtering options. Materials users upload are organized by grade, textbook, lesson and kind of material (worksheet, game, review etc.). With this, teachers can narrow their search right down. No more excrutiating browsing through long posts on the forum! Hooray! Just select what you are you looking for from the dropdowns and viola. On top of that, users can order their search by likes, comments, date posted and by the teachers they are following. That's another cool feature! If you like another teachers' work, you can follow them and then browse materials by those teachers you like!

<div style="display: flex; flex-direction: row; align-items: center; justify-content: center; margin-top: 1rem;">
    <figure>
        <img style="height: 22rem; width: 100%;" src="/img/bibimhak/filter-menu.png" />
        <figcaption style="text-align:center">Bibimhak makes browing materials super effortless!</figcaption>
    </figure>
</div>

&nbsp;  

Creating materials is just as easy! When users create materials, I made it so that users are required to fill out a few fields so that searching for the materials would be a lot easier later. Also, I hoped this would lead to less effort having to moderate posts down the line. 

## Creating the tags for lessons and textbooks

Creating the tags for the lesson titles from each textbook as objects in my database was something I thought was going to be super tedious at first because I had to get all the lesson titles from each textbook. And there are a lot. Since there is elementary school, middle school and high school, (10 grades in total, English is taught from grade 3), with multiple textbooks depending on the level (elementary school uses about 6 different English textbooks, middle school uses 11 when I counted) with about 8-14 lessons per textbook depending on the textbook, it was a lot. But it turned out to actually be really fun because I used the power of ChatGPT to do all the input parsing for me! Hehe. 

Since all the textbook titles and lessons were already listed on another website, all I had to do was copy those into a file (luckily they were easily copyable) and then let ChatGPT do its magic. Sometimes ChatGPT can be hit or miss depending on the complexity of the task you ask it to perform, but I've found things like input parsing, formatting data structures and creating complex SQL database queries to be super useful! And in this case it certainly was!

So first thing I had to do was CTRL+C/CTRL+V the lessons and textbooks into a file. Honestly this was the part that took the most time but wasn't too bad, maybe 30 minutes or so. Once all the lessons were copied, I needed to decide on how the data would be arranged. Did I want to use just a plain txt file or csv format blah blah blah... Since the file would only be read once when the site is deployed and only again if there are new textbooks published (which only happens like every 5 years), I just opted for the simplest solution and made a text file with all the lessons and textbook data in it. Then I asked ChatGPT to format the file so it could be read again later when we run a function that will add all the raw data into SQL objects. To standardize the file, the first line is the level (elementary, middle school or highschool), grade, and publisher. Then each new line is the lesson number and the title of the lesson. Pretty simple!

```text
elementary,3,Cheonjae
Lesson 1: Hello
Lesson 2: Oh, It's a Ball!
Special 1
Lesson 3: Sit Down, Please
Lesson 4: How Many Apples?
Special 2
Lesson 5: I Have a Pencil
Lesson 6: What Color Is It?
Special 3
Review 1
Lesson 7: I Like Chicken
Lesson 8: It's Very Tall!
Special 4
Lesson 9: I Can Swim
Lesson 10: She's My Mom
Special 5
Lesson 11: Look! It's Snowing
Review 2
Multi-Lesson
```

So we have our file formatted nicely, now we need a function that will read the file, loop through each entry and add it to the database! Again I was lazy and decided to let ChatGPT do the work for me! I could have easily written this myself since doing input parsing in Python after many Advent of Code problems is kind of easy for me now, but why go through all that hassle when we can do it much less time. Hehe. Work smarter, not harder! I can't remember the exact prompt I gave ChatGPT but giving it an example to work with is often how I ask it to perform tasks. Like "Hey, this is what my data looks like, heres an example of a textbook entry, now go do this". 

```python
def update_textbooks_db():
    file_path = os.path.join(current_app.root_path, 'textbooks.txt')
    with open(file_path, 'r') as f:
        lines = f.read().split('\n\n')

        for textbook_data in lines:
            textbook_lines = textbook_data.split('\n')  
            level, grade, publisher = textbook_lines[0].split(',')  
            lesson_titles = textbook_lines[1:] 
            textbook = Textbook.query.filter_by(level=level, grade=grade, publisher=publisher).first()
            if not textbook:
                textbook = Textbook(level=level, grade=grade, publisher=publisher)
                db.session.add(textbook)
                db.session.flush() 

                for title in lesson_titles:
                    split_title = title.split(':', 1)[-1].strip()
                    lesson = Lesson(title=split_title, textbook_id=textbook.id)
                    db.session.add(lesson)
            else:
                for title in lesson_titles:
                    split_title = title.split(':', 1)[-1].strip()
                    lesson = Lesson.query.filter_by(title=split_title, textbook_id=textbook.id).first()
                    if not lesson:
                        lesson = Lesson(title=split_title, textbook_id=textbook.id)
                        db.session.add(lesson)

            db.session.commit()
```

It's not the prettiest thing in the world but it does the job. We split the file by empty lines to get each textbook. Then we can get the level, grade and publisher from the first line. After that we can just loop through each line, create a new `Lesson` instance and add it to the database. So there are two objects in total: Textbook and Lesson, where the two are related to each other. Also its important we check to see if the textbook already exists in the database when adding a new textbook. If we want to add a new textbook, all we have to do is add a new entry in the text file and call this function.

So that is how textbooks and lessons are created and added to the database. But how do we actually get the textbook lessons to display in our dropdowns when users are filtering materials or creating a new one? Well we can just make a route on the backend that will retrieve the lessons from the database using a basic query and return the data as JSON. We just need the level, grade and the publisher of the textbook and we can find the lessons. Then when just add an event listener on our dropdowns and make a call to this route.

```python
@materials.route("/get_lessons/<string:level>/<string:grade>/<string:publisher>")
@login_required
def get_lesson_choices(level, grade, publisher):
    textbook = Textbook.query.filter_by(publisher=publisher, level=level, grade=grade).first()
    lesson_choices = None

    if textbook:
        lesson_choices = [(lesson.id, lesson.title) for lesson in textbook.lessons]

    return jsonify({
        'lesson_choices': lesson_choices
    })
```

What we get back in JSON is an array of tuples containing the id of the lesson and the lesson title. The value of the choice is the lesson id and the options text to be displayed is the lesson title. 

Back in Javscript when we change a dropdown's value, we fetch the data from our database and once the promise is returned, we can just loop through the data and set the choices on the dropdown.

```js
function fetchLessons(level, grade, textbook) {
    fetch(`/get_lessons/${level}/${grade}/${textbook}`)  
    .then(response => response.json())
    .then(data => {
    if (data['lesson_choices']) {
      data['lesson_choices'].forEach(choice => {
        let option = document.createElement('option');
        let text = choice[1];
        if (text.length > 17) {
          text = text.substring(0, 15) + '...'
        }
        option.value = choice[0];
        option.text = text
        lessonDropdown.appendChild(option);
      });
    }
  })
}
```

<div style="display: flex; flex-direction: row; align-items: center; justify-content: center; margin-top: 1rem;">
    <figure>
        <img style="width: 100%;" src="/img/bibimhak/lessons.png" />
        <figcaption style="text-align:center">Yay! Browsing ideas for textbook lessons was never so easy.</figcaption>
    </figure>
</div>

&nbsp;
 
[Bibimhak](https://bibimhak.com) is a free filesharing and community website for current and future ESL teachers working in South Korea. If you would like to sign-up, you can do so [here](https://bibimhak.com/register). Or if you have any feedback about the website or would like to know more, you can send an email to me at support@bibimhak.com. 
