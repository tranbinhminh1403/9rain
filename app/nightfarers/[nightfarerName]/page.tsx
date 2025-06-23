import { Character } from "@/app/types";
import fs from "fs";
import path from "path";
import Image from "next/image";
import { DataTable } from "@/components/custom/DataTable";
import { CustomAccordion } from "@/components/custom/customAccordion";
import { ThemeChange } from "@/components/custom/ThemeChange";
import SafeHTML from "@/components/custom/sanitized";

type Params = {
  nightfarerName: string;
};
type Props = {
  params: Promise<Params>;
};

// Preload all character data during build
const getAllCharacters = (): Record<string, Character> => {
  const charactersDir = path.join(process.cwd(), "data/nightfarers");
  const filenames = fs.readdirSync(charactersDir).filter((f) => f.endsWith(".json"));
  const characters: Record<string, Character> = {};

  console.log("Available files:", filenames); // Debug
  for (const filename of filenames) {
    try {
      const filePath = path.join(charactersDir, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const character = JSON.parse(fileContents) as Character;
      if (character.name) {
        const key = filename.replace(".json", "").toLowerCase(); // Normalize to lowercase
        characters[key] = character;
        console.log(`Loaded ${filename}:`, character.name); // Debug
      } else {
        console.warn(`Invalid character data in ${filename}, skipping.`);
      }
    } catch (error) {
      console.error(`Error reading ${filename}:`, error);
    }
  }

  return characters;
};

// Generate static params
export async function generateStaticParams() {
  const charactersDir = path.join(process.cwd(), "data/nightfarers");
  const filenames = fs.readdirSync(charactersDir).filter((f) => f.endsWith(".json"));
  console.log("Generated params:", filenames.map((f) => f.replace(".json", "").toLowerCase())); // Debug
  return filenames.map((filename) => ({
    nightfarerName: filename.replace(".json", "").toLowerCase(), // Lowercase URLs
  }));
};

// Server Component
export default async function CharacterPage({ params }: Props) {
  const data = await params;
  const nightfarerName = data?.nightfarerName?.toLowerCase(); // Normalize to lowercase
  if (!nightfarerName) {
    return (
      <div>
        <h1>Error</h1>
        <p>Invalid character name.</p>
      </div>
    );
  }

  // Get preloaded character data
  const characters = getAllCharacters();
  const character = characters[nightfarerName];

  if (!character) {
    console.error(`Character not found: ${nightfarerName}`); // Debug
    return (
      <div>
        <h1>Error</h1>
        <p>Character {nightfarerName} not found or invalid data.</p>
      </div>
    );
  }

  const scalingArray = ["Scaling", ...character.scaling];

  return (
    <div className="w-[80%] mx-auto">
      <ThemeChange />
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="w-full flex flex-col items-center">
          <h1>{character.name}</h1>
          <Image
            src={`/img/${nightfarerName}/sprite.png`} // Adjust case if needed
            alt={character.name}
            width={250}
            height={250}
          />
        </div>
        <div className="w-full">
          <h2>Abilities</h2>
          <CustomAccordion
            data={character.abilities.map((ability, index) => ({
              triggerContent: (
                <>
                  <Image
                    src={`/img/${nightfarerName}/s${index + 1}.png`} // Adjust case if needed
                    alt={character.name}
                    width={50}
                    height={50}
                    className="w-12 h-12"
                  />
                  <p className="w-full">{ability.name}</p>
                  <p className="w-full">{ability.description}</p>
                </>
              ),
              content: ability.note ? <SafeHTML html={ability.note} /> : null,
            }))}
          />
        </div>
      </div>
      <CustomAccordion
        defaultOpen
        data={[
          {
            triggerContent: "Stats",
            content: (
              <DataTable
                isColumnWidthEqual={true}
                header={["", ...character.stat_array.map((stat) => stat.toUpperCase())]}
                body={[
                  scalingArray,
                  ...character.stat.map((stat, index) =>
                    ["Level " + (index + 1), ...stat].map((value) => value.toString())
                  ),
                ]}
              />
            ),
          },
        ]}
      />
    </div>
  );
}