import { Character } from "@/app/types";
import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";

// Batch import all JSON files
const getAllCharacters = (): Character[] => {
  const charactersDir = path.join(process.cwd(), "data/nightfarers");
  const filenames = fs.readdirSync(charactersDir).filter((f) => f.endsWith(".json"));
  const characters: Character[] = [];

  for (const filename of filenames) {
    try {
      const filePath = path.join(charactersDir, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const character = JSON.parse(fileContents) as Character;
      // Basic validation
      if (character.name) {
        // Check if sprite.png exists
        const imagePath = path.join(
          process.cwd(),
          "public",
          "img",
          character.name.toLowerCase(),
          "sprite.png"
        );
        character.img = fs.existsSync(imagePath)
          ? `/img/${character.name.toLowerCase()}/sprite.png`
          : "/img/placeholder.png";
        characters.push(character);
      } else {
        console.warn(`Invalid character data in ${filename}, skipping.`);
      }
    } catch (error) {
      console.error(`Error reading ${filename}:`, error);
    }
  }

  return characters;
};

export default async function NightfarersPage() {
  const characters = getAllCharacters();

  if (!characters.length) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Nightfarers</h1>
        <p>No characters found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Nightfarers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        {characters.map((character) => (
          <Link
            href={`/nightfarers/${character.name.toLowerCase()}`}
            key={character.name}
            className="border rounded-lg p-4 transition"
          >
            <div className="flex flex-col items-center">
              <Image
                src={character.img}
                alt={character.name}
                width={200}
                height={200}
                className="object-contain mb-2"
              />
              <h2 className="text-xl font-semibold text-blue-600 hover:underline">
                {character.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}