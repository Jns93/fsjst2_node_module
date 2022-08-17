import fs from "fs/promises";

async function read () {
	const data = await fs.readFile("books.csv", "utf8");
	console.log(data);
}

read();