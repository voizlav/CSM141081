```mermaid
sequenceDiagram
Note over Client: spa.js event executed on client
Note over Client: from line 46 to 61
Note over Client: including line 1 to 19 for rendering data
Note over Client: line 41, 42 and 43 for sending to server
Client->>Server: HTTP POST /new_note_spa
Server-->>Client: NOTE CREATED (201)
Note over Client: response event executed
Note over Client: from line 35 to 39
```