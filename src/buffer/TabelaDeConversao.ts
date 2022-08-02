const buffer = Buffer.from("João");
console.log(buffer); //Retorna o hexadecimal dos binarios gerados pelo encoding passado

const bufferInAsccii = Buffer.from("João", "ascii");
console.log(bufferInAsccii);

const bufferInUTF8 = Buffer.from("João", "utf8");
console.log(bufferInUTF8);

const bufferInLatin1 = Buffer.from("João", "latin1"); //encoding em unicode
console.log(bufferInLatin1.toString("utf8")); // lendo em uft8 (saira quebrado)

