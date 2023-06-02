const apiKey = process.env.EMAIL_KEY;

async function getContacts() {
  // console.log(`api key: ${apiKey}`)
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'api-key': apiKey
    }
  }

  try {
    const response = await fetch('https://api.sendinblue.com/v3/contacts', options);
    if (!response.ok) {
      throw new Error(`Failed to retrieve contacts: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    // console.log(data)
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createNewsletterContact(email) {
  const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey
      },
      body: JSON.stringify({
        email: email,
        attributes: { newsletter: true }
      })
  }

  try {
    const response = await fetch("https://api.sendinblue.com/v3/contacts", options);
    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.message)
    }
    const data = await response.json();
    return data;

  } catch (error) {
    // console.log({test:error.message})
    if (error.message.includes('already exist')) {
      // handle the case where the contact already exists
      throw new Error(`Contact already exists`);
    } else {
      // handle other errors
      console.error("Secondary error (line 59 in sendInBlue.js)", error);
      throw error;
    }
  }
}


export { getContacts, createNewsletterContact }