
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import SignIn from "./index";
// This default export determines where your story goes in the story list
export default {
    title: 'Sign-In',
    component: SignIn,
};

const Template = (args: SignIn) => ({
    component: SignIn,
    props: args,
});

export const FirstStory = Template.bind({});
// @ts-ignore
FirstStory.args = {
    /* the args you need here will depend on your component */
};
