# User Persona & Workflow Overview

## Persona  
The target user is a **busy professional** (eg - a marketing person, product manager) who starts their day by scanning the centralized dashboard. This user has less than 5 minutes each morning to review their insights.

## High-Level Morning Flow  
1. **Opens dashboard** → Sees a clear, prioritized list of insights sorted by priority and then by date. User sees the insight title on each of the cards. If interested in the insight, the user will be able to expand the insight to view more details.
2. **Scans insights** → Can filter by priority, category, date or search through insights by keywords that appears in either the title, the suggested action or the category; They will be able to view the currently applied filters and remove them indiviually as needed which updates the view dynamically. They can hover over very long titles to view it in full. The user can aslo ask AI for a summarized gist of their actionable items. Context to the model will be provided based on the updated json data that we give to it.  
3. **Handles insight** → Takes action: snooze for a configurable amount of time either minutes, hours or days if the insight is not relevant now. After the snooze time has elapsed, the insight will reappear in the main view. The user can also dismiss the inisght if unnecessary, mark as to-do if it requires attention, or complete if already done.
3. **Navigate into the dismissed, todos or snoozed sections** → View a clean display of the snoozed, dismissed, to do action items or completed insights, each in a separate tab of its own on the sidebar. Insights under the snoozed tab also tell the user till when they have been marked as snoozed. 

# Shadcn primitives used - 
The following primitives from the [shadcn/ui](https://ui.shadcn.com) library were used or extended:  
- **Button** → For consistent action handling (dismiss, snooze, complete, etc.), for removing currently applied filters, to send natural language questions to the model.
- **Sidebar** → For navigation across task states (all, snoozed, dismissed, todos, completed)  
- **Accordion** → For displaying, expanding/collapsing insight details  
- **Badge** → For showing priority, keyword, date and category filters currently applied to the view.
- **Popover** → For snooze duration picker and quick actions  
- **Dropdown Menu** → To handle the UI for the filter option inputs from the user.

# Potential future improvements

1. Improve the AI model to produce better answers. I have used an open source Flan T5 base huggingface model for this demo which is not powerful but if this was going into production, we can make use of the OpenAI API that has much better capabilities.
2. Add a snooze, add to to-dos, or dismiss in bulk option -  The user can snooze, add to to-dos or dismiss all insights related to a category or priority with just one click when there are a large number of insights.
3. Provide an option to the user to assign specific categories as low, medium or high priority so we display insights having these categories with the appropriate priority to the user.

# Why this design enables a 5-minute review  

The dashboard is intentionally optimized for speed and focus. Insights are auto-sorted by priority and recency, so the most critical items rise to the top without extra effort. For users pressed for time, the built-in **AI assistant acts as a shortcut**—summarizing high-priority actions or providing quick context without the need to read every detail.  

The user can hover over each insight to view the full insight ensuring no clutter in their main view. The experience is further streamlined with **powerful filters and search**: users can instantly narrow down by keyword, date range, priority, or category to spotlight only what matters in the moment. For ease of use, the user has a clear view of the currently applied filters and remove them individually as required. Dedicated **tabs for task states** (snoozed, dismissed, to-do, completed) keep the view uncluttered while giving full control. Snoozed insights clearly show their return time, so nothing is lost.  

If we take the potential improvements into consideration, if the user can take action for bulk insights or customize how they want to view their insights, this will lead to an even more streamlined way of viewing information allowing the user to also take action quickly in under 5 minutes while view the insights in a way that is most suitable to them.

Together, these design choices let a busy professional **scan, prioritize, and act in under five minutes**, leaving the dashboard with confidence that nothing urgent has been overlooked.

# Project set up

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Install dependencies

`npm install`

## Run the servers

From the root directory - 

`npm run dev`

Run the above and navigate to http://localhost:3000/ where the main app will be rendered. 

For the python script that is running the server to serve AI responses, run - 

`uvicorn backend.app:app --reload --port 8000`

and navigate to http://localhost:8000/ask

## Assumptions - 

1. The insight title is just one sentence. If the title is expected to be long, I have included a hover for now, but based on specific needs, the UI for this can be changed.
2. Dismissing an insight is different from completing it. 
3. That there is a possibility that the user can be met with 100s of insights. 


