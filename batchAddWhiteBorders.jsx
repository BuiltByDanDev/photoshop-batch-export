#target photoshop

var FIXED_WIDTH = 2160;
var BORDER = 30;
var JPEG_QUALITY = 6; // 0–12 scale
var TOLERANCE = 0.05; // 5% tolerance for ratio matching

var RATIOS = {
    "3:2 (landscape)": 3 / 2,
    "2:3 (portrait)": 2 / 3,
    "3:4 (Instagram portrait)": 3 / 4
};

function closestRatio(ratio) {
    var closestKey = null;
    var closestDiff = Number.MAX_VALUE;
    for (var key in RATIOS) {
        var diff = Math.abs(ratio - RATIOS[key]);
        if (diff < closestDiff) {
            closestDiff = diff;
            closestKey = key;
        }
    }
    if (closestDiff <= TOLERANCE) {
        return closestKey;
    }
    return null;
}

function batchAddWhiteBorders() {
    var inputFolder = Folder.selectDialog("Select folder with images");
    if (!inputFolder) return;

    var folderName = prompt("Enter the name for the export folder:", "New Folder");
    if (!folderName) {
        alert("No folder name entered. Exiting.");
        return;
    }

    var outputFolder = new Folder(inputFolder + "/" + folderName);
    if (!outputFolder.exists) outputFolder.create();

    var files = inputFolder.getFiles(/\.(jpg|jpeg|png|tif|psd)$/i);

    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        if (!(file instanceof File)) continue;

        open(file);
        var doc = app.activeDocument;

        var ratio = doc.width.as('px') / doc.height.as('px');
        var matchedRatioKey = closestRatio(ratio);

        if (!matchedRatioKey) {
            alert("Skipping image due to no close ratio match: " + doc.name);
            doc.close(SaveOptions.DONOTSAVECHANGES);
            continue;
        }

        var ASPECT_RATIO = RATIOS[matchedRatioKey];
        var TARGET_WIDTH = FIXED_WIDTH;
        var TARGET_HEIGHT = Math.round(FIXED_WIDTH / ASPECT_RATIO);
        var IMAGE_WIDTH = TARGET_WIDTH - 2 * BORDER;
        var IMAGE_HEIGHT = TARGET_HEIGHT - 2 * BORDER;

        // Resize image to fit inside inner box
        doc.resizeImage(UnitValue(IMAGE_WIDTH, 'px'), UnitValue(IMAGE_HEIGHT, 'px'), null, ResampleMethod.BICUBIC);

        // Create new white canvas of target size
        var newDoc = app.documents.add(
            TARGET_WIDTH,
            TARGET_HEIGHT,
            doc.resolution,
            doc.name.replace(/\.[^\.]+$/, '') + "_bordered",
            NewDocumentMode.RGB,
            DocumentFill.WHITE
        );

        // Copy and paste resized image
        app.activeDocument = doc;
        doc.selection.selectAll();
        doc.selection.copy();
        doc.close(SaveOptions.DONOTSAVECHANGES);

        app.activeDocument = newDoc;
        newDoc.paste();
        var layer = newDoc.activeLayer;

        // Position pasted layer at exact border offset
        var bounds = layer.bounds;
        var left = bounds[0].as('px');
        var top = bounds[1].as('px');
        layer.translate(BORDER - left, BORDER - top);

        // Flatten and finalize
        newDoc.flatten();
        newDoc.resizeCanvas(TARGET_WIDTH, TARGET_HEIGHT, AnchorPosition.TOPLEFT);

        // Export as JPEG using Export As
        var exportOptions = new ExportOptionsSaveForWeb();
        exportOptions.format = SaveDocumentType.JPEG;
        exportOptions.includeProfile = false;
        exportOptions.interlaced = false;
        exportOptions.optimized = true;
        exportOptions.quality = Math.min(100, Math.max(0, JPEG_QUALITY * 8.33));

        var exportFile = new File(outputFolder + "/" + newDoc.name + ".jpg");
        newDoc.exportDocument(exportFile, ExportType.SAVEFORWEB, exportOptions);

        newDoc.close(SaveOptions.DONOTSAVECHANGES);
    }

    alert("Image export complete!");
}

batchAddWhiteBorders();
