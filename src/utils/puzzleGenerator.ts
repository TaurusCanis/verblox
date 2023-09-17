

// an algorithm that generates an array of n words that are n characters
// long such that the first letter of each word forms a valid English word,
// the second letter of each word forms a valid English word, and so on.

// ["bad", "ago", "get"]

  const wordList = [
    'ace', 'act', 'age', 'ago', 'air', 'all', 'and', 'ape', 'apt', 'are', 'arm', 'art', 'ask', 'ate', 'bad', 'bag', 'bat',
    'bed', 'bee', 'big', 'bit', 'boa', 'box', 'boy', 'bug', 'bus', 'but', 'buy', 'bye', 'cab', 'can', 'cap', 'car', 'cat',
    'cub', 'cut', 'dad', 'dam', 'day', 'den', 'did', 'dip', 'dog', 'dot', 'ear', 'eat', 'egg', 'elf', 'end', 'eye', 'far',
    'fat', 'few', 'fin', 'fir', 'fit', 'fix', 'fly', 'for', 'fox', 'fry', 'fun', 'gag', 'gas', 'gel', 'get', 'god', 'got',
    'gum', 'gun', 'gut', 'had', 'has', 'hat', 'hen', 'her', 'hey', 'his', 'hit', 'hot', 'how', 'ill', 'ink', 'jam', 'jar',
    'jet', 'job', 'jog', 'jug', 'kit', 'lab', 'lad', 'lay', 'leg', 'let', 'lid', 'lit', 'lot', 'mad', 'man', 'map', 'mat',
    'met', 'mix', 'mom', 'mud', 'mug', 'mum', 'nap', 'net', 'new', 'nod', 'not', 'now', 'nut', 'oar', 'odd', 'off', 'old',
    'one', 'our', 'out', 'owl', 'own', 'pad', 'pat', 'paw', 'peg', 'pen', 'pet', 'pew', 'pig', 'pin', 'pit', 'pop', 'pot',
    'pup', 'put', 'rag', 'ram', 'ran', 'rap', 'rat', 'raw', 'rob', 'row', 'rub', 'run', 'sad', 'saw', 'say', 'sea', 'see',
    'set', 'she', 'sit', 'sob', 'son', 'sow', 'soy', 'sty', 'sub', 'sum', 'sun', 'tab', 'tan', 'tap', 'tar', 'tea', 'ten',
    'the', 'tie', 'tin', 'tip', 'toe', 'top', 'toy', 'try', 'tub', 'tug', 'two', 'van', 'vet', 'war', 'was', 'way', 'web',
    'wed', 'wet', 'who', 'why', 'wig', 'win', 'won', 'wow', 'yak', 'yes', 'yet', 'yon', 'you', 'zap', 'zip', 'zoo'
];

class TrieNode {
    children: Record<string, TrieNode>;
    isWord: boolean;

    constructor() {
      this.children = {};
      this.isWord = false;
    }
  }
  
class Trie {
    root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    insert(word: string) {
        let node = this.root;
        for (const char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isWord = true;
    }

    search(word: string) {
        let node = this.root;
        for (const char of word) {
        if (!node.children[char]) {
            return false;
        }
        node = node.children[char];
        }
        return node.isWord;
    }

    getWordsExcluding(triedWords: Set<string>, prefix: string): string[] {
        let node = this.root;
        
        // Step 1: Navigate to the prefix node
        for (const char of prefix) {
            if (!node.children[char]) {
                return [];  // Prefix not found in the trie
            }
            node = node.children[char];
        }

        // Step 2 & 3: Perform recursive depth-first search to find all words
        let words: string[] = [];
        function dfs(currentNode: TrieNode, path: string) {
            if (currentNode.isWord && !triedWords.has(path)) {
                words.push(path);
            }
            for (const [char, nextNode] of Object.entries(currentNode.children)) {
                dfs(nextNode, path + char);
            }
        }
        dfs(node, prefix);

        return words;
    }

    getWordFromTrie(beginsWith: string, length: number): string | null {
        let node = this.root;
        for (const char of beginsWith) {
            if (!node.children[char]) {
                return null;
            }
            node = node.children[char];
        }

        let word = beginsWith;
        while (node.isWord !== true) {
            const childrenKeys = Object.keys(node.children);
            if (childrenKeys.length === 0) {
                return null;
            }

            const randomChildKey = childrenKeys[Math.floor(Math.random() * childrenKeys.length)];
            word += randomChildKey;
            node = node.children[randomChildKey];
        }

        if (word.length !== length) {
            return null;
        }

        return word;
    }
}

const N = 3;
const trie = new Trie();
wordList.forEach((word) => trie.insert(word));
const FIRST_WORD = "cat";
const words = ["", "", ""];

function getRandomWord(length: number) {
    console.log("length: ", length)
    return wordList[Math.floor(Math.random() * wordList.length)];
}

function getWordFromTrie(beginsWith: string, length: number) {
    return trie.getWordFromTrie(beginsWith, length);
}

function getWordThatBeginsWith(prefix: string, length: number, triedWords: Set<string> | null) {
    console.log("PREFIX: ", prefix);
    if (triedWords === null) triedWords = new Set<string>();
    if (prefix === "") {
        const word = getRandomWord(length);
        triedWords.add(word);
        return word;
    }
    const availableWords = trie.getWordsExcluding(triedWords, prefix);
    console.log("AVAILABLE WORDS: ", availableWords);
    let selectedWord = null;
    while (availableWords.length > 0 && !selectedWord) {
        const randomIndex = Math.floor(Math.random() * availableWords.length);
        const randomWord = availableWords[randomIndex];
        console.log("RANDOM WORD: ", randomWord);
        if (!triedWords.has(randomWord)) {
            console.log("!!!!!!!!!!!!!!!!!!!!ADDINGADDINGADDING!!!!!!!!!!!!!!!!!!!!")
            selectedWord = randomWord;
        }
        triedWords.add(randomWord);
        availableWords.splice(randomIndex, 1);
    }
    // const selectedWord = getWordFromTrie(prefix, length);
    console.log("SELECTED WORD: ", selectedWord);
    return selectedWord;
}

function addVerticalLetters(words: string[], letters: string, index: number) {
    console.log("WORDS: ", words)
    console.log("LETTERS TO ADD: ", letters)
    for (let i = 0; i + index < words.length; i++) {
        words[index + i] += letters[i];
    }
}

function buildEmptyArray() {
    return ["", "", ""];
}

function buildEmptyTriedWords(N: number) {
    return Array.from({ length: N }, () => new Set<string>());
}

function clearSets(setsArray: Set<any>[]): void {
    for (let i = 1; i < setsArray.length; i++) {
        setsArray[i].clear();
    }
}

function buildPuzzle(words: string[], index: number, size: number, history: string[][]) {
    let iteration = 0;
    const maxIterations = 1000;
    const triedWords = buildEmptyTriedWords(size);

    if (history.length === 0) clearSets(triedWords);

    while (words[size - 1].length !== size) {
        console.log("\n************************************\n")
        console.log("INDEX: ", index)
        console.log("TRIED WORDS: ", triedWords)
        if (iteration++ > maxIterations) {
            throw new Error('Max iterations reached');
        }

        console.log("HISTORY: ", history);
        console.log("current words: ", words)
        const wordsCopy = [...words];
        const horizontalWordStart = wordsCopy[index]; //wordsCopy.slice(0, index + 1).join("");
        console.log("HORIZONTAL WORD START: ", horizontalWordStart)
        let horizontalWord = getWordThatBeginsWith(horizontalWordStart, wordsCopy.length, triedWords[index]);
        console.log("triedWords[index]: ", triedWords[index])
        // while (horizontalWord && triedWords[index].has(horizontalWord)) {
        //     // Get a new horizontalWord because the current one has already been tried
        //     horizontalWord = getWordThatBeginsWith(horizontalWordStart, wordsCopy.length);
        //     if (horizontalWord) {
        //         console.log("ADD TO TRIED WORDS: ", horizontalWord)
        //         triedWords[index].add(horizontalWord);
        //     }
        // }

        // if (horizontalWord) {
        //     console.log("ADD TO TRIED WORDS: ", horizontalWord)
        //     triedWords[index].add(horizontalWord);
        // }
        
        console.log("HORIZONTAL WORD: ", horizontalWord)
        if (!horizontalWord) {
            history.pop();
            words = history.slice(-1)[0] || buildEmptyArray();
            index = Math.max(0, index - 1);
            continue;
        }
        wordsCopy[index] = horizontalWord;
        const verticalWordStart = wordsCopy.slice(0, index + 1).map(word => word[index]).join("");
        console.log("VERTICAL WORD START: ", verticalWordStart);
        const verticalWord = getWordThatBeginsWith(verticalWordStart, wordsCopy.length, null);
        console.log("VERTICAL WORD: ", verticalWord)
        if (!verticalWord) {
            history.pop();
            words = history.slice(-1)[0] || buildEmptyArray();
            index = Math.max(0, index - 1);
            continue;
        }
        addVerticalLetters(wordsCopy, verticalWord.slice(index + 1), index + 1);
        history.push(wordsCopy);

        // If a valid word is found, move on to the next index
        if (horizontalWord && verticalWord) {
            index += 1;
            words = wordsCopy;
        } else {
            // Otherwise, backtrack to the previous index
            history.pop();
            words = history.slice(-1)[0] || buildEmptyArray();
            index = Math.max(0, index - 1);
        }
    }

    return words;
}

// function buildPuzzleRecursive(words: string[], index: number, size: number, history: string[][]) {
//     console.log("\n************************************\n")
//     console.log("HISTORY: ", history);
//     console.log("current words: ", words)
//     if (words[size - 1].length === size) return words;
//     const wordsCopy = [...words];
//     const horizontalWordStart = wordsCopy[index]; //wordsCopy.slice(0, index + 1).join("");
//     console.log("HORIZONTAL WORD START: ", horizontalWordStart)
//     const horizontalWord = getWordThatBeginsWith(horizontalWordStart, wordsCopy.length);
//     console.log("HORIZONTAL WORD: ", horizontalWord)
//     if (!horizontalWord) {
//         // const prevHistoryState = history.pop() || buildEmptyArray();
//         history.pop();
//         return buildPuzzle(history.slice(-1)[0] || buildEmptyArray(), Math.max(0, index - 1), size, history);
//     }
//     wordsCopy[index] = horizontalWord;
//     const verticalWordStart = wordsCopy.slice(0, index + 1).map(word => word[index]).join("");
//     console.log("VERTICAL WORD START: ", verticalWordStart);
//     const verticalWord = getWordThatBeginsWith(verticalWordStart, wordsCopy.length,);
//     console.log("VERTICAL WORD: ", verticalWord)
//     if (!verticalWord) {
//         // const prevHistoryState = history.pop() || buildEmptyArray();
//         history.pop();
//         return buildPuzzle(history.slice(-1)[0] || buildEmptyArray(), Math.max(0, index - 1), size, history);
//     }
//     addVerticalLetters(wordsCopy, verticalWord.slice(index + 1), index + 1);
//     history.push(wordsCopy);
//     return buildPuzzle(wordsCopy, index + 1, size, history);
// }

const puzzleResult = buildPuzzle(words, 0, N, []);

function testBuildPuzzle() {
    // Test 1: Verify that the puzzle is built correctly
    const words = [FIRST_WORD, "", ""];
    const result = buildPuzzle(words, 0, N, []);
    console.log("Test 1 - Puzzle Result:", result);
    // You would then manually verify the result to see if it meets the criteria

    // Test 2: Test the Trie class's insert and search methods
    trie.insert("test");
    console.log("Test 2 - Trie search for existing word:", trie.search("test")); // Should print: true
    console.log("Test 2 - Trie search for non-existing word:", trie.search("nonexistent")); // Should print: false

    // Test 3: Test the getRandomWord function
    console.log("Test 3 - Get random word of length 3:", getRandomWord(3)); // Should print a random word of length 3
}

testBuildPuzzle();

// this should probably be a while loop.
// for (let i = 1; i <= N; i++) {
//     const word = getWordThatBeginsWith(FIRST_WORD.slice(0, i));
//     if (i % 2 === 1) appendHorizontalWord(word.slice(i), i);
//     else appendVerticalWord(word.slice(i), i);
// }

//     0 1 2
//     ----- 
// 0 | 0 1 2
// 1 | 0 1 2
// 2 | 0 1 2

// 1: ["bad", "a", "g"]
// 2: ["bad", "ago", "ge"]
// 3: ["bad", "ago", "get"]