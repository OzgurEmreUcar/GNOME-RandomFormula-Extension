// Import GNOME Shell libraries
const St = imports.gi.St;                    // St is the GNOME Shell toolkit (Shell Toolkit)
const Main = imports.ui.main;                // Access to the main GNOME Shell UI components
const GLib = imports.gi.GLib;                // Used for running external commands
const Gio = imports.gi.Gio;                  // GSettings and file-related operations

// Import extension utility functions
const ExtensionUtils = imports.misc.extensionUtils;

// Declare variables to hold the button and settings object
let button, settings;

// Function to run external script and update button label and settings
function _runScriptAndUpdateLabel() {
    // Run the 'random_formula.sh' script synchronously
    let [ok, out, err, status] = GLib.spawn_command_line_sync(
        `random_formula.sh`
    );

    if (ok && out) {
        // If the script executed successfully, trim and use its output
        let output = out.toString().trim();
        button.set_label(output);                  // Set button label
        settings.set_string('formula-text', output); // Persist output in GSettings
    } else {
        // If there was an error running the script
        button.set_label("Error");
    }
}

// Initialization function called once when the extension is loaded
function init() {
    // Get the path to the schemas directory in the extension
    const GioSSS = Gio.SettingsSchemaSource;
    let schemaDir = ExtensionUtils.getCurrentExtension().dir.get_child('schemas');

    // Load the custom GSettings schema from that directory
    let schemaSource = GioSSS.new_from_directory(schemaDir.get_path(), GioSSS.get_default(), false);
    let schemaObj = schemaSource.lookup('org.gnome.shell.extensions.random-formula', true);

    // Create GSettings object using the loaded schema
    settings = new Gio.Settings({ settings_schema: schemaObj });
}

// Called when the extension is enabled (e.g. from GNOME Tweaks)
function enable() {
    // Create a new button with the stored label and a custom style class
    button = new St.Button({ label: settings.get_string('formula-text'), style_class: "formula-button" });

    // When the button is clicked, run the script and update the label
    button.connect('clicked', _runScriptAndUpdateLabel);

    // Add the button to the left side of the GNOME top panel
    Main.panel._leftBox.insert_child_at_index(button, 0);
}

// Called when the extension is disabled
function disable() {
    // Remove the button from the panel and clean up
    if (button) {
        Main.panel._leftBox.remove_child(button);
        button = null;
    }
}
