const express = require("express");
const http = require("http");
const app = express();

app.use(express.static("./static"));

app.get("/", (req, res) => {
    return res.send(`
<html>
<head>
    <style>
        h1 {
            color: blue; 
        }
        div{
            font-size: 30px;
        }
        a{
            color: red;
        }
    </style>
</head>
<body>
    <h1>Lets see how we can make things dynamic here</h1>
    <div>Lets play guessing number game<a href="/guessingGame"> click here</a></div>
</body>
</html>
`);
});

app.get("/guessingGame", (req, res) => {
    const secretNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;
    res.send(`
    <html>
    <body>
    <style>
        h1{
            color: blue;
        }
        p{
            font-size: 30px;
        }
        div{
            font-size: 30px;
        }
        a{
            color: red;
        }
    </style>
    <body>
    <h1>Guess the Number Game</h1>
    <p>Guess a number between 1 and 100:</p>
    <input type="text" id="guessInput">
    <input type="submit" value="Submit" id="guessButton">
    <p id="message"></p>
    
    
        <script>
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        
        const guessInput = document.getElementById("guessInput");
        const guessButton = document.getElementById("guessButton");
        const message = document.getElementById("message");
        let attempts = 0;

        guessButton.addEventListener("click", checkGuess);

        function checkGuess() {
            const userGuess = parseInt(guessInput.value);
            attempts++;

            if (userGuess === randomNumber) {
                message.textContent = "Congratulations! You guessed the number in " + attempts + " attempts!";
                guessInput.disabled = true;
                guessButton.disabled = true;
                message.style.color = "green";
            } else if (userGuess < randomNumber) {
                message.textContent = "Try a higher number.";
                message.style.color = "red";
            } else {
                message.textContent = "Try a lower number.";
                message.style.color = "red";
            }

            guessInput.value = "";
            guessInput.focus();
        }
    </script>
        <div>Next step tell me who is the author of this quote? <a href="/guessQuote"> Click for the Quote</a></div>
    </body>
    </html>
    `);
});

app.get("/guessQuote", (req, res) => {
    res.send(
        `
        <html>
<head>
    <style>
        p{
            font-size: 30px;
            color: blue;
        }
        div{
            font-size: 30px;
        }
        a{
            color: red;
        }
        h1{
            color: blue;
        }
    </style>
</head>
<body>
<p>"What's in a name? That which we call a rose by any other name would smell as sweet"</p>
<div>And the last one <a href="/myCat"> enjoy my favourite cat </a></div>
        `
    );
});

app.get("/myCat", (req, res) => {
    res.send(
        `
<img src="https://www.litter-robot.com/media/magefan_blog/david-brooke-ragdoll_copy.jpg">
<h1>I hope you had fun! Have a nice day!</h1>
        `
    );
});

https: app.all("*", (req, res) => {
    res.status(404).send("Page not found");
});

const server = http.createServer(app);

const port = 8000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});
