
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import Perfil from "./index";
// This default export determines where your story goes in the story list
export default {
    title: 'Perfil',
    component: Perfil,
};

const Template = (args: Perfil) => ({
    component: Perfil,
    props: args,
});

export const FirstStory = Template.bind({});
// @ts-ignore
FirstStory.args = {
    /* the args you need here will depend on your component */
};
