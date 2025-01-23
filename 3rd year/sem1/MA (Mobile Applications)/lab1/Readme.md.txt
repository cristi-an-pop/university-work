### Project: Memory Lane
## Description
Memory Lane is a mobile application that allows users to capture and relive their most cherished moments. Users can store personal memories by adding details such as titles, descriptions, dates, locations, moods, and photos. This app provides a streamlined experience to create, view, edit, and delete memories. It also ensures these memories are safely stored both locally on the device and in the cloud, allowing users to revisit their memories anytime, anywhere.

## Domain Details
The app will store Memory entries, which contain the following fields:

*Title:* A short and descriptive title of the memory (e.g., "Graduation Day").
*Description:* A detailed description of the memory (e.g., "Graduated from university with my Bachelor's degree in Computer Science").
*Date:* The date when the memory occurred (e.g., June 15, 2024).
*Location:* The geographical location where the memory took place (e.g., "New York City").
*Mood:* The mood associated with the memory (e.g., Happy, Excited, Nostalgic).
*Photos:* A collection of photos attached to the memory (optional).
*Tags:* Tags or keywords to help categorize the memory (optional, e.g., "Graduation, University").

## CRUD Operations
Each memory entity supports the following operations:

*1. Create*
Users can create a new memory by entering details such as the title, description, date, location, mood, and photos.
Once created, the memory is stored locally and uploaded to the server when an internet connection is available.
*2. Read*
Users can view a list of all saved memories. Each entry displays the title, date, and a thumbnail of attached photos.
Users can tap on an individual memory to view the full details, including the description, mood, location, and any associated photos.
*3. Update*
Users can modify an existing memory by editing any of its fields, such as changing the title, adding more photos, or updating the date or mood.
The update will apply both locally and on the server (if online).
*4. Delete*
Users can delete any memory. Deleted memories are removed from the local database and from the server if the device is connected to the internet.
If offline, the memory will be marked for deletion and removed when the device reconnects.

## Persistence Details
The app ensures persistence through both local and server storage. Here’s how the CRUD operations are handled:

*Create:*
Memories are created and stored in the device's local database (SQLite).
When an internet connection is available, the memory is also sent to the server.

*Read:*
Memories are read from the local database when offline.
When online, the app checks for any new memories or updates from the server.

*Update:*
When a memory is updated, the changes are saved locally and sent to the server when a connection is available.

*Delete:*
Deleted memories are immediately removed from the local database and synced with the server for permanent deletion when connected


## Offline Functionality
The app provides robust offline support for all CRUD operations:

*Create:*
Users can create memories while offline. These memories are stored locally and marked for upload when the app reconnects to the internet.

*Read:*
Users can view all previously created memories even without an internet connection, as the data is stored locally.

*Update:*
When offline, users can still update memories. These updates are applied locally and will sync with the server once the device is back online.

*Delete:*
Deleting memories offline removes them from the local database and flags them for server-side deletion. Once the device is online, the deletion will be synced with the server.