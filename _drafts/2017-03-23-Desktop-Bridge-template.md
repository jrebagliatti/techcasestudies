---
layout: post
title: "Add title with customer name here"
author: "Add author name here"
author-link: "# add twitter link here"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date: 2017-01-25
categories: [Desktop Bridge]
color: "blue"
#image: "{{ site.baseurl }}/images/imagename.png" #should be ~350px tall
excerpt: Add a short description of what this article is about, helping a fellow developer understand why they would want to read it. What value will they get out of reading it? Focus on the problem or technologies and let that be the guiding light.
language: The language of the article (for example, [English])
verticals: The vertical markets this article has focus on (such as [Energy, Manufacturing & Resources, Financial Services, Public Sector, "Retail, Consumer Products & Services", Environmental, Communications/Media, Transportation & Logistics, Smart Cities, Agricultural, Environmental, Healthcare, Other])
---

Begin with an intro statement with the following details:

- Solution overview
- Core team: names, roles, and Twitter handles 
 
## Customer profile ##

This section contains general information about the customer, including the following:

- Company name and URL
- Company description
- Company location
- Details of the functionality of the Desktop Application that was converted to UWP and submitted to the store.
- Numeric details (if available) that demonstrate the brand strength of the partner and/or noteworthy customer reach: Number of downloads of the desktop application (before the conversion), the revenue that the company obtains from this application, the average evaluations it has (if any) from the users (e.g. from the Steam platform), ranking/awards that the app has won (at least 1 numeric detail is mandatory in order to ask for Revenue Share and/or Merchandising offers)
- Non-numeric details (if any) that demonstrate brand strength of the partner and/or noteworthy customer reach: e.g. "This application is mandatory in [Country] to calculate and pay your taxes every year" (at least 1 non-numeric detail is mandatory in order to ask for Revenue Share and/or Merchandising offers)
- (Highly desirable) Link to the partner's web page where the Store badge with the link to download the app from the store is visible

## Problem statement ##

This section will define the problem(s)/challenges that the customer wants to address through Desktop Bridge, enhancement of the application with UWP-only features and publication of the app in the Windows Store. Include things like more downloads, global discovery/monetization potential, simplified distribution, trusted deployment, easy first steps towards UWP, customer experience (easy updates, easy install/uninstall, etc.), UWP-only features added to the application (e.g. Cortana, Live Tiles, Notifications, etc.)

Include a 3 minute video on the customer's problem, the work done with the Customer and/or the customer's impressions.

## Solution, steps, and delivery ##

The majority of your win artifacts will be included in this section, including (but not limited to) the following: Source code snippets (if any), pictures, drawings, architectural diagrams and demo videos.

This section should include the following details:

- What was worked on and what problem it helped solve. 
- Description of the app you converted to UWP and submitted in the Windows Store. If the app was enhanced with UWP-only features such as Cortana, notifications, live tiles, etc., include those details here.
- Technical details of how this was implemented: A detailed step-by-step guide of the tasks performed in order to convert the app to UWP, specially in the cases where manual conversion was used). The sample Code (if any) that leverages the results of joint work.
- Pointers to references or documentation.
- Learnings from the Microsoft team and the customer team.
- Architecture diagram/s (if any). Example below:

  ![Desktop Bridge architecture diagram](/images/templates/desktopbridgearchitecture.png)

**Directions for adding images**

1. Create a folder for your project images in the "images" folder in the GitHub repo. This is where you add all of the images associated with your write-up.
2. Add links to your images using the following absolute path:

  `![Description of the image]({{site.baseurl}}/images/projectname/myimage.png)`

  Here's an example: 

  `![Value stream mapping]({{site.baseurl}}/images/orckestra/orckestra2.jpg)`

Note that capitalization of the file name and the file extension must match *exactly* for the images to render properly.
 
## Conclusion ##

This section will briefly summarize the technical story with the following details included:

- Graphic showing the increase in downloads of the application since it was published in the Windows Store (if available)
- Measurable impact/benefits resulting from the implementation of the solution. e.g. How was the user experience enhanced through the addition of UWP-only features to the app? Which ones? What are the main benefits the customer sees in publishing his app into the store? Etc.
- General lessons/learnings:
  - Insights the team came away with.
  - What can be applied or reused for other environments or customers?
- Opportunities going forward:
  - Details on how the customer plans to proceed or what else they hope to accomplish. E.g. Are they planning to move their app to UWP fully? Are they planning to move their other apps to UWP and to the store through Desktop Bridge? Etc.

- Include a customer quote that highlights the customer’s problem(s)/challenges. Remember to attribute the quote. Include Name, Title, Company. Ideally, this customer quote should be a public mention from the customer (e.g. a quote on the customer website, social media post, press release, blog, etc. Email is accepted however it is less desirable). 
For example:
> “[…]The Desktop Bridge vastly simplifies our installer and uninstaller. It also opens up UWP APIs that we’ve taken advantage of, including the live tiles and notifications. And having the full-featured Evernote app in the Windows Store means future improvements will reach users faster.“ - Seth Hitchings, VP Engineering, Evernote.

- Include a publicly shared case study (consumable outside of GitHub, e.g. customer.microsoft.com; published by the partner; etc.). Aligned with strategic scenarios containing all details of the partner/customer story (if any).

## Additional resources ##

In this section, include a list of links to resources that complement your story, including (but not limited to) the following:

- Documentation
- Blog posts
- GitHub repos
