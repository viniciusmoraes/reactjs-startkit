import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import { loadTranslations, setLocale, syncTranslationWithStore } from 'react-redux-i18n';
import { Reducers } from "./reducers";

const translationsObject = {
    en: {
        application: {
            title: 'Awesome app with i18n!',
            hello: 'Hello, %{name}!'
        },
        date: {
            long: 'MMMM Do, YYYY'
        },
        export: 'Export %{count} items',
        export_0: 'Nothing to export',
        export_1: 'Export %{count} item',
        two_lines: 'Line 1<br />Line 2',
        literal_two_lines: 'Line 1\
Line 2'
    },
    es: {
        application: {
            title: 'Es Toffe app met i18n!',
            hello: 'Es Hallo, %{name}!'
        },
        date: {
            long: 'D MMMM YYYY'
        },
        export: 'Exporteer %{count} dingen',
        export_0: 'Niks te exporteren',
        export_1: 'Exporteer %{count} ding',
        two_lines: 'Regel 1<br />Regel 2',
        literal_two_lines: 'Regel 1\
Regel 2'
    },
    "pt-BR": {
        application: {
            title: 'BR Toffe app met i18n!',
            hello: 'BR Hallo, %{name}!'
        },
        date: {
            long: 'D MMMM YYYY'
        },
        export: 'Exporteer %{count} dingen',
        export_0: 'Niks te exporteren',
        export_1: 'Exporteer %{count} ding',
        two_lines: 'Regel 1<br />Regel 2',
        literal_two_lines: 'Regel 1\
Regel 2'
    }
};

const initialState = {};
const middleware = [logger, thunk];

export const store = createStore(Reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));

syncTranslationWithStore(store)
// @ts-ignore
// store.dispatch(loadTranslations(translationsObject));
// @ts-ignore
// store.dispatch(setLocale('es'));
