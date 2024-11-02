# JSON File Comparator

A simple tool for comparing two JSON files and identifying the differences. This tool helps developers and data analysts quickly spot differences between JSON objects, making it useful for tasks like data validation, debugging, and configuration management.


## Test it Online / Demo
You can try the JSON File Comparator directly in your browser [here](https://json-file-comaprision.vercel.app/).

## Features

- **Deep Comparison**: Compares JSON objects at every nested level to ensure all differences are identified.
- **Detailed Output**: Provides a summary of added, removed, and modified values between JSON files.
- **Flexible Usage**: Allows users to compare JSON files from different environments or configurations.
- **Error Handling**: Displays useful error messages for invalid JSON structures or parsing issues.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher recommended)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/ankit123nag/json-file-comparator.git
cd json-file-comparator
npm install
```

### Usage

1. Prepare two JSON files you want to compare.
2. Run the comparator script with the following command:

```bash
node compare.js <file1.json> <file2.json>
```

Replace `<file1.json>` and `<file2.json>` with the paths to your JSON files.

### Output

The script will output the differences between the two JSON files, categorizing them as:
- **Added**: Keys or values that are present in `file2` but not in `file1`.
- **Removed**: Keys or values that are present in `file1` but not in `file2`.
- **Modified**: Keys that exist in both files but have different values.

## Example

Suppose you have two JSON files:

**file1.json**
```json
{
  "name": "Alice",
  "age": 25,
  "city": "New York"
}
```

**file2.json**
```json
{
  "name": "Alice",
  "age": 26,
  "country": "USA"
}
```

Running `node compare.js file1.json file2.json` will output:

```bash
{
  "modified": {
    "age": { "old": 25, "new": 26 }
  },
  "added": {
    "country": "USA"
  },
  "removed": {
    "city": "New York"
  }
}
```

## Contributing

Contributions are welcome! If you’d like to add features or fix bugs, please follow these steps:

1. Fork the repository.
2. Create a new branch with a descriptive name.
3. Commit and push your changes to your fork.
4. Submit a pull request to the main branch.
