# ma_reussite_mobile_app

Welcome to **ma_reussite_mobile_app**, a mobile application built with Expo, using Yarn as the package manager, and Native Base as the design system.

## Prerequisites

Before you start, make sure you have the following installed on your machine:

1. **Node.js** (recommended: LTS version) - [Download Node.js](https://nodejs.org/)
2. **Yarn** - [Install Yarn](https://classic.yarnpkg.com/en/docs/install/)
3. **Expo CLI** - You can install it globally using npm or yarn:
   ```sh
   npm install -g expo-cli
   # or
   yarn global add expo-cli
   ```

## Installation

Follow the steps below to set up and run the application on your local machine:

1. Clone the application repository:

   ```sh
   git clone https://github.com/CraftSchoolship/ma_reussite_mobile_app.git
   ```

2. Navigate to the project directory:

   ```sh
   cd ma_reussite_mobile_app
   ```

3. Checkout the feature/new_app branch

   ```sh
   git checkout feature/new_app
   ```

4. Install the dependencies with Yarn:

   ```sh
   yarn install
   ```

## Running the Application

After installing all the dependencies, you can run the application using Expo. Here’s how to do it:

1. Start the application with Expo:

   ```sh
   expo start or yarn start
   ```

2. This command will open a new window in your browser with the Expo Dev Tools interface. You can then choose to launch the app on an Android/iOS emulator or scan the QR code with your mobile device to run it directly.

## Using Native Base

This application uses **Native Base** as its design system. Native Base provides a set of ready-to-use components for React Native, making it easy to create attractive and consistent user interfaces. For more information on how to use and customize Native Base components, you can check out the [official Native Base documentation](https://docs.nativebase.io/).

## Troubleshooting

If you encounter issues during the installation or running of the application, here are some common troubleshooting steps:

1. Ensure all dependencies are correctly installed:

   ```sh
   yarn install
   ```

2. Verify that you have the latest version of Expo CLI installed:

   ```sh
   expo --version
   ```

3. Clear the Yarn and Expo cache if problems persist:

   ```sh
   yarn cache clean
   expo start -c
   ```
