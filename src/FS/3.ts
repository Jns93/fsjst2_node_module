import fs from "fs/promises";

async function write () {
	const text: string[] = [];
	text.push("Clean Code;Robert Martin;59");
	text.push("Working Effectively with Legacy Code;Michael Feathers;99");
	text.push("Implementing Domain-Driven Design;Vaughn Vernon;79");
	fs.writeFile("./file.csv", text.join("\n"));
}

write();