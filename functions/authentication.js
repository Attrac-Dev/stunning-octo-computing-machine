import { setCookie } from './cookies'

async function userLogin(email, password) {
  try {
    const { user, error } = await this.$supabase.auth.signIn({
      email: email,
      password: password,
    })

    if (error) {
      throw new Error(error.message)
    }

    // Set the user data in a cookie
    setCookie('user', JSON.stringify(user), 7, { sameSite: 'Strict' })

    return user
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function userSignup(email, password, name, invite) {
  console.log('trying user signup function')
  try {
    const { user, error } = await this.$supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) {
      throw new Error(error.message)
    }

    // Set the user data in a cookie
    setCookie('user', JSON.stringify(user), 7, { sameSite: 'Strict' })
    console.log('user cookie set')

    return user
  } catch (error) {
    console.error(error)
    throw error
  }
}

export { userLogin, userSignup }
