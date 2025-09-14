import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getCategories = async (req, res) => {
    const categories = JSON.parse(
        fs.readFileSync(path.join(__dirname, "../data/category.json"), "utf-8")
    );
    
    res.status(200).json(categories);
};
