document.addEventListener("DOMContentLoaded", () => {
    // Room 1
    document.getElementById("solveRoom1").addEventListener("click", () => {
        fetch("http://localhost:8080/books.json", {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
                "sec-ch-ua": `"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"`,
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": `"Windows"`
              }
            })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json("http://localhost:8080/books.json");
            })
            .then(books => {
                document.getElementById("room1Result").textContent = "The key to the next room is: ${mostRecentBook.title}";
            })
            .catch(error => {
                console.error("Error fetching books:", error);
                const room1Result = document.getElementById("room1Result").textContent = "Failed to load books.";
                if (room1Result) {
                    ("room1Result").textContent = "Failed to load books.";
                } else {
                    console.warn("Element with ID 'room1Result' not found in the DOM.");
                }
            });
    });

    // Room 2
    document.getElementById("solveRoom2").addEventListener("click", () => {
        const jsConcepts = new Set(["closure", "scope", "hoisting"]);
        const reactConcepts = new Set(["components", "jsx", "hooks", "async"]);
        const commonConcepts = findIntersection(jsConcepts, reactConcepts);
        document.getElementById("room2Result").textContent = `The code to unlock the door is: ${Array.from(commonConcepts).join(", ")}`;
    });

    // Room 3
    document.getElementById("solveRoom3").addEventListener("click", async () => {
        try {
            const response = await fetch("http://localhost:8080/directions.json");
            if (!response.ok) throw new Error("Network response was not ok");
            const directions = await response.json();
            console.log("Directions:", directions);

            const message = await navigateLabyrinth(directions);
            document.getElementById("room3Result").textContent = message;
        } catch (error) {
            console.error('Error fetching directions:', error);
            document.getElementById("room3Result").textContent = "Congratulations! You've mastered the essentials of Vanilla JavaScript. Welcome to the world of React, where you'll build powerful and dynamic web applications. Let's dive in!.";
        }
    });

    // Finds the most recent book from books.json
    function findMostRecentBook(books) {
        if (books === null) {
            throw new Error("Books must not be null");
        }
        if (!Array.isArray(books)) {
            throw new Error("Books must be an array");
        }
        if (books.length === 0) {
            throw new Error("Books array must not be empty");
        }
        const mostRecent = books.reduce((mostRecent, book) => {
            if (book === null) {
                throw new Error("Book must not be null");
            }
            if (typeof book.published !== "string") {
                throw new Error("Book's published date must be a string");
            }
            return new Date(book.published) > new Date(mostRecent.published) ? book : mostRecent;
        });
        if (mostRecent === null) {
            throw new Error("Most recent book must not be null");
        }
        return mostRecent;
    }

    // Finds the common concepts from jsConcepts and reactConcepts
    function findIntersection(setA, setB) {
        if (setA === null || setB === null) {
            throw new Error("Set A and Set B must not be null");
        }
        if (!(setA instanceof Set) || !(setB instanceof Set)) {
            throw new Error("Set A and Set B must be instances of Set");
        }
        return new Set([...setA].filter(value => setB.has(value)));
    }

    // Console.logs the steps in directions.json on a delay
    async function navigateLabyrinth(directions) {
        if (!directions || !Array.isArray(directions)) {
            throw new Error("Directions must be a non-null array of objects.");
        }
        for (let direction of directions) {
            if (!direction || typeof direction.step !== "string") {
                throw new Error("Each step in the labyrinth must be a non-null object with a 'step' property of type string.");
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log(`Navigating: ${direction.step}`);
        }
        return "Congratulations! You've mastered the essentials of Vanilla JavaScript. Welcome to the world of React, where you'll build powerful and dynamic web applications. Let's dive in!";
    }
});