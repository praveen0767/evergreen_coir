const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const DEV_URL = 'http://localhost/green-earth/evergreen-coir/backend';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx')) { 
            results.push(file);
        }
    });
    return results;
}

const files = walk(srcDir);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    if (content.includes(DEV_URL)) {
        console.log('Modifying', file);
        
        // Remove local constant declarations of API_BASE or API_URL
        content = content.replace(/const API_BASE\s*=\s*(?:'|`|")http:\/\/localhost\/green-earth\/evergreen-coir\/backend(?:\/.*?)?(?:'|`|");?/g, '');
        content = content.replace(/const API_URL\s*=\s*(?:'|`|")http:\/\/localhost\/green-earth\/evergreen-coir\/backend(?:\/.*?)?(?:'|`|");?/g, '');

        // Replace string concatenations or templated strings
        // E.g 'http://localhost/green-earth/evergreen-coir/backend/something.php' -> `${API_BASE}/something.php`
        content = content.replace(/"http:\/\/localhost\/green-earth\/evergreen-coir\/backend\/([^"]+)"/g, '`${API_BASE}/$1`');
        content = content.replace(/'http:\/\/localhost\/green-earth\/evergreen-coir\/backend\/([^']+)'/g, '`${API_BASE}/$1`');
        content = content.replace(/`http:\/\/localhost\/green-earth\/evergreen-coir\/backend\/([^`]+)`/g, '`${API_BASE}/$1`');
        
        // Then exact match
        content = content.replace(/"http:\/\/localhost\/green-earth\/evergreen-coir\/backend"/g, 'API_BASE');
        content = content.replace(/'http:\/\/localhost\/green-earth\/evergreen-coir\/backend'/g, 'API_BASE');
        content = content.replace(/`http:\/\/localhost\/green-earth\/evergreen-coir\/backend`/g, 'API_BASE');
        
        if (content !== original && !content.includes('import { API_BASE }')) {
            content = 'import { API_BASE } from "@/config";\n' + content;
        }
        
        fs.writeFileSync(file, content, 'utf8');
    }
});

console.log('Done replacing API URLs.');
