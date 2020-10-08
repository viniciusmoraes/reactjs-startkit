import en from "./en.json";
import es from "./es.json";

const langs = {
    en,
    es
};

export default function (lang = "en") {
    return langs[lang];
};
