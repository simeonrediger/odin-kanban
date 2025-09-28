const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');

installPackages(
    'webpack',
    'webpack-cli',
    'webpack-merge',
    'webpack-dev-server',
    'html-webpack-plugin',
    'css-loader',
    'style-loader',
);

const currentDirectoryName = path.basename(__dirname);
setReadmeTitle(currentDirectoryName, './README.md');
setPackageName(currentDirectoryName, './package.json');
setPageTemplateTitle(currentDirectoryName, './src/index.html');
deleteCurrentFile();
printInstructions();

function setReadmeTitle(title, readmePath) {
    const readmeFilename = path.basename(readmePath);

    if (!fs.existsSync(readmePath)) {
        printError(`Error: Failed to locate ${readmeFilename}`);
    }

    fs.writeFileSync(readmePath, `# ${title}\n`, 'utf8');
    printSuccess(`${readmeFilename} title updated to '${title}'`);
}

function setPackageName(packageName, packagePath) {
    packageName = packageName.toLowerCase().replace(/[^a-z0-9-_]/g, '-');
    const packageFilename = path.basename(packagePath);

    if (!fs.existsSync(packagePath)) {
        printError(`Error: Failed to locate ${packageFilename}`);
        return;
    }

    const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    const packageNameKey = 'name';
    packageData[packageNameKey] = packageName;

    fs.writeFileSync(packagePath, JSON.stringify(packageData, null, 2) + '\n');
    printSuccess(
        `${packageFilename} '${packageNameKey}' set to '${packageName}'`
    );
}

function setPageTemplateTitle(title, pageTemplatePath) {
    const pageTemplateFilename = path.basename(pageTemplatePath);

    if (!fs.existsSync(pageTemplatePath)) {
        printError(`Error: Failed to locate ${pageTemplateFilename}`);
        return;
    }

    let html = fs.readFileSync(pageTemplatePath, 'utf8');
    html = html.replace(/<title>.*<\/title>/i, `<title>${title}</title>`);

    fs.writeFileSync(pageTemplatePath, html, 'utf8');
    printSuccess(`${pageTemplateFilename} <title> set to '${title}'`);
}

function installPackages(...packages) {
    const args = ['install', ...packages];
    const result = childProcess.spawnSync('npm', args, { stdio: 'inherit', shell: true });

    if (result.error) {
        printError(result.error);
    }

    if (result.status !== 0) {
        printError(`npm install failed with code ${result.status}`);
    }

    if (!result.error && result.status === 0) {
        printSuccess('All packages installed successfully');
    }
}

function deleteCurrentFile() {
    fs.unlinkSync(__filename);
    printSuccess(`Purged ${path.basename(__filename) }`);
}

function printInstructions() {
    const cyanColorCode = '\x1b[36m%s\x1b[0m';
    console.log(
        cyanColorCode,
        'Update README and <title>, then commit "Complete setup"',
    );
}

function printSuccess(message) {
    const greenColorCode = '\x1b[32m%s\x1b[0m';
    console.log(greenColorCode, message);
}

function printError(message) {
    const redColorCode = '\x1b[31m%s\x1b[0m';
    console.error(redColorCode, message);
}
