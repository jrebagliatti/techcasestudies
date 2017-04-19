---
layout: post
title:  "Buy your friends a drink with this Liquid Greetings app built with Xamarin and Azure"
author: "David Giard"
author-link: "#"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date:   2017-04-19
categories: [Mobile Application Development with Xamarin]
color: "blue"
#image: "{{ site.baseurl }}/images/authors/davidgiard.jpg" #should be ~350px tall
excerpt: Liquid Greetings and Microsoft built a mobile app using Xamarin and Azure that will allow subscribers to treat their friends to their favorite beverages.
language: English
verticals: ["Retail, Consumer Products & Services", Social Media]
---


<img src="{{ site.baseurl }}/images/liquidgreetings/liquidgreetingslogo1.png" width="300">


The Liquid Greetings app for Android and iOS will enable subscribers to create and share wish lists of their favorite beverages, discover what beverages their friends like, and to send and receive beverages. 

A team from Microsoft and Liquid Greetings set out to create a social application that would allow users to connect with friends, share drink preferences, and buy drinks for their friends.

Although a web application already existed, it had limited functionality, it was untested, and had no live users. Therefore, we elected to create all code, data schemas, and data from scratch.

We chose to write the client application in Xamarin because we wanted a mobile application for multiple platforms and because the core team had a working knowledge of C#.

### Core team

![Development team]({{ site.baseurl }}/images/liquidgreetings/lgteam.jpg "Development team")


- Thad Bennett – Owner, Liquid Greetings
- Chris Risner – Principal SDE, Microsoft
- David Giard – Senior Technical Evangelist, Microsoft

## Customer profile

[Liquid Greetings](http://liquidgreetings.com/) was founded in 2016 by Thad Bennett to create the Liquid Greetings application. Thad, the owner and only employee, has spent much of his career writing custom software for customers. His specialties include web applications, C#, and databases. 

The company is based in Chicago, IL.

## Problem statement

We set out to build a minimum viable product (MVP) to showcase the features of the Liquid Greetings application. 

During this phase of the project, our goal was to create working functionality in the application. We also wanted the code and architecture to serve as a model for developing future features for the application. 

Requirements of the MVP were:

* Sign up/log on using either Twitter or Facebook.
* Create a wish list of favorite beverages by scanning the UPC barcode from favorite beverages. The app back end will then reference a cloud source (TBD) that translates the scanned UPC barcode into its corresponding description and photo.
* Create a unique QR code for each subscriber that can be read by other app subscribers and then display the associated subscriber profile and wish list.
* After scanning the QR code and displaying the subscriber's profile, a button should be provided to request being added to the buddy list of the scanned subscriber. The scanned subscriber should receive a buddy list request to approve or deny.

## Solution, steps, and delivery

![Application architecture]({{ site.baseurl }}/images/liquidgreetings/liquidgreetingsarchitecture.png "Application architecture")


We split into two separate work streams: one to create the back end (Azure SQL Database and the Mobile Apps feature of Azure App Service) and one to create the front end (Android and iOS app in Xamarin).

We began with an Android application because it was easier to test, given the hardware of the development team.

The code is stored in a Visual Studio Team Services repository using Git.   

## Front end

### Lay out all mobile screens

We used Xamarin.Forms to lay out all the application's screens. This allowed us to reuse UI code across both Android and iOS.

### Connect to mobile service

Data access code and business logic code was stored in an Azure mobile app. We used the Mobile.Azure.Mobile.Client library to access this mobile app. 

### Authenticate with Facebook and Twitter

*Login screen*

<img src="{{ site.baseurl }}/images/liquidgreetings/screen-login.PNG" width="400">


*Twitter login screen*

<img src="{{ site.baseurl }}/images/liquidgreetings/screen-twitterlogin.PNG" width="400">


The MobileServiceAuthenticationProvider object provided access to the authentication providers supported by Mobile Apps.

### Generate user barcode

*Barcode screen*

<img src="{{ site.baseurl }}/images/liquidgreetings/screen-addfriend.PNG" width="400">


We used the [ZXing library](https://github.com/Redth/ZXing.Net.Mobile) to generate barcodes. 

ZXing provides a class to generate a barcode with the following C# code:

```C#
var barcodeWriter = new ZXing.Mobile.BarcodeWriter
{
	Format = ZXing.BarcodeFormat.QR_CODE,
	Options = new ZXing.Common.EncodingOptions
	{
		Width = 300,
		Height = 300
	}
};
```
  
Because each platform has a distinct API for writing to the file system, we implemented different code on each project to save the barcode image to a file. This was achieved by creating a concrete class in each project that implements a shared interface.  

### Read barcode, look up corresponding user

We enabled use of the camera to read another user's barcode. To make this work, we needed to assert that the app needed permission to use the camera on the local device. This is done in the AndroidManifest.xml for Android and in the Info.plist file for iOS.

#### AndroidManifest.xml

```xml
<uses-permission android:name="android.permission.CAMERA" />
```

#### Info.plist

```xml
<key>NSCameraUsageDescription</key>
<string>Allow access to camera</string>
```

### List of favorite drinks

*Drink list*

<img src="{{ site.baseurl }}/images/liquidgreetings/screen-drinklist.PNG" width="400">


No back-end service is yet exposed to retrieve a subscriber's favorite drinks. We created a mock service with hard-coded drinks and a page to display those drinks by category. 

## Back end

### Azure SQL Database

Azure SQL Database allows us to store data in a set of relational tables. This data was exposed via a mobile app. Entity Framework Code-First was used to define and migrate the schema of each table. 

### Mobile app 

We created a mobile app using the Mobile Apps feature of Azure App Service to expose database read, insert, update, and delete operations via REST web services. For this project, we implemented methods to do the following:

* Get a subscriber by their ID.
* Create a new subscriber.
* Get a subscriber by their social media ID. If no matching subscriber exists, create one.
* Update an existing subscriber. If no matching subscriber is found, create one.

We used a Web API application, written in C# for the Azure mobile app code.

### Entity Framework

We used Entity Framework for all data access.

To modify the schema and seed the database, we used Entity Framework Code-First and the Entity Framework database migration package.

### Authentication

Because each mobile platform implements authentication in its own way, we had to write distinct authentication code for each platform. Our shared project included an IAuthenticate interface and, in each project, we created a concrete class that implements this interface. These concrete classes authenticate specifically for the appropriate platform.

In addition, we used the Xamarin.Auth AccountStore functionality to store in our database tokens and providers returned from authentication. This allowed us to automatically log on users without requiring them to re-authenticate when they return to the app. Each time a user starts the app, we check whether they have a token and whether it has not yet expired. If a valid, saved token exists, we use this to automatically log on the user.

## Conclusion

With one screen's functionality complete from the database to the front end, we have a model on which to build the remaining screens. We also have completed authentication using Twitter or Facebook.

*Chris demonstrating the app features*

![Chris]({{ site.baseurl }}/images/liquidgreetings/chrisrisner.jpg "Chris showing off the app features")


### Lessons learned

This was the first time most of the team had used Entity Framework Code-First with Mobile Apps. We discovered that this combination does not allow the use of an auto-incrementing primary key for our tables, so we had to use a GUID and set the GUID in the client application before inserting a new row in the table. We performed several migrations before discovering this and ended up deleting all the database assets and the migrations, then regenerating and rerunning the migrations. Being aware of this limitation beforehand would have saved us the pain of multiple restarts. 

### Partner response

![Thad]({{ site.baseurl }}/images/liquidgreetings/thad.jpg "Thad Bennett")


Thad Bennett, the partner with whom we were working, was very excited about the result. He has reviewed and modified the code we wrote and he plans to add more screens to the application based on the patterns used in the screens we created.
