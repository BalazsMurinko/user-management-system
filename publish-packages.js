const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const PACKAGES = [
    'react-user-management',
    'theia-user-management'
];

function updateVersion(packagePath, newVersion) {
    const packageJsonPath = path.join(packagePath, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    console.log(`Updating ${packageJson.name} from ${packageJson.version} to ${newVersion}`);
    packageJson.version = newVersion;
    
    // Update dependencies if this is the Theia package
    if (packageJson.name === '@local/rbac-admin-ui-theia' && packageJson.dependencies) {
        if (packageJson.dependencies['@local/rbac-admin-ui-react']) {
            packageJson.dependencies['@local/rbac-admin-ui-react'] = newVersion;
        }
    }
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    return packageJson.name;
}

function publishPackage(packagePath, registry, version) {
    console.log(`Publishing ${packagePath}...`);
    try {
        execSync(`cd ${packagePath} && yarn publish --registry ${registry} --new-version ${version} --no-git-tag-version`, { 
            stdio: 'inherit'
        });
        console.log(`✅ Successfully published ${path.basename(packagePath)}@${version}`);
        return true;
    } catch (error) {
        console.error(`❌ Failed to publish ${path.basename(packagePath)}:`, error.message);
        return false;
    }
}

function buildPackage(packagePath) {
    try {
        console.log(`\n🏗️  Building ${path.basename(packagePath)}...`);
        execSync('yarn build', { 
            cwd: packagePath, 
            stdio: 'inherit' 
        });
        return true;
    } catch (error) {
        console.error(`❌ Build failed for ${path.basename(packagePath)}:`, error.message);
        return false;
    }
}

// Get new version
readline.question('Enter new version (e.g., 1.0.1): ', (newVersion) => {
    if (!/^\d+\.\d+\.\d+$/.test(newVersion)) {
        console.error('❌ Invalid version format. Please use semver format (e.g., 1.0.1)');
        process.exit(1);
    }

    // Get registry URL
    readline.question('Enter registry URL (press Enter for default http://localhost:4873): ', async (registry) => {
        registry = registry || 'http://localhost:4873';
        console.log(`\n🚀 Starting publish process for version ${newVersion} to ${registry}`);
        
        try {
            for (const packageName of PACKAGES) {
                const packagePath = path.join(__dirname, packageName);
                const name = updateVersion(packagePath, newVersion);
                
                // Build the package
                if (!buildPackage(packagePath)) {
                    console.error(`❌ Aborting due to build failure in ${name}`);
                    process.exit(1);
                }
                
                // Publish the package
                if (!publishPackage(packagePath, registry, newVersion)) {
                    console.error(`❌ Aborting due to publish failure in ${name}`);
                    process.exit(1);
                }
            }
            
            console.log('\n🎉 All packages published successfully!');
            console.log('Version:', newVersion);
            console.log('Registry:', registry);
            
        } catch (error) {
            console.error('❌ Error during publishing:', error.message);
            process.exit(1);
        } finally {
            readline.close();
        }
    });
});
