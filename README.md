# gdoc-meeting-note-utils
A repository of app scripts for adding helper functions to Google Docs.

Each helper function will show up in a menu item called "Meeting Utils".

<img width="908" alt="Screenshot of open 'Meeting Utils' menu in Google Docs" src="https://github.com/user-attachments/assets/56f0c6a7-a446-42ad-9698-bb6ec6805917">

## Highlight Helper

This helper is intended to highlight certain `#tags` all through-out a Google Doc, based on a configuration line.

<img width="710" alt="Screenshot of a Google Doc with hashtags highlighted the same as a configuration line" src="https://github.com/user-attachments/assets/a7f642d4-9ad9-4229-84fb-35f473e2bbd1">

### Usage

1. Somewhere in the document, add a "configuration line" (or a bullet) with the following format:
   ```
   tags: #sometag #anothertag #tag3
   ```
2. Highlight each tag with a specific color.
3. In the GDoc menu bar, click: `Meeting Utils > highlight hashtags`

Every hashtag in the entire document should be highlighted with the same color that was used in the first configuration line found.
