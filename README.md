# Fuzzy Tab Search

A Chrome extension that helps you quickly find and switch between open tabs using fuzzy search.

## Features

- 🔍 Instantly search through all open tabs
- ⌨️ Keyboard shortcuts for quick access (Ctrl+Shift+F / MacCtrl+Shift+F)
- ⬆️⬇️ Arrow key navigation through search results
- 🎯 Search matches both tab titles and URLs
- 🖱️ Click or press Enter to switch to selected tab

## Installation

1. Clone this repository or download the source code
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the `fuzzy-tab-search` directory

## Usage

### Opening the Search

- Use the keyboard shortcut: `Ctrl+Shift+F` (Windows/Linux) or `MacCtrl+Shift+F` (Mac)
- Click the extension icon in your Chrome toolbar

### Searching

1. Type your search query in the input field
2. Results will filter in real-time as you type
3. Navigate through results using:
   - Arrow keys (⬆️⬇️) to move selection
   - Enter to switch to selected tab
   - Mouse click to switch to desired tab

## Keyboard Shortcuts

| Key Combination | Action |
|----------------|--------|
| Ctrl+Shift+F (Windows/Linux) | Open search popup |
| MacCtrl+Shift+F (Mac) | Open search popup |
| ↑ (Up Arrow) | Move selection up |
| ↓ (Down Arrow) | Move selection down |
| Enter | Switch to selected tab |

## Technical Details

- Built with vanilla JavaScript
- Uses Chrome Extensions Manifest V3
- Implements real-time search filtering
- Requires `tabs` and `commands` permissions

## Permissions

This extension requires the following permissions:
- `tabs`: To access and switch between open tabs
- `commands`: To enable keyboard shortcuts

## Contributing

Feel free to submit issues and pull requests to help improve this extension.
