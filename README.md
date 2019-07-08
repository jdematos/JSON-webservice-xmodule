# JSON-webservice-xmodule

This is prototype of a searchable list of Roosevelt University's student organizations for the university's mobile application. I created a JSON-based web service meant to be used with Modo labs Xmodule, which allows you to customize in-app content.

An important specification for this project was to create something easily maintainable by non-techinical people. My solution to this was to create a google sheet where all the student org data would live, and a google script that would use this data to create JSON which declares how its data should be displayed in the university's mobile application through xmodule.

This project was created for the web design and development department at Roosevelt University, however, I decided to share it so other institutions who also use Modo's mobile app platform can fork this project and modify it to meet their needs and have an easier time taking their mobile strategy to the next level.

### Prerequisites

What you will need:

- Google Account
- Modo Labs platform 

### What to do on Google:

* Step 1: Navigate to Google sheet (you'll need to be signed into a google account)
   <p align="center">
   <img src ="Images/On%20Google%20Sheet/Step%201_GoogleSheet.jpg" width="800">
    </p>
*  Step 2: Paste the sample data in your sheet and click "script editor" 
    <p align="center">
     <img src ="Images/On%20Google%20Sheet/Step%202_GoogleSheet.jpg" height="400" >
   </p>
*  Step 3: Paste the source code in your script editor and click "Deploy as web app..."
    <p align="center">
     <img src ="Images/On%20Google%20Sheet/Step%203_GoogleSheet.jpg" width = "800">
    </p>
*  Step 4: Under "who has access to the app" select "Anyone, even anonymous"
    <p align="center">
     <img src ="Images/On%20Google%20Sheet/Step%204_GoogleSheet.jpg" width = "800">
   </p>
*  Step 5: You'll need to give it the required authorization 
    <p align="center">
     <img src ="Images/On%20Google%20Sheet/Step%205_GoogleSheet.jpg" height="400">
    </p>
*  Step 6: Click "advanced"
    <p align="center">
     <img src ="Images/On%20Google%20Sheet/Step%206_GoogleSheet.jpg" height="400">
    </p>
*  Step 7: Click "Go to Untitled project (unsafe)" (note that it will say Go to "whatever you named your project")
    <p align="center">
     <img src ="Images/On%20Google%20Sheet/Step%207_GoogleSheet.jpg" height="400">
    </p>
*  Step 8: Click on "Allow"
    <p align="center">
     <img src ="Images/On%20Google%20Sheet/Step%208_GoogleSheet.jpg" height="400">
   </p>
*  Step 9: Copy the current web app URL, you'll need this when we jump over to the modo labs platform. Before we do this, click on "lastest code" and make sure everything is working correctly.
    <p align="center">
     <img src ="Images/On%20Google%20Sheet/Step%209_GoogleSheet.png" height="400">
   </p>
    
### What to do on Modo Labs platform:

*  Step 1: From your organization's dashboard click "create"
    <p align="center">
     <img src ="Images/On%20Modo's%20platform/Step%201_modo_LI.jpg" width = "800">
    </p>
*  Step 2: Under **Assemble**, click "Modules" 
<p align="center">
     <img src ="Images/On%20Modo's%20platform/Step%202_modo_LI.jpg" height="400">
   </p>
*  Step 3: Click "New Module" on the upper right corner
<p align="center">
     <img src ="Images/On%20Modo's%20platform/Step%203_modo_LI.jpg" height="400">
   </p>
*  Step 4: Under select Module type, click on "XModule"
<p align="center">
    <img src ="Images/On%20Modo's%20platform/Step%204_modo.png">
    </p>
*  Step 5: Choose a display name and a path. Then paste the web app URL from Step 9 from "what to do on google" and click "Add" on the upper right corner.
<p align="center">
    <img src ="Images/On%20Modo's%20platform/Step%205_modo_LI.jpg" width = "800">
    </p>
    
### We're DONE!!

Congratulations! after following all of the steps above, you should end up with a fully functioning searchable list.

## Demo
Here's how it looks:
<p align="center">
 <img src ="Images/On%20Modo's%20platform/Result_1.png"  height = "640">
</p>
<p align="center">
 <img src ="Images/On%20Modo's%20platform/newResult_2.png" height = "640">
</p>

Try it out for yourself:
https://roosevelt-test.modolabs.net/freshmen_sophomores_juniors_and_seniors/student_organizations

## Authors

* **João Matos**

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgements

A special thanks to:

* My supervisor Aaron Rester.

* My co-workers at the Roosevelt University's web design and development department, Greg Chartrau, who helped me with CSS, Eugene Choi, who helped me with the foreground post requirements.

* The Modo Labs support staff, for assiting me in making this project a reality.
