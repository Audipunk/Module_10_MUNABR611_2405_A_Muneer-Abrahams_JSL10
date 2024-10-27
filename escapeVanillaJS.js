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
                    room1Result.textContent = "Failed to load books.";
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
});

    // Finds the most recent book from books.json
    function findMostRecentBook(books) {
        // 🪲 Bug: Logic error FIXED
        return books.reduce((mostRecent, book) => new Date(book.published) > new Date(mostRecent.published) ? book : mostRecent);
    }
    
    function findIntersection(setA, setB) {
        // 🪲 Bug: Incorrect logic FIXED
        const intersection = new Set([...setA].filter(item => setB.has(item)));
        return intersection;
    }
    
    async function navigateLabyrinth(directions) {
        for (let direction of directions) {
            // 🪲 Bug: No delay FIXED
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log(`Navigating: ${direction.step}`);
        }
        return "Congratulations! You've mastered the essentials of Vanilla JavaScript. Welcome to the world of React, where you'll build powerful and dynamic web applications. Let's dive in!";
    }