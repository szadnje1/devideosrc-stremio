const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");

const manifest = {
    id: "org.devideosrc.german",
    version: "1.0.0",
    name: "DEVIDEOSRC German Streams",
    description: "Gledaj njemacke streamove s DEVIDEOSRC-a izravno u Stremiu",
    resources: ["stream"],
    types: ["movie", "series"],
    catalogs: []
};

const builder = new addonBuilder(manifest);

builder.defineStreamHandler(async (args) => {
    const { type, id } = args;
    let targetUrl = "";

    if (type === "movie") {
        targetUrl = "https://devideosrc.co/embed/movie/" + id;
    } else if (type === "series") {
        const parts = id.split(":");
        targetUrl = "https://devideosrc.co/embed/tv/" + parts[0] + "/" + parts[1] + "/" + parts[2];
    }

    if (!targetUrl) return { streams: [] };

    return {
        streams: [
            {
                title: "DEVIDEOSRC (Deutsch Player)",
                type: "embed",
                externalUrl: targetUrl
            }
        ]
    };
});

const PORT = process.env.PORT || 7000;
serveHTTP(builder.getInterface(), { port: PORT });
console.log("Addon je uspjesno pokrenut na portu: " + PORT);
