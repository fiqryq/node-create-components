const fs = require('fs');

const componentName = process.argv[2];
const camelizedcomponentName = camelize(componentName);

const newComponents = `./src/${camelizedcomponentName}`;
const newComponentFile = `${newComponents}/index.tsx`;

if (fs.existsSync(newComponents)) throw new Error('Component Exists');

fs.mkdirSync(newComponents, { recursive: true });

copyTemplate('template/index.tsx', newComponentFile, camelizedcomponentName);

function copyTemplate(src, path, componentName = '') {
  fs.readFile(src, 'utf-8', (err, data) => {
    if (err) throw err;
    if (componentName) data = data.replace(/ComponentName/g, componentName);
    fs.writeFile(path, data, 'utf8', function (err) {
      if (err) throw err;
    });
  });
}

function camelize(str) {
  let arr = str.split('-');
  let capital = arr.map((item, index) =>
    index ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase() : item
  );
  return capital.join('');
}
