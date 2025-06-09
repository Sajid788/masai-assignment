// 1. Check if two strings are anagrams
function areAnagrams(str1, str2) {
  return str1.split('').sort().join('') === str2.split('').sort().join('');
}

// 2. Flatten a nested array 
function flattenOnce(arr) {
  return arr.flat();
}

// 3. Find the longest word in a sentence
function longestWord(sentence) {
  return sentence.split(' ').reduce((longest, word) =>
    word.length > longest.length ? word : longest
  , "");
}

// 4. Capitalize the first letter of every word
function capitalizeWords(sentence) {
  return sentence
    .split(' ')
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

// 5. Return common elements from two arrays
function commonElements(arr1, arr2) {
  return arr1.filter(item => arr2.includes(item));
}

// Sample usage
console.log("1. Are Anagrams:", areAnagrams("listen", "silent"));          // true
console.log("2. Flatten Once:", flattenOnce([1, [2, 3], 4, [5, 6]]));      // [1, 2, 3, 4, 5, 6]
console.log("3. Longest Word:", longestWord("The quick brown fox jumps")); // "jumps"
console.log("4. Capitalized:", capitalizeWords("hello world"));            // "Hello World"
console.log("5. Common Elements:", commonElements([1, 2, 3, 4], [3, 4, 5, 6])); // [3, 4]
