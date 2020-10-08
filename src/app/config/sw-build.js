const workboxBuild = require('workbox-build');
// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () => {
    // This will return a Promise
    workboxBuild
        .injectManifest({
            "maximumFileSizeToCacheInBytes": 5000000,
            "globDirectory": "build/",
            "globPatterns": [
                "**/*.{css,html,js,png}"
            ],
            "swDest": "build/service-worker.js",
            "swSrc": "src/app/config/sw-template.js"

        })
        .then(({ count, size, warnings }) => {
            // Optionally, log any warnings and details.
            warnings.forEach(console.warn);
            console.log(`${count} files will be precached, totaling ${size} bytes.`);
        })
        .catch(console.error);
};
buildSW();
