// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAq3hfcdFkjRXWe_es2hPSPEWbA7rFwugQ',
    authDomain: 'daily-issues.firebaseapp.com',
    databaseURL: 'https://daily-issues.firebaseio.com',
    projectId: 'daily-issues',
    storageBucket: 'daily-issues.appspot.com',
    messagingSenderId: '389418900274'
  }
};

