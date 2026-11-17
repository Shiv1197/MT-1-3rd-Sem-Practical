const BASE_URL = 'http://localhost:3000/api/books';

async function testAPI() {
  console.log('Testing Set A: Library Book Management API...\n');

  try {
    const res1 = await fetch(BASE_URL);
    console.log('1. GET /api/books (Status:', res1.status, ')');
    console.log(await res1.json(), '\n');

    const res2 = await fetch(`${BASE_URL}/filter?author=paulo`);
    console.log('2. GET /api/books/filter?author=paulo (Status:', res2.status, ')');
    console.log(await res2.json(), '\n');

    const res3 = await fetch(`${BASE_URL}/101`);
    console.log('3. GET /api/books/101 (Status:', res3.status, ')');
    console.log(await res3.json(), '\n');

    const newBook = {
      title: "The Discovery of India",
      author: "Jawaharlal Nehru",
      genre: "History",
      publishedYear: 1946,
      available: true
    };
    const res4 = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBook)
    });
    const createdBook = await res4.json();
    console.log('4. POST /api/books (Status:', res4.status, ')');
    console.log(createdBook, '\n');

    const updateData = {
      title: "The Alchemist – Revised Edition",
      author: "Paulo Coelho",
      genre: "Fiction",
      publishedYear: 1988,
      available: true
    };
    const res5 = await fetch(`${BASE_URL}/102`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    });
    console.log('5. PUT /api/books/102 (Status:', res5.status, ')');
    console.log(await res5.json(), '\n');

    const res6 = await fetch(`${BASE_URL}/${createdBook.id}`, {
      method: 'DELETE'
    });
    console.log(`6. DELETE /api/books/${createdBook.id} (Status:`, res6.status, ')');
    console.log(await res6.json(), '\n');

    const res7 = await fetch(`${BASE_URL}/999`);
    console.log('7. GET /api/books/999 (Status:', res7.status, ')');
    console.log(await res7.json(), '\n');

    const res8 = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: "Incomplete Data" })
    });
    console.log('8. POST /api/books invalid body (Status:', res8.status, ')');
    console.log(await res8.json(), '\n');

    console.log('All endpoint tests executed successfully!');
  } catch (err) {
    console.error('Error running tests. Is the server running? Run "npm start" first.');
  }
}

testAPI();
