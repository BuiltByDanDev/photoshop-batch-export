# Photoshop Border Automation Script

This Photoshop script automates adding an even white border around images of varying pixel sizes, based on their aspect ratio. It resizes images to a fixed width (2160px) and adds a 30px white border on all sides. Supported aspect ratios:

-   3:2 (landscape)
-   2:3 (portrait)
-   3:4 (Instagram portrait)

## Features

-   Automatically detects image ratio and applies the correct border
-   Fixed output width of 2160px, height adjusts to maintain ratio
-   Exports final images as JPEG with quality 6
-   Creates a custom export folder inside the source folder

## Add Script to Photoshop's Scripts Menu

To make the script available under **`File > Scripts`** in Photoshop:

1. Move the script file `BatchAddWhiteBorders.jsx` to the appropriate scripts folder:

    - **Windows:**

        ```
        C:\Program Files\Adobe\Adobe Photoshop [version]\Presets\Scripts\
        ```

    - **macOS:**
        ```
        /Applications/Adobe Photoshop [version]/Presets/Scripts/
        ```

2. Restart Photoshop.

The script should appear under `File > Scripts` for quick access.

## How to Use

1. Open Photoshop and run the script.
2. Select the folder containing your images.
3. Enter a name for the export folder (it will be created inside the source folder).
4. The script processes each image, skipping those that don’t match supported ratios.
5. Exported images will have even white borders and be saved as JPEG in the export folder.

## Requirements

-   Adobe Photoshop with JavaScript scripting enabled.
