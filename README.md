# Semester Assignment FED2 Noroff Auction House

![image](/public/BidCoin.png)

- live link [https://main--bidcoin-noroff.netlify.app/]

This was my second year Christmas semester assignment, the task was to build a web application that demonstrates CRUD capabilities using an API that was provided for us.

## Description

This will serve as my Semester Project Rapport & Rationale, throughout the document i will detail my coding choices and the work process, as well as the design choices I went with.

The main purpose of the project was to display CRUD capability using the the designated API provided to us in the project brief.

This project was an immensely valuable learning experience for me I made a lot of mistakes along the way, and the finished product reflects that, I met all required user stories, but the UI and the code itself needs work.

I began this project reading through the API documentation and trying to create a plan for how I should proceed with the structure I had in mind, I am quite new to both React and Tailwind and it shows in my code, but more on that later.

After the reading and the planing was done I quickly moved on to the design phase, seeing as I was constrained to only use an approved CSS framework my hands were a bit tied, but I still think the the idea and the vision I had for the final product was solid enough, though some of my UI choices could be a bit antiquated, and needs refinement, personally I need to work more with frameworks and get comfortable with that.

I wanted as few clicks as possible for the user, and I could have made it even more effective if not for certain user stories I needed to meet according to the brief, the color pallet, name of the site and the background media borrows heavily from the crypto-currency world, and is fairly minimalist whilst still grabbing your attention more than a blank canvas would, the font choice for the app was based upon readability more than an artistic sense because this app is based totally around a user and the input they contributes to the API.

Seeing as the provided API does have it's limitations the design workload was not that great for this project.

The coding process was where the brunt of the work was done, I began with the site architecture.

I struggled a bit at the start with how I should set up my project, I knew I wanted to have as few pages as possible whilst still maintaining a short load time for the user.

I went with tanstack routing because that's what I have managed with before.
After getting the basic navigation to work I moved on to login and registration, seeing as the auction house endpoint is the same as the social media endpoint I reused the code from the course assignment for the most part, I adjusted the payload to include the URL input, after I was done with this I moved on to populating my listing page with items from the database, went with axios for this, though not on all the get/fetch requests I sometimes struggled to get axios to work with the API. I will look in to this on a later stage as I am certain it was a mistake I made in how I worked with axios.

I struggled for a while to display a single unique listing item, and I think I probably tried everything under the sun to get it to work, and in the end it was as simple as how the ID in the URL was read in the code, once I figured that out I got it to work in a flash, and I need to state that my relief was unmeasurable as I could not see a fault in the code.
Next was the biggest part for the project, CRUD.

Personally it did not take me a lot of time to get this to work, but I could absolutely see that it could for some, the API documentation for me was lackluster at best, and a lot of trial and error to get the right validation was needed.

GET, POST PUT DELETE, all of them was straight forward, but a lot of the growing pains when working as a dev stems from poor documentation, had it stated all the valid character limits and so on clearly this would have been a much smoother ride.

Sort and the search function was done on the front end, since the user story only stated that an unregistered user should be able to search through the listings I kept this at a minimal.

I wanted the UI to be much more alive than the finished product but I just haven't worked enough with tailwind or component libraries, so that too needs work.

To conclude this rapport, I really enjoyed this, it is fun working on something that is alive and not static, and this will help me in no small part when I now move a hundred percent on to work on the real live site I am developing for my client.

## Built With

- React
- Tailwind
- DaisyUI

## Getting Started

### Installing

1. Clone the repo:

```bash
git clone https://github.com/EspenSnerten/Semester-Project-2023/tree/main
```

# Contributing to [Semester Assignment FED2 Noroff Auction House]

Thank you for considering contributing to this project! I appreciate your time and effort. This document outlines the guidelines for contributing to my project. Please take a moment to review it before getting started.

## Getting Started

1. Fork the repository and clone it to your local machine.
2. Create a new branch for your contributions: `git checkout -b feature/your-feature-name`.
3. Make your desired changes or additions.
4. Test your changes thoroughly to ensure they work as intended.
5. Commit your changes with a descriptive commit message: `git commit -m "Add feature: your feature name"`.
6. Push your changes to your forked repository: `git push origin feature/your-feature-name`.
7. Create a pull request (PR) from your forked repository to the main repository.

## Guidelines

- Ensure your code follows the existing code style and conventions.
- Write clear, concise, and meaningful commit messages.
- Include documentation for any new features or changes you make.
- Be respectful and considerate of others when discussing or reviewing code.
- Be responsive to any feedback or comments on your pull request.
- Avoid submitting multiple unrelated changes in a single pull request. Please create separate PRs for each feature or bug fix.

## Contact

My mail account:(espensnert@hotmail.com)

## Acknowledgments

The icons used in this project are from https://www.svgrepo.com/
The picture used for the background is from https://unsplash.com/
