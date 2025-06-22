# Photoshop Border Automation Script

This Photoshop script automates adding a white border around images of varying sizes based on their aspect ratio. It resizes images to a fixed width (2160px) and adds a 30px white border on all sides.

## Why I built this

I often add a white border to my images when posting to instagram and after being unable to find any existing plugins, I created this script to help streamline my workflow. I'm sure there are some mobile apps that can add borders, but i prefer running my images through photoshop to ensure there's no loss in quality.

This script has helped me ensure visual consistency across all images, regardless of their original resolution.

Right now i'm forcing my preferred margins but I might expand upon the script in the future to allow for more flexibility.

## Supported aspect ratios:

-   3:2 (Landscape)
-   2:3 (Portrait)
-   4:5 (Instagram Default)
-   3:4 (New Instagram Portrait)
-   16:9 (Widescreen)
-   16:10 (Creative Wide)
-   65:24 (XPan)

## Features

-   Automatically detects image ratio and applies the correct border
-   Creates a custom export folder inside the source folder
-   Fixed output width of 2160px, height adjusts to maintain ratio
-   Exports final images as JPEG

## Add Script to Photoshop's Scripts Menu

To make the script available under **`File > Scripts`** in Photoshop:

1. Move the script file `borderAutomation.jsx` to the scripts folder:

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
4. Input image quality percentage (recommended default is 80).
5. The script processes each image, skipping those that don’t match supported ratios.
6. Exported images will have white borders and be saved as JPEG in the export folder.
