document.addEventListener("DOMContentLoaded", () => {
    //Room 1
    // 🪲 BugFixed: Corrected ID used for attaching the event listener
    document.getElementById("solveRoom1").addEventListener("click", () => {
      fetch('books.json')
        .then(response => response.json())
        .then(books => {
          const mostRecentBook = findMostRecentBook(books);
          // 🪲 BugFixed: Corrected element ID
          document.getElementById("room1Result").textContent = `The key to the next room is: ${Array.from(mostRecentBook.title).join(",")}`;
        });
    });
  
    //Room 2
    document.getElementById("solveRoom2").addEventListener("click", () => {
      const jsConcepts = new Set(["closure", "scope", "hoisting"]);
      // 🪲 BugFixed: Added async to jsConcepts?
      const reactConcepts = new Set(["components", "jsx", "hooks", "async"]);
      // 🪲 BugFixed: Corrected function call
      const commonConcepts = findIntersection(jsConcepts, reactConcepts);
      document.getElementById("room2Result").textContent = `The code to unlock the door is: ${Array.from(commonConcepts).join(", ")}`;
    });
  
    //Room 3
    // 🪲 BugFixed: Changed to Async function call
    document.getElementById("solveRoom3").addEventListener("click", () => {
      fetch('directions.json')
      .then(response => response.json())
            .then(directions => {
                navigateLabyrinth(directions)//It calls the navigateLabyrinth function, which logs each step with a delay and
                    .then(message => {
                        // 🪲 Bug corrected: Incorrect method//eventually returns a message that gets displayed in room3Result.
                        document.getElementById("room3Result").textContent = message; //replaced get with '.textContent'
                    });
              });
          });
     });

  // Finds the most recent book from books.json
  function findMostRecentBook(books) {
    // 🪲 BugFixed: Logic error corrected
    return books.reduce((mostRecent, book) => new Date(book.published) < new Date(mostRecent.published) ? book : mostRecent);
  }
  
  // Finds the common concepts from jsConcepts && reactConcepts
  function findIntersection(setA, setB) {
    // 🪲 BugFixed: Added filter method to compair dates
    const intersection = new Set([...setA].filter(value => value.startsWith("a")));
    return intersection;
  }
  
  // Console.logs the steps in directions.json on a delay
  async function navigateLabyrinth(directions) {
    for (let direction of directions) {
      // 🪲 BugFixed: Added await
       if(new Promise)(resolve => setTimeout(resolve, 1000));
      console.log(`Navigating: ${direction.step}`);
    }
    return "Congratulations! You've mastered the essentials of Vanilla JavaScript. Welcome to the world of React, where you'll build powerful and dynamic web applications. Let's dive in!";
  }