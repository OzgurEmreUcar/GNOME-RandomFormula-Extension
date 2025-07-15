# GNOME Random Formula Extension

A lightweight GNOME Shell extension that displays a **random formula** on your top panel. Clicking on the formula triggers a new one to be fetched via a customizable shell script (`random_formula.sh`).

This is great for students, educators, engineers, or anyone who wants to see a bit of mathematical inspiration while working on their desktop.

---

## Features

- Adds a clickable label to the top panel of GNOME Shell
- Executes a shell script (`random_formula.sh`) on click
- Dynamically updates the label with the formula generated

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/OzgurEmreUcar/GNOME-RandomFormula-Extension.git
```
```bash
mkdir -p ~/.local/share/gnome-shell/extensions/random-formula@ozgur
```
```bash
cp -r GNOME-RandomFormula-Extension/* ~/.local/share/gnome-shell/extensions/random-formula@ozgur/
```

### 2. Place random formula script

```bash
cp random_formula.sh ~/.local/bin/
```
```bash
chmod +x ~/.local/bin/random_formula.sh
```
Ensure ~/.local/bin is in your $PATH. You can add this to your .bashrc or .zshrc:
```bash
export PATH="$HOME/.local/bin:$PATH"
```

### 3. Enable the extension
```bash
gnome-extensions enable random-formula@ozgur
```
## Important: Add Your Shell Version

Before enabling the extension, edit the metadata.json file and make sure your GNOME Shell version is listed under "shell-version":

```json
"shell-version": ["45", "46"]
```
To find your shell version, run:
```bash
gnome-shell --version
