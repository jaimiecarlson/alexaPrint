# alexaPrint
PennApps Fall 2017 

THINGS TO DO BEFORE PENNAPPS:
-Figure out how to upload a zip file to Alexa

-Set up NodeJS on this computer (Windows side bc might be a lot of space required)

THINGS TO DO DURING PENNAPPS:
-Query to Thingiverse for most common object (GET requests from REST API)

    https://www.thingiverse.com/developers/rest-api-reference:
    
    Search
    
      Perform a search of things by keyword
      
      GET /search/{$term}/
      
      Results in 404 Not Found if no things match the search.
      
      Parameters
      
              $term - Optional string - The search query to perform
              
      Returns
      
              (array) - A list of things matching the search 

-Unzip Thingiverse files and pick out 1 STL (just 1 for a demo) (Could do in system() if the backend was in Python)

-Transform STL to Makerbot (Could do in system() if the backend was in Python)

-Attach Makerbot file to an email and send with Alexa (https://stackoverflow.com/questions/4672903/sending-mails-with-attachment-via-nodejs)



