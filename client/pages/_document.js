import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="google" content="notranslate" />
          <meta name="theme-color" content="#1976D2" />

          <link
            rel="shortcut icon"
            href="https://storage.googleapis.com/builderbook/favicon32.png"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Muli:300,400:latin"
          />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <link
            rel="stylesheet"
            href="https://storage.googleapis.com/builderbook/nprogress.min.css"
          />
          <link rel="stylesheet" href="https://storage.googleapis.com/builderbook/vs.min.css" />

          <style>
            {`
              a, a:focus {
                font-weight: 400;
                color: #1565C0;
                text-decoration: none;
                outline: none
              }
              a:hover, button:hover {
                opacity: 0.75;
                cursor: pointer
              }
              blockquote {
                padding: 0 1em;
                color: #555;
                border-left: 0.25em solid #dfe2e5;
              }
              pre {
                display:block;
                overflow-x:auto;
                padding:0.5em;
                background:#FFF;
                color: #000;
                border: 1px solid #ddd;
              }
              code {
                font-size: 14px;
              }
            `}
          </style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
