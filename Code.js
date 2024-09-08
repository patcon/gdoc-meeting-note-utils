// Adds a custom menu to Google Spreadsheet.
// See: https://developers.google.com/apps-script/guides/menus#custom_menus_in_google_docs_sheets_slides_or_forms
function onOpen() {
  var ui = DocumentApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu('Meeting Utils')
      .addItem('Highlight hashtags', 'highlightKeywords')
      .addToUi();
}

function highlightKeywords() {
  // Open the Google Doc by its ID
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();

  var tagColors = buildTagColorConfig(body);

  if (tagColors) {
    // Highlight the rest of the document based on these tags
    for (var tag in tagColors) {
      if (tagColors.hasOwnProperty(tag)) {
        Logger.log("Highlighting tag: " + tag + " with color: " + tagColors[tag]);
        highlightText(body, tag, tagColors[tag]);
      }
    }
  }
}

function buildTagColorConfig(body) {
  // Step 1: Find the configuration line with the "tags:" prefix
  var searchResult = body.findText("^tags:.*")

  if (searchResult) {
    var foundText = searchResult.getElement().asText();
    var lineText = foundText.getText();
    
    // Step 2: Extract the tags (words starting with '#')
    var tagItems = lineText.match(/#\w+/g);  // Get all tags like "#tag1", "#tag2", etc.

    if (tagItems) {
      var tagColors = {};

      // Step 3: Get the highlight color of each tag
      for (var i = 0; i < tagItems.length; i++) {
        var tag = tagItems[i];  // e.g., "#tag1"
        var tagStart = lineText.indexOf(tag);
        var tagEnd = tagStart + tag.length - 1;

        // Get the highlight color of the current tag.
        // Assume the first character has the appropriate color.
        var highlightColor = foundText.getBackgroundColor(tagStart);
        tagColors[tag] = highlightColor;  // Save the tag and its color, remove the '#'
      }
      return tagColors;
    }
  }

  Logger.log("No tags line found.");
  return null;
}

// Helper function to highlight the text
function highlightText(body, keyword, color) {
  var searchResult = null;

  // Keep finding the keyword until there are no more occurrences
  while (searchResult = body.findText(keyword, searchResult)) {
    var foundText = searchResult.getElement().asText();
    var startOffset = searchResult.getStartOffset();
    var endOffset = searchResult.getEndOffsetInclusive();
    
    // Set the background color for the found keyword
    foundText.setBackgroundColor(startOffset, endOffset, color);
  }
}
