
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import SignUp from "./index";
// This default export determines where your story goes in the story list
export default {
    title: 'Sign-Up',
    component: SignUp,
};

const Template = (args: SignUp) => ({
    component: SignUp,
    props: args,
});

export const FirstStory = Template.bind({});
// @ts-ignore
FirstStory.args = {
    /* the args you need here will depend on your component */
};
