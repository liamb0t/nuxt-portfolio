---
title: Making an Evolutionary Game Theory Visualizer in Vanilla JS
dates:
    published: "2023-12-24"
---

A while ago when I started learning Javascript for the first time I wanted to create a visualizer 
that simulated various games from game theory, where you could tweak and change parameters on the fly. 
I had already begun working on this sort of thing at university in my final year as a grad student for my thesis, 
but it was only a single game (the Utlimatum game) that simply printed out the output as images using heatmaps from Matplotlib in Python. Since it was written in Python, it also meant trying to run the simulation on grids with thousands and thousands of agents at a time, which became painstakingly slow in comparison to a faster language, even JS. 

&nbsp;  

The project did lead to some cool exporations of other games that I probably shouldn't have been spending time on since they weren't really relevant to my research but nevertheless I stumbled across during my readings. One such simulation was this implemenation of the Prisoners Dilemma on a 2D grid by Nowak-May that leads to some interesting fractal patterns under certain conditions. I have a repo on my github that implemenents and produces the same results as the paper written in Python. 

&nbsp;  

As mentioned before however, Python was probably not a great choice of language especially since I wanted to run the simulations on extremely large grids and be able to adjust parameters on the fly without having to stop and re-execute the program everytime an adjustment was made. Thus, JS! I had been meaning to learn web-dev at some point and as a person who is very much a learn by doing kind of person, it was the perfect project to start off my journey into JS. With no special frameworks or ChatGPT to help at the time, I jumped right in and started looking at how to implement Conways Game of Life in JS as a simple jumping off point.

&nbsp;  

The great thing about these sort of programs or "celluar automata" is that once you learn how to implement one and you know the formula of how to write a grid, retreive an agents neighbours, update the grid and so on is that implementing new games with different rules becomes a breeze because they all sort of follow the same pattern. So learning how to write Conways Game of Life, a very simple celluar automata, that was really all the knowledge I needed to start experimenting with other games. The only key difference you have to watch out for when implementing a celluar automata that threw me off the first few times I started working with them is how you update the agents at the end of a life cycle. Is it synchronous or asynchronous? That is, do all agents update their strategies simultanously at the end of a life cycle or do they adjust their strategy immediately after playing a game? Because an agents strategy affects a neighbours strategy which affects their neighbours strategy which affects theirs neighbours strategy and so on, the synchronosity of the update rule must be taken into consideration if the game is to be implemented as expected. In fact, this years Advent of Code had a grid problem where I wasn't getting the intended result until I realised I was stupidly updating the grid asynchrously. I really should have spotted my error earlier given how many of these type of problems I've done before.

&nbsp;  
One way in Python to update an array synchrously is simple to make a copy of the original array and update the copy during play while using the information from the original array for the game. Then at the beginning or end of each generation (it may depend on your specific case) is just to swap the new grid with the old grid. In Python though most of the time you will need to make a deepcopy of the original, otherwise the original will also get modified and the synchronous update won't work. 

&nbsp;  
```python

# Won't work because grid_copy just references grid
grid = [agent for agent in range(10)]
grid_copy = grid

# Create a copy by using slices[::]
grid = [agent for agent in range(10)]
grid_copy = grid[::]

# Create a copy of the original using deepcopy
import deepcopy from copy

grid = [agent for agent in range(10)]
grid_copy = deepcopy(grid)

```

&nbsp;  
Implementing Conways Game of Life in JS was simple enough, but I wanted to do more with my visualizer. There were two parts that I wanted to do differently from others: 1. Do something cool with the grid. 2. Add lots of parameters the user can adjust! Most visualizers of celluar automata simply just draw the agents and strategies as squares of different colors and call it a day, but this isn't very pleasing visually. 

<div style="display: flex; flex-direction: row; align-items: center; justify-content: center; margin-top: 1rem">
    <figure>
        <img style="height: 22rem; width: 22rem; margin-right: 1rem; filter: brightness(1.5)" src="/img/game-theory/grid-basic.gif" />
        <figcaption style="text-align:center">Basic grid </figcaption>
    </figure>
</div>

&nbsp;  


First off, I wanted to add a transition effect when an agent changes their strategy so their colours would change smoothly and blend into their new strategies color. Since we can represent colors using RGB values that are just numbers from 0-255 for each red, green and blue value, I thought the simplest way was just to get the RGB values of the new strategy and increment (or decrement) the values of the old color until they equal the new colors RGB values. The faster or the bigger the value of the increment leads to a sharper or quicker transition, while a lower value, with 1 being the lowest, leads to a very slow and smooth transition. 

&nbsp;  
Here is the function I wrote in Javascript to do this:

```javascript
this.calcRGBcolor = transitionSpeed => {
        if (!this.strategyNew) {
            return;
        }

        const [r, g, b] = this.colorRGB;
        const newColor = colorDictRGB[this.strategyNew];

        this.colorRGB = [r + (newColor[0] - r > 0 ? 1 : -1) * transitionSpeed,
                            g + (newColor[1] - g > 0 ? 1 : -1) * transitionSpeed,
                            b + (newColor[2] - b > 0 ? 1 : -1) * transitionSpeed];

        return `rgb(${this.colorRGB[0]}, ${this.colorRGB[1]}, ${this.colorRGB[2]})`;
    };
```

&nbsp;  
Each agent has a `strategy` attribute that represents their current strategy and a `strategyNew` attribute that represents their new strategy if they have one. If they don't have one, we can simply exit the function since their color will be the same, so we don't have to draw them. If they do have a new color, we get the new color from the colors store and we simply just increment or decrement the old value mulitplied by the `transitionSpeed` argument. Then we return the new value as a string which we will use in our draw function to draw the agent on the canvas. Whether this is the best way or not to do this, probably not, but it works and was simple enough to implement. One could probably store the RGB values as three seperate attributes instead of an array and then can avoid using indexes for some cleaner code, but performance wise it doesn't matter. Regardless looking at the grid is alot easier on the eyes, especially when it becomes very chaotic. 

<div style="display: flex; flex-direction: row; align-items: center; justify-content: center; margin-top: 1rem">
    <figure>
        <img style="height: 22rem; width: 22rem; margin-right: 1rem; filter: brightness(1.5)" src="/img/game-theory/grid-with-transition.gif" />
        <figcaption style="text-align:center">Adding a transition effect when agents change strategies</figcaption>
    </figure>
</div>



&nbsp;  
The next thing I wanted to do to make the grid more interesting was add some kind of interaction beyond being able to to draw agents to the grid. This feature is purely aesthetic and at the time educational for me but neverthless provides a pretty cool user experience. When a user hovers over the grid with their mouse the agents around the mouse cursor will grow and when the user moves away from those agents they will shrink back to normal size, thus creating a cool trail effect. Basically to acheive this we just add an arbitrarily sized square boundary around our current mouse position and then agents check via their update function whether they are inside that boundary. If they are, they increase in size, and if not they, they shrink back to normal. In our update function we check this by checking the distance between the mouses `x, y` coords and the agents `x, y` coords and see if it falls within the range of our boundary:

&nbsp;  
```javascript
this.update = function() {
    if (drawMode === false) {
        //If the agent is inside the boundary, make the cell larger
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 
            && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.height < height && this.width < width) {
                this.height += 1;
                this.width += 1;
            }
        }
        else {
            //If the agent is outside the boundary, shrink cell size back to original
            if (this.height > height - 5 && this.width > width - 5) {
                this.height -= 0.3;
                this.width -= 0.3;
            }
        }
    }
```

&nbsp;  
So now agents colors will change smoothly and we've got some cool hover effects that don't really do anything but look cool nonetheless. But what I really wanted was to make the agents move around the grid as if they were really interacting as after all, that is what they are doing! To do this I did it as simply as I could think with some very basic random walking. Each cell would have an arbitrarily defined boundary around them and then move in a random direction each step as long as they are within that boundary. So we just get two random values `dx, dy` as the direction the cell will walk in and mutliply it by its step length. Then we check if the new direction is within the bounds of the cells boundaries which is created just by adding a new value to the existing `x, y` coordinates of the cell. If it is, then we walk in that direction: 

```javascript
            let dx = (Math.random() - 0.5) * step_length;
            let dy = (Math.random() - 0.5) * step_length;
            
            if (this.x + dx < this.originalX + wanderX && this.x + dx > this.originalX - wanderX) {
                this.x += dx;
            }
            if (this.y + dy < this.originalY + wanderY && this.y + dy > this.originalY - wanderY) {
                this.y += dy;
            }
```

<div style="display: flex; flex-direction: row; align-items: center; justify-content: center; margin-top: 1rem">
    <figure>
        <img style="height: 22rem; width: 22rem; margin-right: 1rem; filter: brightness(1.5)" src="/img/game-theory/grid-final.gif" />
        <figcaption style="text-align:center">Like little microbes under a microscope!</figcaption>
    </figure>
</div>

Very simple solution but it makes our grid appear much more dynamic and gives the illusion that the agents are actually moving about and interacting with each other! Also if we make the cell sizes smaller if gives the illusion that our grid is larger,  even though it is the same number of cells. 

&nbsp;  

That pretty much takes care of the grid side of things, there's alot more I could have done here but I was satisfied with it how it looked as is. So with the additions made to the grid complete, now I could move on the where the real fun begins: adding some parameters the user can adjust while running a simulation! Again there are infinite things one could do here and in the future I might add some more stuff, but originally there were just a few main things I wanted to do. One of the simplest things I could do is give the user the ability to choose the size of an agents neighbourhood. In the visualizer, there are two options, a neighbourhood of 4 or a neighbourhood of 8. Some games respond differently when the neighbourhood size is bigger and smaller and consequently different pattersn might emerge too. 

&nbsp;  

The implementation is pretty simple. Each agent has a findNeighbours method and an array of neighbours that gets intialized once when the game is created. We simply loop through each of the 8 possbile directions and find the new x, y coordinates, which is just the x, y coordinates of the agent plus the new direction. Then we find the agent at the new coordinates on the gameboard and push it to the agents neighbours.

```javascript
this.findNeighbours = function(gameBoard) {
        const directions = [
            [width, 0],
            [-width, 0],
            [0, height],
            [0, -height],
            [width, height],
            [-width, height],
            [width, -height],
            [-width, -height],
        ];
        
        for (const [dirX, dirY] of directions) {
            const targetX = this.x + dirX;
            const targetY = this.y + dirY;
    
            const neighbor = gameBoard.find(rect => rect.x === targetX && rect.y === targetY);
    
            if (neighbor) {
                this.neighbours.push(neighbor);
            }
        }
    };
```

When a user changes the value of the neighbourhood type, we can just update a global variable called neighbourhood type and then when we run the game, we just slice the array containing the coordinates of agents neighbours by the length of neighbours we want. 

The main thing I really wanted to use however was to allow the user to choose the rules that determine how an agent chooses to update their strategy at the end of each generation of play. In the visualizer there are three rules to choose from: a determinstic update, where agents strictly copy the best strategy in their neighbour. A probalistic update, where agents choose a random player in their neighbourhood and if that players strategy got a higher payoff, copy that strategy. And a biological update where the rules sort of mimic that of biology, not so much game theory.

The determinstic update is pretty straightfoward. We just loop through each neighbour and update the highest seen score. If a neighbour has a better score, we update the highscore and the strategy. We continue this for each neighbour and at the end compare if the agents strategy has a better score than the highest score of its neighbours. If it isn't the case, we set the agents new strategy to the strategy with the highest score. 

```javascript
this.updateDeterministic = function(agent) {
        let bestStrat = undefined;
        let highScore = 0;

        this.neighbours.forEach(neighbour => {
            if (neighbour.score > highScore) {
                highScore = neighbour.score;
                bestStrat = neighbour.strategy;
            }
        });
        if (agent.score < highScore) {
            agent.strategyNew = bestStrat;
        }
    }
```

The random update is a lot simpler because we don't need loop through each neighbour, we just select one random neighbour from the array of neighbours and compare its winnings to the agents winnings and update strategies accordingly.

```javascript
 this.updateRandomly = function(agent) {
        let neighbour = neighbours[Math.floor(Math.random() * neighbours.length)];
        if (agent.score < neighbour.score) {
            agent.strategyNew = neighbour.strategy;
        }
        else {
            agent.strategyNew = agent.strategy;
        }   
    }
```

The user can then toggle the update rule while the simulation is running without reseting the game! If the biological rule is chosen (not chosen) we toggle its display accordingly because some games have logic that's not eally compatible with this rule (for example, segregation).

```javascript
document.querySelector('#update-rules-menu').onchange = function() {
    updateRule = parseInt(this.value);
    if (updateRule === 2) {
        document.querySelector('#bio-proportions').style.display = 'block';
    }
    else {
        document.querySelector('#bio-proportions').style.display = 'none';
    }
}
```

<div style="display: flex; flex-direction: row; align-items: center; justify-content: center; margin-top: 1rem">
    <figure>
        <img style="height: 22rem; width: 22rem; margin-right: 1rem; filter: brightness(1.5)" src="/img/game-theory/update-normal.gif" />
        <img style="height: 22rem; width: 22rem; filter: brightness(1.5)" src="/img/game-theory/update-random.gif" />
        <figcaption style="text-align:center">Deterministic update vs probalistic update in Rock-Paper-Scissors</figcaption>
    </figure>
</div>


&nbsp;  
&nbsp;  

The effects of which update rule is used can really be seen the most in rock-paper-scissors! The deterministic version produces very square, uniform patterns while the probalistic update rule results in beautiful, swirly patterns!

So how do we use the update rule? At the end of a round of play, we need to loop through the gameboard and run the update rule on each agent that is playing the game (is not an empty cell). Notice in the previous code when we update an agents strategy in the update rules, we update the agents newStrategy attribute and not its strategy attribute because of the double buffering as mentioned earlier! Then we swap these two attributes and this keeps the gameboard in sync and does not cause any weird issues whilst we are updating the agents. For some reason and I can't remember why, I did it this way instead of building a copy of the gameboard and just swapping them. This would save having to loop through the array again and swap each strategy one by one but it is what is. Perhaps in the future I'll fix this. 

```javascript
this.updateStrategies = function(rect, updateRule) {
    if (updateRule === 0) {
        this.updateDeterministic(rect);
    }
    if (updateRule === 1) {
        this.updateRandomly(rect);
    }
    if (updateRule === 2) {
        this.updateBiological(rect);
    }
}

function animate() {
    if (start) {
        for (var i = 0; i < rectsArray.length; i++) {
            
            if (rectsArray[i].strategy != 'empty') {
                game.updateStrategies(rectsArray[i], updateRule);
            }
        }
    }
}
```

I'm not going to go through everything in the paramaters and game menu because some are pretty straightfoward like self-ineraction and the payoff slider. Apart from the update rules the other main component of the visualizers parameters are the population sliders that change the population distrubution of the game. Easier to do in Python with its built-in methods from the `random` library, in Javascript this required a bit more coding although I'm sure there are some libraries that could do this for you. 

So how do we update the population distribution? Say we want 33% agents playing rock, 33% agents playing scissors, 34% playing paper and 0% empty cells. We can create an array of probabilites `[0.33, 0.33, 0.34, .0]`and then using a distrubution, select a random strategy from the strategies array which contains all the strategies for a game. In the casenof RPS for example, it would look like `['rock', 'paper', 'scissors', 'empty',]`. So our population update function just takes in these two arrays as arguments. 

```javascript
function updatePopulationDistribution(probabilities, strategies) {
    const popDistribution = createDistribution(strategies, 
        probabilities, 
        10);
    rectsArray.forEach(rect => {
        const randomStrat = game.stratArray[randomIndex(popDistribution)];
        rect.strategy = randomStrat
        rect.color = colorDict[rect.strategy];
        rect.score = 0;
    });
}
```

To create our distribution, we can use this function that takes in `array`, the array of strategies, `weights`, the percentage of each strategy, and `size`, the length of the distrubtion array that gets returned. The function then returns an array of indexes matched to the weights we provided. We can use then use these indexes to select a strategy from our array of strategies. 


```javascript
createDistribution = (array, weights, size) => {
    const distribution = [];
    const sum = weights.reduce((a, b) => a + b);
    const quant = size / sum;
    for (let i = 0; i < array.length; ++i) {
        const limit = quant * weights[i];
        for (let j = 0; j < limit; ++j) {
            distribution.push(i);
        }
    }
    return distribution;
};

// For example, say we pass the following into the function:

    // array = ['rock', 'paper', 'scissors', 'empty']
    // weights = [0.33, 0.33, 0.34, .0]
    // size = 10

    // Output ---> [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2]

    // The output returns indexes that matches the weights we provided, in this case a third of each!

```