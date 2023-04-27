const apiKey = process.env.EMAIL_KEY;

async function getContacts() {
  console.log(`api key: ${apiKey}`)
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
      throw new Error(`Main error (line 45 in sendInBlue): ${response.status} ${response.statusText}. ${data.message}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    if (error) {
      // handle the case where the contact already exists
      console.warn(`Contact already exists with email: ${email}`);
      return null
    } else {
      // handle other errors
      console.error("Secondary error (line 58 in sendInBlue)", error);
      throw error;
    }
  }
}


export { getContacts, createNewsletterContact }