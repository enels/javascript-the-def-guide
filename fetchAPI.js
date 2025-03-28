//fetch()
/**
 * 
 * Steps
 * =====
 * Call fetch(), passing the URL whose content you want to retrieve.
 * 
 * Get the response object that is asynchronously returned by step 1 when the
    HTTP response begins to arrive and call a method of this response object to ask
    for the body of the response.
 *
 *  Get the body object that is asynchronously returned by step 2 and process it however you want.
 *  
 * */

fetch("/api/users/current")
    .then(response => response.json())
    .then(currentUser => {
        displayUserInfo(currentUser);
    });

// using async/await function
async function isServiceReady() {
    let response = await fetch("/api/service/status");
    let body = await response.text();
    return body === "ready";
}

// Checking for HTTP status codes, response headers, and network errors
fetch("/api/users/current")
    .then(response => {
        if (response.ok && response.headers.get("Content-type") === "application/json") {
            return response.json();
        }
        else {
            throw new Error(
                `Unexpected response status ${response.status} or content type`
            );
        }
    })
    .then(currentUser => {
        displayUserInfo(currentUser);
    })
    .catch(error => {
        console.log(`Error while fetching current user: ${error}`);
    });

/**
 * 
 * Setting Request parameters
 */
async function search(term) {
    let url = URL("/api/search");
    url.searchParams.set("q", term);
    let response = await fetch(url);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    let resultArray = await response.json();
    return resultArray;
}

// Setting Request Headers
let authHeaders = new Headers();

authHeaders.set("Authorization", `Basic ${btoa(`${username}:${password}`)}`);
fetch("/api/users/", { headers: authHeaders })
    .then(response => response.json()) // Error handling omitted...
    .then(userList => displayAllUsers(usersList));
//...alternatively
let request = new Request(url, {headers});
fetch(request).then(response => ...);

// Response bodies
//.json(), .text(), .blob(), .formData(), .arrayBuffer()


// Streaming API - streamBody()


// Specifying the request method and request body
fetch(url, { method: 'POST' }).then(r => r.json()).then(handleResponse);

fetch(url, {
    method: 'POST',
    headers: new Headers({"Content-type": "application/json"}),
    body: JSON.stringify(requestBody)
})