const apiKey = process.env.EMAIL_KEY

async function getContacts(limit) {
    const endpoint = `https://api.sendinblue.com/v3/contacts?limit=${limit}&offset=0&sort=desc`
  
    const response = await fetch(endpoint, {
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
      },
    });
  
    if (!response.ok) {
      throw new Error(`Failed to retrieve contacts: ${response.status} ${response.statusText}`);
    }
  
    const data = await response.json();
    return data;
  }
  