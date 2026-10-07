// import readdir to allow us to read the contents of a given directory
// import writeFile to allow us to write data to a file
import { readdir, writeFile } from 'node:fs/promises';


// declare the relative directory path with the images
const directory = 'assets/toys';


// creates an array containing only image filenames (PNG, JPG/JPEG, WebP, or GIF) found in the specified directory.
// filter is in regular expression
// .test is a built-in method to test for a match in a string
const files = (await readdir(directory))
  .filter((file) => /\.(png|jpe?g|webp|gif)$/i.test(file));


// declare new variable toys
const toys = files.map((file) => {
  // uses regular expression to remove the file extensions
  const slug = file.replace(/\.[^.]+$/, '');
  // continues formatting …
  const name = slug
    // split up words with hyphens in between into separate words
    .split('-')
    // capitalizes the first letter of each word 
    .map((word) => word[0].toUpperCase() + word.slice(1))
    // join separated words together
    .join(' ');


  // return name, detail (as blank) and image 
  return {
    name,
    detail: '',
    image: `${directory}/${file}`
  };
});


// converts JavaScript object/arrary into a JSON string
// JSON.stringify expects 3 arguments: value, replacer and space
// null for replacer means no values are modified during conversion
// space refers to indentation 
await writeFile('data/toys.json', JSON.stringify(toys, null, 2));
