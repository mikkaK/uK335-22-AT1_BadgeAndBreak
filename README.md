# uK335-22-AT1_BadgeAndBreak
This project is made for you forgetable people. if you ever forget your break at work or need to be reminded to take your badge with you every morning, this app is for you.

# How to install

## prerequisites

What you'll need before installing:
- IDE
- Node.js 12 LTS or higher
- NPM and yarn
- Working android emulator with SDK 33

## Installation

### Steps:

1. Pull the repository to your local environment
2. Open the project in your desired IDE or Editor
3. Run ```yarn install``` in a terminal
4. After installing ell packages run ```yarn start``` to start up the metro bundler or ```yarn start android``` to do the same but also open the app in your local emulator
5. After running one of those commands, you'll get a QR code in your command prompt which you can scan on your mobile phone (either directly in the expo go app on android or in the camera on IOS, which will redirect you to the expo go app)
> :warning: **You need to be connected to the same network as your computer**: Be very careful here!
6. Enjoy our app :)

### Additional information
- if your QR isn't scannable or redirects you to a browser, try ```yarn expo start --tunnel``` instead and scan the new QR code. 
- the menu which expo gives you in the command prompt works as followed:  
  press ```c``` to show the QR code if you need it again  
  press ```r``` to hard reload the app  
  press ```a``` to open the app in the android emulator locally  
  press ```i``` to open the app in the IOS emuulator locally  
> :warning: **Will only work on a MacOS system**: don't try on windows!
  press ```m``` to open the dev-menu on your phone  
  press ```?``` for additional commands  


