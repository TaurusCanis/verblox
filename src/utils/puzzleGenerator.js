// an algorithm that generates an array of n words that are n characters
// long such that the first letter of each word forms a valid English word,
// the second letter of each word forms a valid English word, and so on.
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// ["bad", "ago", "get"]
var wordList = [
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
var TrieNode = /** @class */ (function () {
    function TrieNode() {
        this.children = {};
        this.isWord = false;
    }
    return TrieNode;
}());
var Trie = /** @class */ (function () {
    function Trie() {
        this.root = new TrieNode();
    }
    Trie.prototype.insert = function (word) {
        var node = this.root;
        for (var _i = 0, word_1 = word; _i < word_1.length; _i++) {
            var char = word_1[_i];
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isWord = true;
    };
    Trie.prototype.search = function (word) {
        var node = this.root;
        for (var _i = 0, word_2 = word; _i < word_2.length; _i++) {
            var char = word_2[_i];
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        return node.isWord;
    };
    Trie.prototype.getWordsExcluding = function (triedWords, prefix) {
        var node = this.root;
        // Step 1: Navigate to the prefix node
        for (var _i = 0, prefix_1 = prefix; _i < prefix_1.length; _i++) {
            var char = prefix_1[_i];
            if (!node.children[char]) {
                return []; // Prefix not found in the trie
            }
            node = node.children[char];
        }
        // Step 2 & 3: Perform recursive depth-first search to find all words
        var words = [];
        function dfs(currentNode, path) {
            if (currentNode.isWord && !triedWords.has(path)) {
                words.push(path);
            }
            for (var _i = 0, _a = Object.entries(currentNode.children); _i < _a.length; _i++) {
                var _b = _a[_i], char = _b[0], nextNode = _b[1];
                dfs(nextNode, path + char);
            }
        }
        dfs(node, prefix);
        return words;
    };
    Trie.prototype.getWordFromTrie = function (beginsWith, length) {
        var node = this.root;
        for (var _i = 0, beginsWith_1 = beginsWith; _i < beginsWith_1.length; _i++) {
            var char = beginsWith_1[_i];
            if (!node.children[char]) {
                return null;
            }
            node = node.children[char];
        }
        var word = beginsWith;
        while (node.isWord !== true) {
            var childrenKeys = Object.keys(node.children);
            if (childrenKeys.length === 0) {
                return null;
            }
            var randomChildKey = childrenKeys[Math.floor(Math.random() * childrenKeys.length)];
            word += randomChildKey;
            node = node.children[randomChildKey];
        }
        if (word.length !== length) {
            return null;
        }
        return word;
    };
    return Trie;
}());
var N = 3;
var trie = new Trie();
wordList.forEach(function (word) { return trie.insert(word); });
var FIRST_WORD = "cat";
var words = ["", "", ""];
function getRandomWord(length) {
    return wordList[Math.floor(Math.random() * wordList.length)];
}
function getWordFromTrie(beginsWith, length) {
    return trie.getWordFromTrie(beginsWith, length);
}
function getWordThatBeginsWith(prefix, length, triedWords) {
    console.log("PREFIX: ", prefix);
    if (triedWords === null)
        triedWords = new Set();
    if (prefix === "") {
        var word = getRandomWord(length);
        triedWords.add(word);
        return word;
    }
    var availableWords = trie.getWordsExcluding(triedWords, prefix);
    console.log("AVAILABLE WORDS: ", availableWords);
    var selectedWord = null;
    while (availableWords.length > 0 && !selectedWord) {
        var randomIndex = Math.floor(Math.random() * availableWords.length);
        var randomWord = availableWords[randomIndex];
        console.log("RANDOM WORD: ", randomWord);
        if (!triedWords.has(randomWord)) {
            console.log("!!!!!!!!!!!!!!!!!!!!ADDINGADDINGADDING!!!!!!!!!!!!!!!!!!!!");
            selectedWord = randomWord;
        }
        triedWords.add(randomWord);
        availableWords.splice(randomIndex, 1);
    }
    // const selectedWord = getWordFromTrie(prefix, length);
    console.log("SELECTED WORD: ", selectedWord);
    return selectedWord;
}
function addVerticalLetters(words, letters, index) {
    console.log("WORDS: ", words);
    console.log("LETTERS TO ADD: ", letters);
    for (var i = 0; i + index < words.length; i++) {
        words[index + i] += letters[i];
    }
}
function buildEmptyArray() {
    return ["", "", ""];
}
function buildEmptyTriedWords(N) {
    return Array.from({ length: N }, function () { return new Set(); });
}
function clearSets(setsArray) {
    for (var i = 1; i < setsArray.length; i++) {
        setsArray[i].clear();
    }
}
function buildPuzzle(words, index, size, history) {
    var iteration = 0;
    var maxIterations = 1000;
    var triedWords = buildEmptyTriedWords(size);
    if (history.length === 0)
        clearSets(triedWords);
    while (words[size - 1].length !== size) {
        console.log("\n************************************\n");
        console.log("INDEX: ", index);
        console.log("TRIED WORDS: ", triedWords);
        if (iteration++ > maxIterations) {
            throw new Error('Max iterations reached');
        }
        console.log("HISTORY: ", history);
        console.log("current words: ", words);
        var wordsCopy = __spreadArray([], words, true);
        var horizontalWordStart = wordsCopy[index]; //wordsCopy.slice(0, index + 1).join("");
        console.log("HORIZONTAL WORD START: ", horizontalWordStart);
        var horizontalWord = getWordThatBeginsWith(horizontalWordStart, wordsCopy.length, triedWords[index]);
        console.log("triedWords[index]: ", triedWords[index]);
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
        console.log("HORIZONTAL WORD: ", horizontalWord);
        if (!horizontalWord) {
            history.pop();
            words = history.slice(-1)[0] || buildEmptyArray();
            index = Math.max(0, index - 1);
            continue;
        }
        wordsCopy[index] = horizontalWord;
        var verticalWordStart = wordsCopy.slice(0, index + 1).map(function (word) { return word[index]; }).join("");
        console.log("VERTICAL WORD START: ", verticalWordStart);
        var verticalWord = getWordThatBeginsWith(verticalWordStart, wordsCopy.length, null);
        console.log("VERTICAL WORD: ", verticalWord);
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
        }
        else {
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
var puzzleResult = buildPuzzle(words, 0, N, []);
function testBuildPuzzle() {
    // Test 1: Verify that the puzzle is built correctly
    var words = [FIRST_WORD, "", ""];
    var result = buildPuzzle(words, 0, N, []);
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
