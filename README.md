# 📱 Noto

As I was exploring React Native using Expo for a week, I decided to create a simple project to implement what I learned.  
So, here's my mini app: **Noto**! 🎉

---

## 📝 Introduction

Noto is a mobile app built with **Expo (React Native)** and **Firebase**. It's a small project where users can:  
1. Create notes.  
2. Read notes.  
3. Update notes.  
4. Delete notes.  

---

## 🛠️ Tech Stack
- **Expo**  
- **Firebase**  
- **React Native**  
- **React**  

---

## ✨ Features
Here's what you can do with Noto:  
1. Add a note with a title and description.  
2. Update existing notes.  
3. View all added notes.  
4. Delete specific notes.  

---

## 🛣️ The Process

### 🔧 Backend Part  
First, I decided to create a unique ID for each user (since I haven't added authentication yet).  
Each user has a `notes` collection to store multiple notes (as documents).  

The backend structure looks like this:  
```
users collection / user-id / notes collection / note-id
```

---

### 🎨 Frontend Part  
1. I started by building the UI using `StyleSheet`.  
2. Integrated Firebase.  
3. Generated a user ID and saved it in **Async Storage** so the user's notes can be displayed easily.  
4. Used React's **Context API** to store the user ID and access it anywhere in the app.  
5. Implemented the note-adding functionality using Firebase's `addDoc` method.  
6. Displayed the added notes using the `getDocs` method. This step taught me something new about setting up the notes array.  
7. Added note deletion functionality using the `deleteDoc` method.  
8. For updating notes:  
   - Initially, I fetched the note from Firebase, but this caused delays and a poor user experience.  
   - To improve the UX, I passed the note data via the `params` object from the "All Notes" page, which made editing smoother.  
   - Updated the note in Firebase using the `setDoc` method.  

---

## 📚 What I Learned
1. **Using Custom Fonts**: Encountered an issue but solved it with some help from Google.  
2. **Displaying Recent Notes**:  
   - Initially, the last added note was not appearing at the top.  
   - Learned to add a `timestamp` field and fetch data in descending order to show recent notes first.  
3. **Environment Variables**:  
   - Struggled to load `.env` variables in the web environment.  
   - After researching for a few days, I found a solution (which I'll share in an article soon). This was my biggest learning moment so far!  

---

## 🚀 How to Run the Project
1. First, create a Firebase project and add the Firebase configuration file to your app. Then, create a .env file and replace the environment
variables with the ones provided by Firebase after creating the project.

2. Install all dependencies:  
   ```bash
   npm install
   ```
3. Start the project:  
   ```bash
   npx expo start
   ```
4. View the app using the **Expo Go** app.

---

## 🎥 Video Demo
I'm running the app in development mode because I faced some issues building it.  

https://github.com/user-attachments/assets/d4a25ce2-9104-4264-a55a-2418b295f1ad

---

Thank you for checking out Noto! 😊  
Happy Coding 🤍 - Rumaisa Naveed
