module.exports = {
  templates: [
    {
      title: 'sandbox',
      filename: 'sandbox.html',
      class: 'sandbox',
      head: ``,
      oldhead: `<link href="./assets/fonts/fonts.css" rel="stylesheet">`,
      body: `
        <script>
          var app = new window.Sandbox();
        </script>
      `,
    },
  ],
};
