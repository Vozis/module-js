export const formatError = (text) => `
<span style="color: red;">
    ${text} 
</span> 
`;

const showElHtml = (el) => {
  el.hidden = true;
};

const hideElHtml = (el) => {
  el.hidden = false;
};

export const toggleElHtml = (el) => {
  el.hidden ? hideElHtml(el) : showElHtml(el);
};
