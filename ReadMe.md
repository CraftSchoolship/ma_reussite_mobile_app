Maintenant passons a la navigation. Dans cette application je veux avoir deux types de navigations : le navigation stack et le bottom-tab navigation. Comment faire ceci tout en respectant la structure de l'app ?
NB: mettez tout ce qui concer la navigation dans le dossier navigation de facon que ca soit plus modulaire.

### Structure de Dossiers

```
mon-projet/
├── assets/
│   ├── fonts/
│   ├── images/
│   └── ...
├── src/
│   ├── api/
│   │   └── apiClient.js
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.js
│   │   │   ├── Button.styles.js
│   │   │   └── index.js
│   │   └── ...
│   ├── hooks/
│   │   └── useAuth.js
│   ├── navigation/
│   │   ├── AppNavigator.js
│   │   └── index.js
│   ├── screens/
│   │   ├── HomeScreen/
│   │   │   ├── HomeScreen.js
│   │   │   └── HomeScreen.styles.js
│   │   ├── FormScreen/
│   │   │   ├── FormScreen.js
│   │   │   └── FormScreen.styles.js
│   │   └── ...
│   ├── store/
│   │   ├── actions/
│   │   │   └── userActions.js
│   │   ├── reducers/
│   │   │   ├── index.js
│   │   │   └── userReducer.js
│   │   └── index.js
│   ├── utils/
│   │   └── index.js
│   ├── validation/
│   │   └── formValidation.js
│   ├── App.js
│   └── index.js
├── .eslintrc.js
├── .prettierrc
├── app.json
└── package.json
```

### Description des Dossiers

- **assets/** : Contient les ressources statiques telles que les polices et les images.

  - **fonts/** : Fichiers de polices.
  - **images/** : Fichiers d'images.

- **src/** : Contient le code source de l'application.

  - **api/** : Fichiers relatifs aux appels API et à la gestion des données à distance.
    - **apiClient.js** : Configuration et gestion des appels API.
  - **components/** : Composants réutilisables de l'application.
    - **Button/** : Exemple de composant bouton.
      - **Button.js** : Composant bouton.
      - **Button.styles.js** : Styles associés au bouton.
      - **index.js** : Exportations du composant bouton.
  - **hooks/** : Contient les hooks personnalisés.
    - **useAuth.js** : Exemple de hook pour l'authentification.
  - **navigation/** : Configuration et fichiers de navigation.
    - **AppNavigator.js** : Configuration du navigateur principal.
    - **index.js** : Exportations de navigation.
  - **screens/** : Écrans de l'application.
    - **HomeScreen/** : Exemple d'écran d'accueil.
      - **HomeScreen.js** : Composant de l'écran d'accueil.
      - **HomeScreen.styles.js** : Styles associés à l'écran d'accueil.
    - **FormScreen/** : Exemple d'écran de formulaire.
      - **FormScreen.js** : Composant de l'écran de formulaire.
      - **FormScreen.styles.js** : Styles associés à l'écran de formulaire.
  - **store/** : Gestion de l'état de l'application.
    - **actions/** : Actions Redux.
      - **userActions.js** : Actions liées à l'utilisateur.
    - **reducers/** : Réducteurs Redux.
      - **index.js** : Combine tous les réducteurs.
      - **userReducer.js** : Réducteur lié à l'utilisateur.
    - **index.js** : Configuration du store Redux.
  - **utils/** : Fonctions utilitaires et fichiers d'assistance.
    - **index.js** : Exportations des utilitaires.
  - **validation/** : Schémas de validation Yup.
    - **formValidation.js** : Schéma de validation pour les formulaires.
  - **App.js** : Composant principal de l'application.
  - **index.js** : Point d'entrée principal de l'application.

- **.eslintrc.js** : Configuration ESLint.
- **.prettierrc** : Configuration Prettier.
- **app.json** : Configuration de l'application Expo.
- **package.json** : Dépendances et scripts de l'application.
