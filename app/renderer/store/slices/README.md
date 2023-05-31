# Orca Store Slices

The application state for Orca will be split into logical slices.

* Project File
  * Book description
    * Title
    * Author
    * Language
    * ISBN(s)
    * Publisher information
  * Content
    * List of book sections
      * File name for each section -> markdown file
      * type of section (front matter, body, back matter)
      * Order of sections relates to order in the book

* Theme Settings
  * All settings related to EPUB and Print settings

* Application State
  * Preview Window (Open/Closed)
  * Mode (Write or Publish) - controls the main content
    * If mode is Publish preview window is forced Open
  * Current open file
    * Filename, contents will be read directly from filesystem
  * Serialized file contents for preview
    * EPUB
    * Print

